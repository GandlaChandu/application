using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Models;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Repository.Models;
using Com.ACSCorp.Accelerator.Core.Models.Enums;

using System;
using System.Collections.Generic;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.Repository.Mapper
{
    public static class UserRoleMapper
    {
        public static UserRole ToUserRoleEntity(this UserRoleDTO userRoleDTO)
        {
            var userRole = new UserRole
            {
                Id = userRoleDTO.Id,
                UserId = userRoleDTO.UserId,
                EntityTypeId = Convert.ToInt16(userRoleDTO.EntityType),
                EntityId = userRoleDTO.EntityId,
                RoleId = Convert.ToInt16(userRoleDTO.RoleId),
                IsDeleted = userRoleDTO.IsDeleted
            };

            return userRole;
        }

        public static List<UserRole> ToUserRoleEntityList(this List<UserRoleDTO> userRoleDTOs)
        {
            var userRoleList = new List<UserRole>();

            foreach (UserRoleDTO userRoleDTO in userRoleDTOs)
            {
                userRoleList.Add(userRoleDTO.ToUserRoleEntity());
            }

            return userRoleList;
        }

        public static UserRoleDTO ToUserRoleDTO(this UserRole userRole)
        {
            var userRoleDTO = new UserRoleDTO
            {
                Id = userRole.Id,
                UserId = userRole.UserId,
                EntityId = userRole.EntityId,
                EntityType = (EntityType)userRole.EntityTypeId,
                RoleId = (Role)userRole.RoleId,
                IsDeleted = userRole.IsDeleted
            };

            return userRoleDTO;
        }

        public static List<UserRoleDTO> ToUserRoleDTOList(this List<UserRole> userRoles)
        {
            var userRoleDTOs = new List<UserRoleDTO>();

            foreach (UserRole userRole in userRoles)
            {
                userRoleDTOs.Add(userRole.ToUserRoleDTO());
            }

            return userRoleDTOs;
        }

        public static UserRoleResponse ToUserRoleResponse(this UserRole userRole)
        {
            var userRoleResponseDTO = new UserRoleResponse
            {
                Id = userRole.Id,
                RoleId = (Role)userRole.RoleId,
                Role = userRole.RoleId.ToString(),
                User = userRole.User.ToUserDTO()
            };

            return userRoleResponseDTO;
        }

        public static List<UserRoleResponse> ToUserRoleResponseList(this List<UserRole> userRoles)
        {
            var userRoleResponses = new List<UserRoleResponse>();

            foreach (UserRole userRole in userRoles)
            {
                userRoleResponses.Add(userRole.ToUserRoleResponse());
            }

            return userRoleResponses;
        }

        public static UserPermissionDTO ToUserPermissionDTO(this UserRole userRole)
        {
            var userPermissionDTO = new UserPermissionDTO
            {
                RoleId = (Role)userRole.RoleId,
                EntityId = userRole.EntityId,
                EntityType = (EntityType)userRole.EntityTypeId
            };

            return userPermissionDTO;
        }

        public static List<UserPermissionDTO> ToUserPermissionList(this List<UserRole> userRoles)
        {
            var userPermissions = new List<UserPermissionDTO>();

            foreach (UserRole userRole in userRoles)
            {
                userPermissions.Add(userRole.ToUserPermissionDTO());
            }

            return userPermissions;
        }
    }
}
