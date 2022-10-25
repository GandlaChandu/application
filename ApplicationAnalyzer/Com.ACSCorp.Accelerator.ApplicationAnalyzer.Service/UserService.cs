using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Common;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.IRepository;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.IService;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Models.DTO.User;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Validators;
using Com.ACSCorp.Accelerator.Core.Models;

using FluentValidation.Results;

using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.Service
{
    public class UserService : IUserService
    {
        #region Variables

        private readonly IUserRepository _userRepository;

        #endregion Variables

        #region Constructors

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        #endregion Constructors

        #region Public Methods

        public async Task<Result<ListResult<UserDTO>>> GetAllUsersAsync(UserListRequest userListRequest)
        {
            ListResult<UserDTO> userListResult = await _userRepository.GetAllUsersAsync(userListRequest);
            return Result.Ok(userListResult);
        }

        public async Task<Result<UserDTO>> GetByIdAsync(int userId)
        {
            UserDTO user = await _userRepository.GetByIdAsync(userId);
            if (user == null || user.IsDeleted)
            {
                return Result.Fail<UserDTO>(Messages.UserNotFound);
            }

            return Result.Ok(user);
        }

        public async Task<Result<UserDTO>> GetByEmailAsync(string email)
        {
            UserDTO user = await _userRepository.GetRolesByEmailAsync(email);
            if (user == null || user.IsDeleted)
            {
                return Result.Fail<UserDTO>(Messages.UserNotFound);
            }

            return Result.Ok(user);
        }

        public async Task<Result<int>> AddUserAsync(UserDTO userDTO)
        {
            Result result = await ValidateUserAsync(userDTO);
            if (!result.IsSucceeded)
            {
                return Result.Fail<int>(result.GetErrorString());
            }

            UserDTO existingUser = await _userRepository.GetByEmailAsync(userDTO.Email);
            if (existingUser != null)
            {
                return Result.Fail<int>(Messages.UserExistWithGivenName);
            }

            userDTO.IsDeleted = false;

            int userId = await _userRepository.AddUserAsync(userDTO);
            return Result.Ok(userId);
        }

        public async Task<Result<int>> UpdateUserAsync(UserDTO userDTO)
        {
            Result result = await ValidateUserAsync(userDTO);
            if (!result.IsSucceeded)
            {
                return Result.Fail<int>(result.GetErrorString());
            }

            var user = await _userRepository.GetByIdAsync(userDTO.Id);
            if (user == null || user.IsDeleted)
            {
                return Result.Fail<int>(Messages.UserNotFound);
            }

            UserDTO existingUser = await _userRepository.GetByEmailAsync(userDTO.Email);
            if (existingUser != null && existingUser.Id != userDTO.Id)
            {
                return Result.Fail<int>(Messages.UserExistWithGivenName);
            }

            MapUser(userDTO, user);

            int userId = await _userRepository.UpdateUserAsync(user);
            return Result.Ok(userId);
        }

        public async Task<Result<bool>> DeleteUserAsync(int userId)
        {
            var user = await _userRepository.GetByIdAsync(userId);
            if (user == null || user.IsDeleted)
            {
                return Result.Fail<bool>(Messages.UserNotFound);
            }

            user.IsDeleted = true;

            int userIdRemoved = await _userRepository.UpdateUserAsync(user);
            return Result.Ok(userIdRemoved > 0);
        }

        #endregion Public Methods

        #region Private Methods

        private async Task<Result> ValidateUserAsync(UserDTO userDTO)
        {
            var userValidator = new UserValidator();
            ValidationResult validationResult = await userValidator.ValidateAsync(userDTO);

            if (!validationResult.IsValid)
            {
                return Result.Fail(validationResult.ToString());
            }

            return Result.Ok();
        }

        private void MapUser(UserDTO userDTO, UserDTO user)
        {
            user.FirstName = userDTO.FirstName;
            user.LastName = userDTO.LastName;
            user.Email = userDTO.Email;
            user.IsActive = userDTO.IsActive;
        }

        #endregion Private Methods
    }
}
