using Com.ACSCorp.Accelerator.ApplicationAnalyzer.IRepository;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Models.DTO.CweInfo;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Repository.Context;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Repository.Mapper;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Repository.Models;
using Com.ACSCorp.Accelerator.Core.Repository.BaseRepository;

using Microsoft.EntityFrameworkCore;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.Repository
{
    public class CweInfoRepository : BaseRepository<Cweinfo>, ICweInfoRepository
    {
        public CweInfoRepository(ApplicationAnalyzerContext dbContext) : base(dbContext)
        {
        }

        public async Task<List<CweInfoDTO>> GetCweInfoByIdsAsync(List<int> cweIds)
        {
            List<Cweinfo> list = await GetAll(x => cweIds.Contains(x.Cweid)).ToListAsync();
            return list.ToCweInfoDTOList();
        }
    }
}
