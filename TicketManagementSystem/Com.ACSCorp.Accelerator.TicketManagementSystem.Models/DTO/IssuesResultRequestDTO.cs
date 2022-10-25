using Com.ACSCorp.Accelerator.TicketManagementSystem.Common.Enum;

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Com.ACSCorp.Accelerator.TicketManagementSystem.Models.DTO
{
    public class IssuesResultRequestDTO
    {
        [Range(1, int.MaxValue, ErrorMessage = "ScanId is required and should be greater than 0.")]
        public int ScanId { get; set; }

        [EnumDataType(typeof(ScanType), ErrorMessage = "ScanType is required.")]
        public ScanType ScanType { get; set; }

        [Required(ErrorMessage = "IssueIds is required.")]
        [MinLength(1, ErrorMessage = "At least one issueId is required.")]
        public List<string> IssueIds { get; set; }
    }
}
