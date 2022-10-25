using Com.ACSCorp.Accelerator.DMA.Schdeuler.CronExpressionResolver;
using Com.ACSCorp.Accelerator.DMA.Scheduler.Queue;
using Com.ACSCorp.Accelerator.DMA.Scheduler.Services.Enums;
using Com.ACSCorp.Accelerator.DMA.Scheduler.Services.Interfaces;
using Com.ACSCorp.Accelerator.DMA.Scheduler.Services.Models;

using Microsoft.Extensions.Logging;

using System;
using System.Threading;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.DMA.Scheduler
{
    public class MonitorLoop
    {
        private readonly IBackgroundTaskQueue _taskQueue;
        private readonly ILogger _logger;
        private readonly ISchedulerService _schedulerService;
        private readonly ICronResolver _cronResolver;

        public MonitorLoop(IBackgroundTaskQueue taskQueue,
            ISchedulerService schedulerService,
            ILogger<MonitorLoop> logger,
            ICronResolver cronResolver)
        {
            _taskQueue = taskQueue;
            _schedulerService = schedulerService;
            _logger = logger;
            _cronResolver = cronResolver;
        }

        /// <summary>
        /// Method is used to loop through the schedules.
        /// </summary>
        /// <param name="cancellationToken"></param>
        public void StartMonitorLoop(CancellationToken cancellationToken)
        {
            _logger.LogInformation("Monitor Loop is starting.");

            // Run a console user input loop in a background thread
            Task.Run(() => MonitorAsync(cancellationToken));
        }

        public async Task MonitorAsync(CancellationToken cancellationToken)
        {
            while (!cancellationToken.IsCancellationRequested)
            {
                try
                {
                    var jobSchedules = await _schedulerService.GetJobSchedules();

                    foreach (var jobSchedule in jobSchedules)
                    {
                        try
                        {
                            var now = DateTime.Now;
                            var difference = _cronResolver.GetFrequencyInMinutes(jobSchedule.CronSchedule);
                            var nextRun = _cronResolver.GetNextOccurance(jobSchedule.CronSchedule, now);
                            //skip the loop, if the nextRun date is not between schedule start and end dates.
                            if (IsBetween(nextRun, jobSchedule.StartDate, jobSchedule.EndDate))
                            {
                                var lastRun = nextRun.AddMinutes(-difference);
                                // Check if there is an entry in the log table for the next 5min
                                var latestExecution = await _schedulerService.GetLatestExecution(jobSchedule.JobId);
                                int lastDiff = 0;
                                if (latestExecution.HasValue)
                                {
                                    lastDiff = Convert.ToInt32((nextRun - latestExecution.Value).TotalMinutes);
                                }

                                if (lastDiff == 0 || (lastDiff > difference && !IsBetween(latestExecution.Value, lastRun, nextRun) && IsBetween(now, lastRun, nextRun)))
                                {
                                    var execSummary = await _schedulerService.AddJobExecSummary(jobSchedule);
                                    execSummary.StartDateTime = DateTime.Now;
                                    _taskQueue.QueueBackgroundWorkItem(async token =>
                                    {
                                        // Add an entry in the log schedule table                              
                                        var guid = Guid.NewGuid().ToString();

                                        _logger.LogInformation("Queued Background Task {Guid} is starting.", guid);

                                        // queue task to perform db monitoring on a server
                                        if (token.IsCancellationRequested)
                                        {
                                            execSummary.Message = string.Format("Queued Background Task {0} was cancelled.", guid);
                                            await UpdateJobExecSummaryAsync(execSummary, JobStatus.Aborted);
                                            _logger.LogInformation("Queued Background Task {Guid} was cancelled.", guid);
                                        }
                                        else
                                        {
                                            var isSuccess = await _schedulerService.TriggerJob(jobSchedule.JobId);
                                            if (isSuccess)
                                            {
                                                // Update log table
                                                execSummary.Message = $"Scan trigger for job {jobSchedule.JobId} has Completed";
                                                execSummary.LastSuccessRunTime = DateTime.Now;
                                                double gapInSeconds = (execSummary.LastSuccessRunTime.Value - execSummary.StartDateTime).TotalSeconds;
                                                execSummary.RunDuration = TimeSpan.FromSeconds(gapInSeconds);
                                                await UpdateJobExecSummaryAsync(execSummary, JobStatus.Completed);
                                                _logger.LogInformation($"Scan trigger for job {jobSchedule.JobId} has Completed");
                                            }
                                            else
                                            {
                                                // Update log table
                                                execSummary.Message = $"Scan trigger for job {jobSchedule.JobId} has Failed";
                                                await UpdateJobExecSummaryAsync(execSummary, JobStatus.Failed);
                                                _logger.LogInformation($"Scan trigger for job {jobSchedule.JobId} has Failed");
                                            }
                                        }
                                    });
                                }
                            }
                        }
                        catch (Exception ex)
                        {
                            _logger.LogError(ex, ex.Message);
                            continue;
                        }
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, ex.Message);
                    continue;
                }
            }
        }

        private async Task UpdateJobExecSummaryAsync(JobExecutionSummary jobExecutionSummary, JobStatus jobStatus)
        {
            jobExecutionSummary.EndDateTime = DateTime.Now;
            jobExecutionSummary.RunStatus = jobStatus;
            await _schedulerService.UpdateJobExecSummary(jobExecutionSummary);
        }

        private bool IsBetween(DateTime input, DateTime from, DateTime to)
        {
            bool isBetween = (input > from && input < to);
            return isBetween;
        }
    }
}