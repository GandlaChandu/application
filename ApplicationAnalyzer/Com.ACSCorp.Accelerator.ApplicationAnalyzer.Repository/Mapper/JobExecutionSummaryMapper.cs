using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Models.DTO.JobExecutionSummary;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Repository.Models;
using Com.ACSCorp.Accelerator.Core.Repository.BaseRepository.Mapper;

using System;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.Repository.Mapper
{
    public static class JobExecutionSummaryMapper
    {
        public static JobExecutionSummaryDTO ToJobExecutionSummaryDTO(this JobExecutionSummary jobExecutionSummary)
        {
            if (jobExecutionSummary == null)
            {
                return null;
            }

            var jobExecutionSummaryDTO = new JobExecutionSummaryDTO
            {
                Id = jobExecutionSummary.Id,
                EndDateTime = jobExecutionSummary.EndDateTime,
                StartDateTime = jobExecutionSummary.StartDateTime,
                LastSuccessRunTime = jobExecutionSummary.LastSuccessRunTime,
                Message = jobExecutionSummary.Message,
                RunDuration = jobExecutionSummary.RunDuration,
                RunStatus = (Common.Enum.JobStatus)jobExecutionSummary.JobStatusId,
                JobId = jobExecutionSummary.JobId
            };

            CommonMapper.MapBaseDTODetails(jobExecutionSummary, jobExecutionSummaryDTO);

            return jobExecutionSummaryDTO;
        }

        public static JobExecutionSummary ToJobExecutionSummaryEntity(this JobExecutionSummaryDTO jobExecutionSummaryDTO)
        {
            var jobExecutionSummary = new JobExecutionSummary
            {
                Id = jobExecutionSummaryDTO.Id,
                JobId = jobExecutionSummaryDTO.JobId,
                JobName = jobExecutionSummaryDTO.Jobname,
                StartDateTime = jobExecutionSummaryDTO.StartDateTime,
                EndDateTime = jobExecutionSummaryDTO.EndDateTime,
                RunDuration = jobExecutionSummaryDTO.RunDuration,
                JobStatusId = Convert.ToInt16(jobExecutionSummaryDTO.RunStatus),
                Message = jobExecutionSummaryDTO.Message,
                LastSuccessRunTime = jobExecutionSummaryDTO.LastSuccessRunTime
            };

            return jobExecutionSummary;
        }
    }
}
