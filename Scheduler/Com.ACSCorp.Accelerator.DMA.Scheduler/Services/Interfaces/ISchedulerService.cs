using Com.ACSCorp.Accelerator.DMA.Scheduler.Services.Models;

using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.DMA.Scheduler.Services.Interfaces
{
    public interface ISchedulerService
    {
        Task<bool> TriggerJob(int jobId);

        Task<JobExecutionSummary> AddJobExecSummary(JobSchedule jobSchedule);

        Task<DateTime?> GetLatestExecution(int jobId);

        Task UpdateJobExecSummary(JobExecutionSummary summary);

        Task<List<JobSchedule>> GetJobSchedules();
    }
}