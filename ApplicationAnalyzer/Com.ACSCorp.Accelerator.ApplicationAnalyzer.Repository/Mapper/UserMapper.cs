using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Models.DTO.User;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Repository.Models;
using Com.ACSCorp.Accelerator.Core.Repository.BaseRepository.Mapper;

using System.Collections.Generic;
using System.Linq;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.Repository.Mapper
{
    public static class UserMapper
    {
        public static UserDTO ToUserDTO(this User user)
        {
            if (user == null)
            {
                return null;
            }

            var userDTO = new UserDTO
            {
                Id = user.Id,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                IsActive = user.IsActive,
                IsAdmin = user.IsAdmin,
                IsDeleted = user.IsDeleted,
                UserRoles = user.UserRole.Where(c => !c.IsDeleted).ToList().ToUserPermissionList()
            };

            CommonMapper.MapBaseDTODetails(user, userDTO);

            return userDTO;
        }

        public static User ToUserEntity(this UserDTO userDTO)
        {
            User user = new User
            {
                Id = userDTO.Id,
                Email = userDTO.Email,
                FirstName = userDTO.FirstName,
                LastName = userDTO.LastName,
                IsActive = userDTO.IsActive,
                IsAdmin = userDTO.IsAdmin,
                IsDeleted = userDTO.IsDeleted
            };

            return user;
        }

        public static List<UserDTO> ToUserDTOs(this List<User> users)
        {
            List<UserDTO> userDTOs = new List<UserDTO>();

            foreach (User user in users)
            {
                userDTOs.Add(user.ToUserDTO());
            }

            return userDTOs;
        }
    }
}
