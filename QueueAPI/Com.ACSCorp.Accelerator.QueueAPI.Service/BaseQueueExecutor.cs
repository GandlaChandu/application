using Com.ACSCorp.Accelerator.Core.HttpService.Abstraction;
using Com.ACSCorp.Accelerator.Core.HttpService.Abstraction.Models;
using Com.ACSCorp.Accelerator.QueueAPI.Enums;
using Com.ACSCorp.Accelerator.QueueAPI.Models;
using Com.ACSCorp.Accelerator.QueueAPI.Process.Enums;
using Com.ACSCorp.Accelerator.QueueAPI.Process.Interfaces;
using Com.ACSCorp.Accelerator.QueueAPI.Repository.Interfaces;
using Com.ACSCorp.Accelerator.QueueAPI.Repository.Models;

using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using static Com.ACSCorp.Accelerator.QueueAPI.Common.Constants;

namespace Com.ACSCorp.Accelerator.QueueAPI.Process
{
    public abstract class BaseQueueExecutor
    {
        protected IQueueAPIRepository _queueAPIRepository;
        protected IHttpService _httpService;
        protected readonly QueueConfiguration _queueConfiguration;
        protected readonly ILogger _logger;

        public BaseQueueExecutor(
            IConfiguration configuration,
            IQueueAPIRepository queueAPIRepository,
            IHttpService httpService,
            ILogger<IQueueExecutor> logger)
        {
            _queueAPIRepository = queueAPIRepository;
            _httpService = httpService;
            _logger = logger;
            _queueConfiguration = configuration
                                    .GetSection(AppSettingConstants.QueueConfiguration)
                                    .Get<QueueConfiguration>();
        }

        protected async Task ExecuteQueueRecord(QueueAPIEntity queueEntity)
        {
            try
            {
                _logger.LogInformation($"started processing Queue with id:{queueEntity.Id} and endpoint:{queueEntity.Uri}");
                queueEntity.Status = (short)QueueStatus.InProgress;
                await _queueAPIRepository.UpdateAsync(queueEntity);

                HttpRequestModel httpRequest = queueEntity.GetHttpRequestModel();
                HttpResponseModel httpResponse = await _httpService.SendAsync(httpRequest);

                if (httpResponse.IsSuccess)
                {
                    queueEntity.Status = (short)QueueStatus.Completed;
                }
                else
                {
                    queueEntity.Status = (short)QueueStatus.Failed;
                }

                queueEntity.ResponseStatusCode = (int)httpResponse.StatusCode;
                queueEntity.Message = $"{httpResponse.StatusCode}: {httpResponse.Response}";

                await _queueAPIRepository.UpdateAsync(queueEntity);
                _logger.LogInformation($"Processing done for Queue with id:{queueEntity.Id}. Result: StatusCode {queueEntity.ResponseStatusCode} and response:{queueEntity.Message}");
            }
            catch (Exception ex)
            {
                queueEntity.Status = (short)QueueStatus.Failed;
                queueEntity.Message = ex.Message;
                await _queueAPIRepository.UpdateAsync(queueEntity);

                _logger.LogError(ex, $"Failed to process queue API with Id:{queueEntity.Id}");
            }
        }

        protected List<QueueAPIEntity> GetQueuedRecords(int count)
        {
            var query = _queueAPIRepository
                .GetAll(s => s.Status == (int)QueueStatus.Queued);

            if (_queueConfiguration.Fetchtype == FetchType.LIFO)
            {
                query = query.OrderByDescending(s => s.Id);
            }
            return query.Take(count).ToList();
        }
    }
}
