using Com.ACSCorp.Accelerator.TicketManagementSystem.Common.Enum;
using Com.ACSCorp.Accelerator.TicketManagementSystem.Models.ModelBinder;

using Microsoft.AspNetCore.Mvc;

using System;
using System.ComponentModel.DataAnnotations;

namespace Com.ACSCorp.Accelerator.TicketManagementSystem.Models
{
    [ModelBinder(typeof(TicketSystemIssueRequestModelBinder<TicketSystemIssueModel>))]
    public class TicketSystemIssueModel : BaseTicketSystemIssueModel
    {
        [Required(ErrorMessage = "ScanIssueId is required.")]
        public string ScanIssueId { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "ScanId is required.")]
        public int ScanId { get; set; }

        [EnumDataType(typeof(ScanType), ErrorMessage = "ScanType is required.")]
        public ScanType ScanType { get; set; }
    }
}
