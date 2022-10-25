using Com.ACSCorp.Accelerator.ApplicationAnalyzer.IRepository;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Models.DTO.User;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Repository.Context;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Repository.Mapper;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Repository.Models;
using Com.ACSCorp.Accelerator.Core.Models;
using Com.ACSCorp.Accelerator.Core.QueryUtility;
using Com.ACSCorp.Accelerator.Core.Repository.BaseRepository;

using Microsoft.EntityFrameworkCore;

using System.Linq;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.Repository
{
    public class UserRepository : BaseRepository<User>, IUserRepository
    {
        #region Constructors
        public UserRepository(ApplicationAnalyzerContext dbContext) : base(dbContext)
        {
        }

        #endregion Constructors

        #region Public Methods

        public async Task<ListResult<UserDTO>> GetAllUsersAsync(UserListRequest userListRequest)
        {
            var query = GetAll(c => !c.IsDeleted);

            if (userListRequest.ExcludeInactive)
            {
                query = query.Where(c => c.IsActive);
            }

            query = query.OrderByDescending(c => c.Id);
            var pagedResult = await QueryUtility<User>.GetQueryResultAsync(query, userListRequest.ListParameter);

            return new ListResult<UserDTO>
            {
                Total = pagedResult.Total,
                Items = pagedResult.Items.ToUserDTOs()
            };
        }

        public async Task<UserDTO> GetByIdAsync(int userId)
        {
            var user = await GetAsync(c => c.Id == userId);

            return user.ToUserDTO();
        }

        public async Task<UserDTO> GetByEmailAsync(string email)
        {
            var user = await GetAsync(c => !c.IsDeleted && c.Email.Equals(email));

            return user.ToUserDTO();
        }

        public async Task<UserDTO> GetRolesByEmailAsync(string email)
        {
            var user = await _dbContext.Set<User>()
                .Include(c => c.UserRole)
                .FirstOrDefaultAsync(c => !c.IsDeleted && c.Email.Equals(email));

            return user.ToUserDTO();
        }

        public async Task<int> AddUserAsync(UserDTO userDTO)
        {
            User user = userDTO.ToUserEntity();
            await AddAsync(user);

            return user.Id;
        }

        public async Task<int> UpdateUserAsync(UserDTO userDTO)
        {
            User user = userDTO.ToUserEntity();
            await UpdateAsync(user);

            return user.Id;
        }

        #endregion Public Methods
    }
}
