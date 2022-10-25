using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Common;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Common.Enum;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.IRepository;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.IService;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.IService.ApiClients;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Models.DTO.Job;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Models.DTO.JobSchedule;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Validators;
using Com.ACSCorp.Accelerator.Core.Authorization.Interfaces;
using Com.ACSCorp.Accelerator.Core.Models;

using FluentValidation.Results;

using Microsoft.Extensions.Logging;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.Service
{
    public class JobService : IJobService
    {
        #region Variables

        private readonly ILogger _logger;
        private readonly IIdentityService _identityService;
        private readonly IJobScanTypeService _jobScanTypeService;
        private readonly IJobRepository _jobRepository;
        private readonly IJobScheduleRepository _jobScheduleRepository;
        private readonly ICodeAnalyzerClient _codeAnalyzerClient;
        private readonly ISecurityAnalyzerClient _securityAnalyzerClient;

        #endregion Variables

        #region Constructors

        public JobService(
            ILogger<JobService> logger,
            IIdentityService identityService,
            IJobScanTypeService jobScanTypeService,
            IJobRepository jobRepository,
            IJobScheduleRepository jobScheduleRepository,
            ICodeAnalyzerClient codeAnalyzerClient,
            ISecurityAnalyzerClient securityAnalyzerClient)
        {
            _logger = logger;
            _identityService = identityService;
            _jobScanTypeService = jobScanTypeService;
            _jobRepository = jobRepository;
            _jobScheduleRepository = jobScheduleRepository;
            _codeAnalyzerClient = codeAnalyzerClient;
            _securityAnalyzerClient = securityAnalyzerClient;
        }

        #endregion Constructors

        #region Public Methods

        public async Task<Result<ListResult<JobListDTO>>> GetAllJobsAsync(JobListRequest jobListRequest)
        {
            List<int> accessibleProjects = _identityService.GetAccessibleProjects();
            ListResult<JobListDTO> jobListResult = await _jobRepository.GetAllJobsAsync(jobListRequest, accessibleProjects);

            return Result.Ok(jobListResult);
        }

        public async Task<Result<JobDTO>> GetByIdAsync(int jobId)
        {
            JobDTO job = await _jobRepository.GetByIdAsync(jobId);
            if (job == null || job.IsDeleted)
            {
                return Result.Fail<JobDTO>(Messages.JobNotFound);
            }

            return Result.Ok(job);
        }

        public async Task<Result<int>> AddJobAsync(JobDTO jobDTO)
        {
            Result result = await ValidateJobAsync(jobDTO);
            if (!result.IsSucceeded)
            {
                return Result.Fail<int>(result.GetErrorString());
            }

            JobDTO existingJob = await _jobRepository.GetByNameAsync(jobDTO.Name);
            if (existingJob != null)
            {
                return Result.Fail<int>(Messages.JobExistWithGivenName);
            }

            if (!_identityService.HasProjectAdminAccess(jobDTO.ProjectId, jobDTO.ClientId))
            {
                return Result.Fail<int>(Messages.UnAuthorizedEntityAccess);
            }

            jobDTO.IsDeleted = false;

            using (var transaction = _jobRepository.BeginTransaction())
            {
                try
                {
                    int jobId = await _jobRepository.AddJobAsync(jobDTO);

                    if (jobId <= 0)
                    {
                        return Result.Fail<int>(Messages.JobAddFailed);
                    }

                    // Job ScanTypes
                    await AddJobScanTypesAsync(jobId, jobDTO.ScanTypes);

                    // Job Schedule
                    if (jobDTO.Schedule != null)
                    {
                        jobDTO.Schedule.JobId = jobId;
                        jobDTO.Schedule.IsActive = jobDTO.IsEnabled;

                        int jobScheduleId = await _jobScheduleRepository.AddJobScheduleAsync(jobDTO.Schedule);

                        if (jobScheduleId <= 0)
                        {
                            await transaction.RollbackAsync();
                            return Result.Fail<int>(Messages.JobScheduleAddFailed);
                        }
                    }

                    await transaction.CommitAsync();

                    return Result.Ok(jobId);
                }
                catch (Exception ex)
                {
                    await transaction.RollbackAsync();
                    _logger.LogError(ex, Messages.JobAddFailed);

                    return Result.Fail<int>(Messages.JobAddFailed);
                }
            }
        }

        public async Task<Result<int>> UpdateJobAsync(JobDTO jobDTO)
        {
            Result result = await ValidateJobAsync(jobDTO);
            if (!result.IsSucceeded)
            {
                return Result.Fail<int>(result.GetErrorString());
            }

            JobDTO job = await _jobRepository.GetByIdAsync(jobDTO.Id);
            if (job == null || job.IsDeleted)
            {
                return Result.Fail<int>(Messages.JobNotFound);
            }

            JobDTO existingJob = await _jobRepository.GetByNameAsync(jobDTO.Name);
            if (existingJob != null && existingJob.Id != jobDTO.Id)
            {
                return Result.Fail<int>(Messages.JobExistWithGivenName);
            }

            if (!_identityService.HasProjectAdminAccess(job.ProjectId, job.ClientId))
            {
                return Result.Fail<int>(Messages.UnAuthorizedEntityAccess);
            }

            MapJob(jobDTO, job);

            using (var transaction = _jobRepository.BeginTransaction())
            {
                try
                {
                    int jobId = await _jobRepository.UpdateJobAsync(job);

                    //Update Job ScanTypes
                    Result jobScanTypesUpdateResult = await UpdateJobScanTypesAsync(jobId, job.ScanTypes, jobDTO.ScanTypes);
                    if (!jobScanTypesUpdateResult.IsSucceeded)
                    {
                        await transaction.RollbackAsync();
                        return Result.Fail<int>(jobScanTypesUpdateResult.GetErrorString());
                    }

                    //Update Job Schedule
                    Result scheduleUpdateResult = await UpdateJobScheduleAsync(jobId, jobDTO);
                    if (!scheduleUpdateResult.IsSucceeded)
                    {
                        await transaction.RollbackAsync();
                        return Result.Fail<int>(scheduleUpdateResult.GetErrorString());
                    }

                    await transaction.CommitAsync();

                    return Result.Ok(jobId);
                }
                catch (Exception ex)
                {
                    await transaction.RollbackAsync();
                    _logger.LogError(ex, Messages.JobUpdateFailed);

                    return Result.Fail<int>(Messages.JobUpdateFailed);
                }
            }
        }

        public async Task<Result<bool>> DeleteJobAsync(int jobId)
        {
            JobDTO job = await _jobRepository.GetByIdAsync(jobId);
            if (job == null || job.IsDeleted)
            {
                return Result.Fail<bool>(Messages.JobNotFound);
            }

            if (!_identityService.HasProjectAdminAccess(job.ProjectId, job.ClientId))
            {
                return Result.Fail<bool>(Messages.UnAuthorizedEntityAccess);
            }

            job.IsDeleted = true;

            int jobIdRemoved = await _jobRepository.UpdateJobAsync(job);
            return Result.Ok(jobIdRemoved > 0);
        }

        public async Task<Result<bool>> TriggerJobAsync(int jobId)
        {
            JobDTO job = await _jobRepository.GetByIdAsync(jobId);
            if (job == null || job.IsDeleted)
            {
                return Result.Fail<bool>(Messages.JobNotFound);
            }

            List<Task> tasks = new List<Task>();

            foreach (JobScanTypeDTO jobScanType in job.ScanTypes)
            {
                switch (jobScanType.ScanType)
                {
                    case ScanType.StaticScan:
                        tasks.Add(_codeAnalyzerClient.PostScanAsync(job.ProjectId));
                        break;
                    case ScanType.DynamicScan:
                        tasks.Add(_securityAnalyzerClient.PostScanAsync(job.ProjectId));
                        break;
                    default:
                        throw new NotImplementedException($"{jobScanType.ScanType} is not supported");
                }
            }

            await Task.WhenAll(tasks.ToArray());

            return Result.Ok(true);
        }

        #endregion Public Methods

        #region Private Methods

        private async Task<Result> ValidateJobAsync(JobDTO jobDTO)
        {
            var jobValidator = new JobValidator();
            ValidationResult validationResult = await jobValidator.ValidateAsync(jobDTO);

            if (!validationResult.IsValid)
            {
                return Result.Fail(validationResult.ToString());
            }

            return Result.Ok();
        }

        private async Task<Result> UpdateJobScheduleAsync(int jobId, JobDTO jobDTO)
        {
            JobScheduleDTO jobSchedule = await _jobScheduleRepository.GetByJobIdAsync(jobId);
            if (jobSchedule == null)
            {
                jobDTO.Schedule.JobId = jobId;
                jobDTO.Schedule.IsActive = jobDTO.IsEnabled;

                int jobScheduleId = await _jobScheduleRepository.AddJobScheduleAsync(jobDTO.Schedule);

                if (jobScheduleId <= 0)
                {
                    return Result.Fail(Messages.JobScheduleAddFailed);
                }
            }
            else
            {
                MapJobSchedule(jobDTO, jobSchedule);

                int jobScheduleId = await _jobScheduleRepository.UpdateJobScheduleAsync(jobSchedule);

                if (jobScheduleId <= 0)
                {
                    return Result.Fail(Messages.JobScheduleUpdateFailed);
                }
            }

            return Result.Ok();
        }

        private void MapJob(JobDTO jobDTO, JobDTO job)
        {
            job.Name = jobDTO.Name;
            job.IsEnabled = jobDTO.IsEnabled;
            job.ProjectId = jobDTO.ProjectId;
        }

        private void MapJobSchedule(JobDTO jobDTO, JobScheduleDTO jobSchedule)
        {
            jobSchedule.IsActive = jobDTO.IsEnabled;
            jobSchedule.StartDate = jobDTO.Schedule.StartDate;
            jobSchedule.EndDate = jobDTO.Schedule.EndDate;
            jobSchedule.CronSchedule = jobDTO.Schedule.CronSchedule;
            jobSchedule.CronScheduleDesc = jobDTO.Schedule.CronScheduleDesc;
        }

        private async Task AddJobScanTypesAsync(int jobId, List<JobScanTypeDTO> jobScanTypeDTOs)
        {
            if (jobScanTypeDTOs != null && jobScanTypeDTOs.Count > 0)
            {
                jobScanTypeDTOs.ForEach((c) =>
                {
                    c.JobId = jobId;
                    c.IsDeleted = false;
                });
                await _jobScanTypeService.AddJobScanTypesAsync(jobScanTypeDTOs);
            }
        }

        private async Task<Result> UpdateJobScanTypesAsync(int jobId, List<JobScanTypeDTO> dbJobScanTypes, List<JobScanTypeDTO> jobScanTypeDTOs)
        {
            if (jobScanTypeDTOs != null)
            {
                List<JobScanTypeDTO> scanTypesToAdd = new List<JobScanTypeDTO>();

                foreach (JobScanTypeDTO jobScanTypeDTO in jobScanTypeDTOs)
                {
                    if (dbJobScanTypes is null || !dbJobScanTypes.Any(c => c.ScanType == jobScanTypeDTO.ScanType))
                    {
                        scanTypesToAdd.Add(jobScanTypeDTO);
                    }
                }

                await AddJobScanTypesAsync(jobId, scanTypesToAdd);
            }

            if (dbJobScanTypes != null)
            {
                foreach (JobScanTypeDTO dbScanType in dbJobScanTypes)
                {
                    if (!jobScanTypeDTOs.Any(c => c.ScanType == dbScanType.ScanType))
                    {
                        dbScanType.IsDeleted = true;
                    }
                }
                await _jobScanTypeService.UpdateJobScanTypesAsync(dbJobScanTypes);
            }

            return Result.Ok();
        }

        #endregion Private Methods
    }
}
