using Com.ACSCorp.Accelerator.ApplicationAnalyzer.IRepository;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.IService;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Models.DTO.CweInfo;
using Com.ACSCorp.Accelerator.Core.Models;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.Service
{
    public class CweInfoService : ICweInfoService
    {
        #region Variables

        private readonly ICweInfoRepository _cweInfoRepository;

        #endregion Variables

        #region Constructors

        public CweInfoService(ICweInfoRepository cweInfoRepository)
        {
            _cweInfoRepository = cweInfoRepository;
        }

        #endregion Constructors

        #region Public Methods

        public async Task<Result<List<CweInfoDTO>>> GetCweInfoByIdsAsync(List<int> cweIds)
        {
            var cweInfo = await _cweInfoRepository.GetCweInfoByIdsAsync(cweIds);

            return Result.Ok(cweInfo);
        }

        #endregion Public Methods
    }
}
