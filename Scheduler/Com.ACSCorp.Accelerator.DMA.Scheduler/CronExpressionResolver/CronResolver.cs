using Quartz;

using System;

namespace Com.ACSCorp.Accelerator.DMA.Schdeuler.CronExpressionResolver
{
    public class CronResolver : ICronResolver
    {
        public int GetFrequencyInMinutes(string cron)
        {
            var schedule = new CronExpression(cron);
            DateTimeOffset now = DateTime.Now;
            DateTimeOffset? nextRun = schedule.GetTimeAfter(now);
            DateTimeOffset? secondRun = schedule.GetTimeAfter(nextRun.Value);
            //DateTimeOffset? thirdRun = schedule.GetTimeAfter(secondRun.Value);


            var diff1 = (secondRun.Value.LocalDateTime - nextRun.Value.LocalDateTime).TotalMinutes;
            //var diff3 = (thirdRun.Value.LocalDateTime - secondRun.Value.LocalDateTime).TotalMinutes;

            double frequency = diff1;

            return Convert.ToInt32(frequency);
        }

        public DateTime GetNextOccurance(string cron, DateTime now)
        {
            var schedule = new CronExpression(cron);
            DateTimeOffset nowOffset = now;
            DateTimeOffset? nextRun = schedule.GetTimeAfter(now);
            return nextRun.Value.LocalDateTime;
        }
    }
}