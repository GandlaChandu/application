using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Models.DTO.Job;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Repository.Models;

using System;
using System.Collections.Generic;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.Repository.Mapper
{
    public static class JobScanTypeMapper
    {
        public static List<JobScanType> ToJobScanTypeEntityList(this List<JobScanTypeDTO> jobScanTypeDTOs)
        {
            var jobScanTypes = new List<JobScanType>();

            foreach (var jobScanType in jobScanTypeDTOs)
            {
                jobScanTypes.Add(jobScanType.ToStaticScanTypeEntity());
            }

            return jobScanTypes;
        }

        public static JobScanType ToStaticScanTypeEntity(this JobScanTypeDTO jobScanTypeDTO)
        {
            var jobScanType = new JobScanType
            {
                Id = jobScanTypeDTO.Id,
                JobId = jobScanTypeDTO.JobId,
                ScanTypeId = Convert.ToInt16(jobScanTypeDTO.ScanType),
                IsDeleted = jobScanTypeDTO.IsDeleted
            };

            return jobScanType;
        }

        public static List<JobScanTypeDTO> ToJobScanTypeDTOList(this ICollection<JobScanType> jobScanTypes)
        {
            var jobScanTypeDTOs = new List<JobScanTypeDTO>();

            foreach (var jobScanType in jobScanTypes)
            {
                if (!jobScanType.IsDeleted)
                {
                    JobScanTypeDTO jobScanTypeDTO = jobScanType.ToJobScanTypeDTO();
                    jobScanTypeDTOs.Add(jobScanTypeDTO);
                }
            }

            return jobScanTypeDTOs;
        }

        public static JobScanTypeDTO ToJobScanTypeDTO(this JobScanType jobScanType)
        {
            var jobScanTypeDTO = new JobScanTypeDTO
            {
                Id = jobScanType.Id,
                JobId = jobScanType.JobId,
                ScanType = (Common.Enum.ScanType)jobScanType.ScanTypeId,
                IsDeleted = jobScanType.IsDeleted
            };

            return jobScanTypeDTO;
        }
    }
}
