using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Common;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.IRepository;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.IService;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Models;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Models.DTO.User;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Validators;
using Com.ACSCorp.Accelerator.Core.Authorization.Interfaces;
using Com.ACSCorp.Accelerator.Core.Models;
using Com.ACSCorp.Accelerator.Core.Models.Enums;

using FluentValidation.Results;

using Microsoft.Extensions.Logging;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.Service
{
    public class UserRoleService : IUserRoleService
    {
        #region Variables

        private readonly ILogger _logger;
        private readonly IUserRoleRepository _userRoleRepository;
        private readonly IClientService _clientService;
        private readonly IProjectService _projectService;
        private readonly IIdentityService _identityService;

        #endregion Variables

        #region Constructors

        public UserRoleService(
            ILogger<UserRoleService> logger,
            IUserRoleRepository userRoleRepository,
            IClientService clientService,
            IProjectService projectService,
            IIdentityService identityService)
        {
            _logger = logger;
            _userRoleRepository = userRoleRepository;
            _clientService = clientService;
            _projectService = projectService;
            _identityService = identityService;
        }

        #endregion Constructors

        #region Public Methods

        public async Task<Result<int>> AddUserRoleAsync(UserRoleDTO userRoleDTO)
        {
            Result validationResult = await ValidateUserRoleAsync(userRoleDTO);

            if (!validationResult.IsSucceeded)
            {
                return Result.Fail<int>(validationResult.GetErrorString());
            }

            if (userRoleDTO.RoleId == GetUserRoleId())
            {
                return Result.Fail<int>(Messages.UnAuthorizedEntityAccess);
            }

            userRoleDTO.IsDeleted = false;

            int userRoleId = await _userRoleRepository.AddUserRoleAsync(userRoleDTO);
            if (userRoleId <= 0)
            {
                return Result.Fail<int>(Messages.UserRoleAddFailed);
            }

            return Result.Ok(userRoleId);
        }

        public async Task<Result<bool>> SaveUserRolesAsync(List<UserRoleDTO> userRoleDTOs)
        {
            Result validationResult = await ValidateUserRolesAsync(userRoleDTOs);

            if (!validationResult.IsSucceeded)
            {
                return Result.Fail<bool>(validationResult.GetErrorString());
            }

            int userId = userRoleDTOs.First().UserId;
            int entityId = userRoleDTOs.First().EntityId;
            List<UserRoleDTO> existingUserRoles = await _userRoleRepository.GetUserRolesByEntityAndUserAsync(userId, EntityType.Project, entityId);

            // UserRoles to add
            var newUserRoleDTOs = userRoleDTOs
                .Where(c => !existingUserRoles.Any(e => e.RoleId == c.RoleId)
                    && c.RoleId != Role.ProjectUser
                    && c.RoleId != Role.ProjectAdmin
                    && c.RoleId != Role.ClientAdmin)
                .ToList();

            // UserRoles to remove
            var userRolesToRemove = existingUserRoles
                .Where(c => !userRoleDTOs.Any(ur => ur.RoleId == c.RoleId)
                    && c.RoleId != Role.ProjectUser
                    && c.RoleId != Role.ProjectAdmin
                    && c.RoleId != Role.ClientAdmin)
                .ToList();

            if (!newUserRoleDTOs.Any() && !userRolesToRemove.Any())
            {
                return Result.Ok(true);
            }

            using (var transaction = _userRoleRepository.BeginTransaction())
            {
                try
                {
                    if (newUserRoleDTOs.Any())
                    {
                        bool isAdded = await _userRoleRepository.AddUserRolesAsync(newUserRoleDTOs);
                        if (!isAdded)
                        {
                            return Result.Fail<bool>(Messages.UserRolesSaveFailed);
                        }
                    }

                    if (userRolesToRemove.Any())
                    {
                        foreach (UserRoleDTO userRole in userRolesToRemove)
                        {
                            userRole.IsDeleted = true;
                        }

                        bool isUpdated = await _userRoleRepository.UpdateUserRolesAsync(userRolesToRemove);

                        if (!isUpdated)
                        {
                            return Result.Fail<bool>(Messages.UserRolesSaveFailed);
                        }
                    }

                    await transaction.CommitAsync();

                    return Result.Ok(true);
                }
                catch (Exception ex)
                {
                    await transaction.RollbackAsync();
                    _logger.LogError(ex, Messages.UserRolesSaveFailed);

                    return Result.Fail<bool>(Messages.UserRolesSaveFailed);
                }
            }
        }

        public async Task<Result<ListResult<UserRoleResponse>>> GetUserRolesByEntityAsync(UserRoleListRequest userRoleListRequest)
        {
            Result validationResult = await ValidateEntityAsync(userRoleListRequest.EntityType, userRoleListRequest.EntityId);

            if (!validationResult.IsSucceeded)
            {
                return Result.Fail<ListResult<UserRoleResponse>>(validationResult.GetErrorString());
            }

            ListResult<UserRoleResponse> userRoleResponses = await _userRoleRepository.GetUserRolesByEntityAsync(userRoleListRequest);

            return Result.Ok(userRoleResponses);
        }

        public async Task<Result<bool>> RemoveUserRoleAsync(int id)
        {
            if (id <= 0)
            {
                return Result.Fail<bool>(Messages.UserRoleNotFound);
            }

            var userRole = await _userRoleRepository.GetUserRoleAsync(id);
            if (userRole == null || userRole.IsDeleted)
            {
                return Result.Fail<bool>(Messages.UserRoleNotFound);
            }

            if (userRole.UserId == _identityService.GetCurrentUserId()
                || userRole.RoleId == GetUserRoleId())
            {
                return Result.Fail<bool>(Messages.UnAuthorizedEntityAccess);
            }

            userRole.IsDeleted = true;

            bool userRoleIdRemoved = await _userRoleRepository.UpdateUserRoleAsync(userRole);
            return Result.Ok(userRoleIdRemoved);
        }

        #endregion Public Methods

        #region Private Methods

        private async Task<Result> ValidateUserRoleAsync(UserRoleDTO userRoleDTO)
        {
            var userRoleValidator = new UserRoleValidator();
            ValidationResult validationResult = await userRoleValidator.ValidateAsync(userRoleDTO);

            if (!validationResult.IsValid)
            {
                return Result.Fail<int>(validationResult.ToString());
            }

            return await ValidateEntityAsync(userRoleDTO.EntityType, userRoleDTO.EntityId);
        }

        private async Task<Result> ValidateEntityAsync(EntityType entityType, int entityId)
        {
            if (entityType == EntityType.Client)
            {
                Result<ClientDTO> clientResult = await _clientService.GetClientAsync(entityId);
                if (!clientResult.IsSucceeded)
                {
                    return Result.Fail(Messages.ClientNotFound);
                }
            }
            else
            {
                Result<ProjectDTO> projectResult = await _projectService.GetProjectAsync(entityId);
                if (!projectResult.IsSucceeded)
                {
                    return Result.Fail(Messages.ProjectNotFound);
                }
            }

            return Result.Ok();
        }

        private Role? GetUserRoleId()
        {
            return new UserDTO
            {
                IsAdmin = _identityService.IsAdmin(),
                UserRoles = _identityService.GetCurrentUser().UserRoles.Select(c => new UserPermissionDTO
                {
                    RoleId = c.RoleId
                }).ToList()
            }.Role;
        }

        private async Task<Result> ValidateUserRolesAsync(List<UserRoleDTO> userRoleDTOs)
        {
            var userRoleListValidator = new UserRoleListValidator();
            ValidationResult validationResult = await userRoleListValidator.ValidateAsync(userRoleDTOs);

            if (!validationResult.IsValid)
            {
                return Result.Fail(validationResult.ToString());
            }

            EntityType entityType = userRoleDTOs.First().EntityType;
            int entityId = userRoleDTOs.First().EntityId;

            return await ValidateEntityAsync(entityType, entityId);
        }

        #endregion Private Methods
    }
}
