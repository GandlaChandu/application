using Com.ACSCorp.Accelerator.Core.Repository.BaseRepository.Mapper;
using Com.ACSCorp.Accelerator.TicketManagementSystem.Common.Enum;
using Com.ACSCorp.Accelerator.TicketManagementSystem.Models.DTO;
using Com.ACSCorp.Accelerator.TicketManagementSystem.Repository.Models;
using System.Collections.Generic;
using System.Linq;

namespace Com.ACSCorp.Accelerator.TicketManagementSystem.Repository.Mapper
{
    public static class IssueMapper
    {
        public static IssueTrackerEntity ToIssueTrackerEntity(this IssueTrackerDTO issueTrackerDTO)
        {
            IssueTrackerEntity issueTrackerEntity = null;

            if (issueTrackerDTO != null)
            {
                issueTrackerEntity = new IssueTrackerEntity
                {
                    ScanId = issueTrackerDTO.ScanId,
                    ScanType = (short)issueTrackerDTO.ScanType,
                    ScanIssueId = issueTrackerDTO.ScanIssueId,
                    TicketSystemType = (short)issueTrackerDTO.TicketSystemType,
                    TicketSystemIssueId = issueTrackerDTO.TicketSystemIssueId,
                    IsDeleted = issueTrackerDTO.IsDeleted
                };
            }

            return issueTrackerEntity;
        }

        public static List<IssueTrackerDTO> ToIssueTrackerDTOList(this IEnumerable<IssueTrackerEntity> issueTrackerEntities)
        {
            List<IssueTrackerDTO> issueTrackerDTOs = new List<IssueTrackerDTO>();

            if(issueTrackerEntities!=null && issueTrackerEntities.Any())
            {
                issueTrackerDTOs.AddRange(issueTrackerEntities.Select(s => s.ToIssueTrackerDTO()));
            }

            return issueTrackerDTOs;
        }

        public static IssueTrackerDTO ToIssueTrackerDTO(this IssueTrackerEntity issueTrackerEntity)
        {
            IssueTrackerDTO issueTrackerDTO = null;

            if (issueTrackerEntity != null)
            {
                issueTrackerDTO = new IssueTrackerDTO
                {
                    Id = issueTrackerEntity.Id,
                    ScanId = issueTrackerEntity.ScanId,
                    ScanType = (ScanType)issueTrackerEntity.ScanType,
                    ScanIssueId = issueTrackerEntity.ScanIssueId,
                    TicketSystemType = (TicketSystemType)issueTrackerEntity.TicketSystemType,
                    TicketSystemIssueId = issueTrackerEntity.TicketSystemIssueId,
                    IsDeleted = issueTrackerEntity.IsDeleted
                };

                CommonMapper.MapBaseDTODetails(issueTrackerEntity, issueTrackerDTO);
            }

            return issueTrackerDTO;
        }
    }
}
