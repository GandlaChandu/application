using System;

namespace Com.ACSCorp.Accelerator.DMA.Schdeuler.CronExpressionResolver
{
    public interface ICronResolver
    {
        int GetFrequencyInMinutes(string cron);
        DateTime GetNextOccurance(string cron, DateTime now);
    }
}