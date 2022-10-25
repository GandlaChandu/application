using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Models.DTO.JobSchedule;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Repository.Models;
using Com.ACSCorp.Accelerator.Core.Repository.BaseRepository.Mapper;

using System.Collections.Generic;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.Repository.Mapper
{
    public static class JobScheduleMapper
    {
        public static JobScheduleDTO ToJobScheduleDTO(this JobSchedule jobSchedule)
        {
            if (jobSchedule == null)
            {
                return null;
            }

            var jobScheduleDTO = new JobScheduleDTO
            {
                Id = jobSchedule.Id,
                CronSchedule = jobSchedule.CronSchedule,
                CronScheduleDesc = jobSchedule.CronScheduleDesc,
                StartDate = jobSchedule.StartDate,
                EndDate = jobSchedule.EndDate,
                IsActive = jobSchedule.IsActive,
                JobId = jobSchedule.JobId
            };

            CommonMapper.MapBaseDTODetails(jobSchedule, jobScheduleDTO);

            return jobScheduleDTO;
        }

        public static JobSchedule ToJobScheduleEntity(this JobScheduleDTO jobScheduleDTO)
        {
            var jobSchedule = new JobSchedule
            {
                Id = jobScheduleDTO.Id,
                JobId = jobScheduleDTO.JobId,
                CronSchedule = jobScheduleDTO.CronSchedule,
                CronScheduleDesc = jobScheduleDTO.CronScheduleDesc,
                StartDate = jobScheduleDTO.StartDate,
                EndDate = jobScheduleDTO.EndDate,
                IsActive = jobScheduleDTO.IsActive
            };

            return jobSchedule;
        }

        public static List<JobScheduleDTO> ToJobScheduleDTOs(this List<JobSchedule> jobSchedules)
        {
            List<JobScheduleDTO> jobScheduleDTOs = new List<JobScheduleDTO>();

            foreach (JobSchedule jobSchedule in jobSchedules)
            {
                jobScheduleDTOs.Add(jobSchedule.ToJobScheduleDTO());
            }

            return jobScheduleDTOs;
        }
    }
}
