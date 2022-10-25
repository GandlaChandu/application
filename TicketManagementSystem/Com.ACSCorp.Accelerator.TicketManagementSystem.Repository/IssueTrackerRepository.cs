using Com.ACSCorp.Accelerator.Core.Repository.BaseRepository;
using Com.ACSCorp.Accelerator.TicketManagementSystem.IRepository;
using Com.ACSCorp.Accelerator.TicketManagementSystem.Models.DTO;
using Com.ACSCorp.Accelerator.TicketManagementSystem.Repository.Context;
using Com.ACSCorp.Accelerator.TicketManagementSystem.Repository.Mapper;
using Com.ACSCorp.Accelerator.TicketManagementSystem.Repository.Models;

using Microsoft.EntityFrameworkCore.Internal;

using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.TicketManagementSystem.Repository
{
    public class IssueTrackerRepository : BaseRepository<IssueTrackerEntity>, IIssueTrackerRepository
    {
        public IssueTrackerRepository(TicketManagementDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<int> AddIssueInfoAsync(IssueTrackerDTO issueDTO)
        {
            var issuetrackerEntity = issueDTO.ToIssueTrackerEntity();
            await AddAsync(issuetrackerEntity);
            return issuetrackerEntity.Id;
        }

        public async Task<int> UpdateIssueInfoAsync(IssueTrackerDTO issueDTO)
        {
            var issuetrackerEntity = issueDTO.ToIssueTrackerEntity();
            await UpdateAsync(issuetrackerEntity);
            return issuetrackerEntity.Id;
        }

        public async Task<IssueTrackerDTO> GetIssueTrackerAsync(int id)
        {
            var issueTrackerEntity = await GetAsync(c => c.Id == id);
            return issueTrackerEntity.ToIssueTrackerDTO();
        }

        public List<IssueTrackerDTO> GetIssueTrackersAsync(IssuesResultRequestDTO issuesResultRequest)
        {
            var issues = GetAll(s => s.ScanId == issuesResultRequest.ScanId
                 && s.ScanType == (short)issuesResultRequest.ScanType
                 && issuesResultRequest.IssueIds.Any(t => t == s.ScanIssueId))
                .ToList();

            return issues.ToIssueTrackerDTOList();
        }
    }
}
