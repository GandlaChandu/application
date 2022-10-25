using Com.ACSCorp.Accelerator.DMA.Scheduler.Services.Enums;
using Com.ACSCorp.Accelerator.DMA.Scheduler.Services.Interfaces;
using Com.ACSCorp.Accelerator.DMA.Scheduler.Services.Models;

using Microsoft.Extensions.Configuration;

using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.DMA.Scheduler.Services
{
    public class SchedulerService : ISchedulerService
    {
        private IConfiguration _configuration;

        public SchedulerService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<JobExecutionSummary> AddJobExecSummary(JobSchedule schedule)
        {
            var apiUrl = _configuration["ApplicationAnalyzerApiUrl"] + "jobExecutionSummary/";
            var summary = new JobExecutionSummary
            {
                JobId = schedule.JobId,
                JobName = schedule.JobName,
                StartDateTime = DateTime.Now,
                RunStatus = JobStatus.Started,
                Message = string.Empty,
                LastSuccessRunTime = DateTime.MinValue
            };
            summary.Id = await HTTPClientWrapper<int>.PostRequest(apiUrl, summary);
            return summary;
        }

        public async Task UpdateJobExecSummary(JobExecutionSummary summary)
        {
            var apiUrl = _configuration["ApplicationAnalyzerApiUrl"] + "jobExecutionSummary/";
            await HTTPClientWrapper<JobExecutionSummary>.PutRequest(apiUrl, summary);
        }

        public async Task<List<JobSchedule>> GetJobSchedules()
        {
            var apiUrl = _configuration["ApplicationAnalyzerApiUrl"] + "JobSchedule/GetAll";
            var schedules = await HTTPClientWrapper<List<JobSchedule>>.Get(apiUrl);
            return schedules;
        }

        public async Task<DateTime?> GetLatestExecution(int jobId)
        {
            var apiUrl = _configuration["ApplicationAnalyzerApiUrl"] + "jobExecutionSummary/GetLatestExecution/" + jobId;
            var latestSchedule = await HTTPClientWrapper<JobExecutionSummary>.Get(apiUrl);
            if (latestSchedule != null)
            {
                return latestSchedule.StartDateTime;
            }
            else
            {
                return null;
            }
        }

        public async Task<bool> TriggerJob(int jobId)
        {
            string apiUrl = _configuration["ApplicationAnalyzerApiUrl"] + $"job/Trigger/{jobId}";

            bool isSuccess = await HTTPClientWrapper<bool>.PostRequest(apiUrl, jobId);
            return isSuccess;
        }
    }
}