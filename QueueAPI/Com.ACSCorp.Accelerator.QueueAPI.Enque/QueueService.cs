using Com.ACSCorp.Accelerator.Core.Models;
using Com.ACSCorp.Accelerator.QueueAPI.Common;
using Com.ACSCorp.Accelerator.QueueAPI.Enque.Interfaces;
using Com.ACSCorp.Accelerator.QueueAPI.Enums;
using Com.ACSCorp.Accelerator.QueueAPI.Models;
using Com.ACSCorp.Accelerator.QueueAPI.Repository.Interfaces;
using Com.ACSCorp.Accelerator.QueueAPI.Repository.Models;

using Microsoft.Extensions.Logging;

using System;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.QueueAPI.Enque
{
    public class QueueService : IQueueService
    {
        private readonly IQueueAPIRepository _queueAPIRepository;
        private readonly ILogger _logger;

        public QueueService(IQueueAPIRepository queueAPIRepository, ILogger<QueueService> logger)
        {
            _queueAPIRepository = queueAPIRepository;
            _logger = logger;
        }

        public async Task<Result<long>> EnqueAsync(EnqueAPIModel enqueAPI)
        {
            try
            {
                QueueAPIEntity queueApi = GetQueueEntity(enqueAPI);
                await _queueAPIRepository.AddAsync(queueApi);

                if (queueApi.Id == 0)
                {
                    return Result.Fail<long>(Messages.FailedToEnque);
                }
                return Result.Ok(queueApi.Id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, Messages.FailedToEnque);
                return Result.Fail<long>(Messages.FailedToEnque);
            }
        }

        public async Task<Result<QueueStatus>> GetQueueStatusAsync(long id)
        {
            try
            {
                QueueAPIEntity queueEntity = await _queueAPIRepository.GetAsync(s => s.Id == id);
                if (queueEntity == null)
                {
                    return Result.Fail<QueueStatus>(Messages.NoRecordFoundForQueueId);
                }
                return Result.Ok((QueueStatus)queueEntity.Status);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, Messages.FailedToEnque);
                return Result.Fail<QueueStatus>(Messages.NoRecordFoundForQueueId);
            }
        }

        public async Task<Result<QueueAPIEntity>> GetQueueAsync(long id)
        {
            try
            {
                QueueAPIEntity queueEntity = await _queueAPIRepository.GetAsync(s => s.Id == id);
                if (queueEntity == null)
                {
                    return Result.Fail<QueueAPIEntity>(Messages.NoRecordFoundForQueueId);
                }

                return Result.Ok(queueEntity);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, Messages.FailedToEnque);
                return Result.Fail<QueueAPIEntity>(Messages.NoRecordFoundForQueueId);
            }
        }

        public Result<int> GetPendingQueueCount()
        {
            int pendingQueueCount = GetQueueCountByStatus(QueueStatus.Queued);

            return Result.Ok(pendingQueueCount);
        }

        private int GetQueueCountByStatus(QueueStatus queueStatus)
        {
            return _queueAPIRepository.GetCount(s => s.Status == (short)queueStatus);
        }

        private QueueAPIEntity GetQueueEntity(EnqueAPIModel enqueAPI)
        {
            return new QueueAPIEntity
            {
                Uri = enqueAPI.Uri,
                Status = (short)QueueStatus.Queued,
                Content = enqueAPI.Content,
                Headers = enqueAPI.Headers,
                HttpType = (short)enqueAPI.HttpType
            };
        }
    }
}
