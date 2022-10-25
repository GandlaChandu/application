using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Models.DTO.Job;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Repository.Models;
using Com.ACSCorp.Accelerator.Core.Repository.BaseRepository.Mapper;
using Com.ACSCorp.Accelerator.Core.Utility;

using System.Collections.Generic;
using System.Linq;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.Repository.Mapper
{
    public static class JobMapper
    {
        public static JobDTO ToJobDTO(this Job job)
        {
            if (job == null)
            {
                return null;
            }

            var jobDTO = new JobDTO
            {
                Id = job.Id,
                Name = job.Name,
                IsEnabled = job.IsEnabled,
                IsScheduled = job.IsScheduled,
                ProjectId = job.ProjectId,
                DivisionId = job.Project?.Division?.Id ?? default,
                ClientId = job.Project?.Division?.ClientId ?? default,
                ScanTypes = job.JobScanType.ToJobScanTypeDTOList(),
                IsDeleted = job.IsDeleted,
                Schedule = job.JobSchedule?.FirstOrDefault()?.ToJobScheduleDTO()
            };

            CommonMapper.MapBaseDTODetails(job, jobDTO);

            return jobDTO;
        }

        public static JobListDTO ToJobListDTO(this Job job)
        {
            if (job == null)
            {
                return null;
            }

            var jobListDTO = new JobListDTO
            {
                Id = job.Id,
                Name = job.Name,
                IsEnabled = job.IsEnabled,
                IsScheduled = job.IsScheduled,
                Project = job.Project?.Name,
                Division = job.Project?.Division?.Name,
                Client = job.Project?.Division?.Client?.Name,
                ScanType = FormatJobScanTypes(job),
                IsDeleted = job.IsDeleted,
                Schedule = job.JobSchedule?.FirstOrDefault()?.ToJobScheduleDTO()
            };

            CommonMapper.MapBaseDTODetails(job, jobListDTO);

            return jobListDTO;
        }

        public static Job ToJobEntity(this JobDTO jobDTO)
        {
            Job job = new Job
            {
                Id = jobDTO.Id,
                Name = jobDTO.Name,
                ProjectId = jobDTO.ProjectId,
                IsEnabled = jobDTO.IsEnabled,
                IsScheduled = jobDTO.IsScheduled,
                IsDeleted = jobDTO.IsDeleted
            };

            return job;
        }

        public static List<JobListDTO> ToJobListDTOs(this List<Job> jobs)
        {
            List<JobListDTO> jobDTOs = new List<JobListDTO>();

            foreach (Job job in jobs)
            {
                jobDTOs.Add(job.ToJobListDTO());
            }

            return jobDTOs;
        }

        private static string FormatJobScanTypes(Job job)
        {
            return string.Join(", ", job.JobScanType
                .Where(c => !c.IsDeleted)
                .Select(c => ((Common.Enum.ScanType)c.ScanTypeId).GetEnumDescription()));
        }
    }
}
