using Com.ACSCorp.Accelerator.ApplicationAnalyzer.IRepository;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Models;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Repository.Context;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Repository.Mapper;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Repository.Models;
using Com.ACSCorp.Accelerator.Core.Models;
using Com.ACSCorp.Accelerator.Core.Models.Enums;
using Com.ACSCorp.Accelerator.Core.QueryUtility;
using Com.ACSCorp.Accelerator.Core.Repository.BaseRepository;

using Microsoft.EntityFrameworkCore;

using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.Repository
{
    public class UserRoleRepository : BaseRepository<UserRole>, IUserRoleRepository
    {
        #region Constructors

        public UserRoleRepository(ApplicationAnalyzerContext dbContext) : base(dbContext)
        {
        }

        #endregion Constructors

        #region Public Methods

        public async Task<int> AddUserRoleAsync(UserRoleDTO userRoleDTO)
        {
            UserRole userRole = userRoleDTO.ToUserRoleEntity();
            await AddAsync(userRole);

            return userRole.Id;
        }

        public async Task<bool> AddUserRolesAsync(List<UserRoleDTO> userRoleDTOs)
        {
            await _dbContext.Set<UserRole>()
                .AddRangeAsync(userRoleDTOs.ToUserRoleEntityList());
            bool isSaved = await SaveChangesAsync();

            return isSaved;
        }

        public async Task<bool> UpdateUserRoleAsync(UserRoleDTO userRoleDTO)
        {
            UserRole userRole = userRoleDTO.ToUserRoleEntity();
            await UpdateAsync(userRole);

            return userRole.Id > 0;
        }

        public async Task<UserRoleDTO> GetUserRoleAsync(int id)
        {
            UserRole userRole = await GetAsync(c => c.Id == id && !c.IsDeleted);

            return userRole.ToUserRoleDTO();
        }

        public async Task<ListResult<UserRoleResponse>> GetUserRolesByEntityAsync(UserRoleListRequest userRoleListRequest)
        {
            var query = GetAll(c => !c.IsDeleted
                    && c.EntityTypeId == Convert.ToInt16(userRoleListRequest.EntityType)
                    && c.EntityId == userRoleListRequest.EntityId
                    && (c.RoleId == (short)Role.ClientAdmin
                        || c.RoleId == (short)Role.ProjectAdmin
                        || c.RoleId == (short)Role.ProjectUser))
                .Include(c => c.User);

            var pagedResult = await QueryUtility<UserRole>.GetQueryResultAsync(query, userRoleListRequest.ListParameter);

            var userRoleListResult = new ListResult<UserRoleResponse>
            {
                Total = pagedResult.Total,
                Items = pagedResult.Items.ToUserRoleResponseList()
            };

            await MapUserSubRolesAsync(userRoleListRequest, userRoleListResult);

            return userRoleListResult;
        }

        public async Task<List<UserRoleDTO>> GetUserRolesByEntityAndUserAsync(int userId, EntityType entityType, int entityId)
        {
            List<UserRole> userRoles = await GetUserSubRolesAsync(userId, entityType, entityId);

            return userRoles.ToUserRoleDTOList();
        }

        public async Task<bool> UpdateUserRolesAsync(List<UserRoleDTO> userRoleDTOs)
        {
            List<UserRole> userRoles = userRoleDTOs.ToUserRoleEntityList();

            foreach (var userRole in userRoles)
            {
                _dbContext.Entry(userRole).State = EntityState.Modified;
            }

            _dbContext.Set<UserRole>().UpdateRange(userRoles);
            bool isUpdated = await SaveChangesAsync();

            return isUpdated;
        }

        #endregion Public Methods

        #region Private Methods

        private async Task<List<UserRole>> GetUserSubRolesAsync(int userId, EntityType entityType, int entityId)
        {
            var query = GetAll(c => !c.IsDeleted
                                && c.UserId == userId
                                && c.EntityTypeId == Convert.ToInt16(entityType)
                                && c.EntityId == entityId
                                && c.RoleId != (short)Role.ClientAdmin
                                && c.RoleId != (short)Role.ProjectAdmin
                                && c.RoleId != (short)Role.ProjectUser);

            List<UserRole> userRoles = await query.ToListAsync();
            return userRoles;
        }

        private async Task MapUserSubRolesAsync(UserRoleListRequest userRoleListRequest, ListResult<UserRoleResponse> userRoleListResult)
        {
            if (userRoleListRequest.EntityType == EntityType.Project)
            {
                foreach (var userRole in userRoleListResult.Items)
                {
                    if (userRole.RoleId == Role.ProjectUser)
                    {
                        List<UserRole> existingUserRoles = await GetUserSubRolesAsync(userRole.User.Id, EntityType.Project, userRoleListRequest.EntityId);
                        userRole.User.UserRoles = existingUserRoles.ToUserPermissionList();
                    }
                    else
                    {
                        userRole.User.UserRoles.Clear();
                    }
                }
            }
        }

        #endregion Private Methods
    }
}
