using Com.ACSCorp.Accelerator.CodeAnalyzer.Common;
using Com.ACSCorp.Accelerator.CodeAnalyzer.IRepository;
using Com.ACSCorp.Accelerator.CodeAnalyzer.IService;
using Com.ACSCorp.Accelerator.CodeAnalyzer.Models;
using Com.ACSCorp.Accelerator.CodeAnalyzer.Service.Mapper;
using Com.ACSCorp.Accelerator.CodeAnalyzer.SonarAdapter.DTO;
using Com.ACSCorp.Accelerator.CodeAnalyzer.SonarAdapter.DTO.QualityProfile;
using Com.ACSCorp.Accelerator.CodeAnalyzer.SonarAdapter.Interfaces;
using Com.ACSCorp.Accelerator.Core.Models;

using Microsoft.Extensions.Logging;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.Service
{
    public class QualityProfileService : IQualityProfileService
    {
        #region Properties

        private readonly ILogger _logger;
        private readonly IQualityProfileRepository _qualityProfileRepository;
        private readonly ISonarQubeClient _sonarQubeClient;
        private readonly ILanguageService _languageService;

        #endregion Properties

        #region Constructors

        public QualityProfileService(
            ILogger<QualityProfilePreferencesService> logger,
            IQualityProfileRepository qualityProfileRepository,
            ISonarQubeClient sonarQubeClient,
            ILanguageService languageService)
        {
            _logger = logger;
            _qualityProfileRepository = qualityProfileRepository;
            _sonarQubeClient = sonarQubeClient;
            _languageService = languageService;
        }

        #endregion Constructor

        #region Public methods

        public async Task<Result<int>> AddQualityProfileAsync(QualityProfileRequestModel qualityProfileModel)
        {
            QualityProfileDTO existingQualityProfile = await _qualityProfileRepository.GetQualityProfileByNameAsync(qualityProfileModel.LanguageId, qualityProfileModel.Name);

            if (existingQualityProfile != null)
            {
                return Result.Fail<int>(Messages.QualityProfileExistWithGivenName);
            }

            QualityProfileDTO qualityProfileDTO = qualityProfileModel.ToQualityProfileDTO();

            Result<CreateQualityProfileResponseDTO> result = await CreateQualityProfile(qualityProfileDTO);
            if (!result.IsSucceeded)
            {
                return Result.Fail<int>(result.GetErrorString());
            }
            else if (result.Value == null
                || result.Value.Profile == null
                || string.IsNullOrWhiteSpace(result.Value.Profile.Key))
            {
                return Result.Fail<int>(Messages.FailedToCreateQualityProfile);
            }

            using (var transaction = _qualityProfileRepository.BeginTransaction())
            {
                try
                {
                    qualityProfileDTO.Key = result.Value.Profile.Key;

                    int qualityProfileId = await _qualityProfileRepository.AddQualityProfileAsync(qualityProfileDTO);

                    if (qualityProfileId <= 0)
                    {
                        return Result.Fail<int>(Messages.FailedToSaveQualityProfile);
                    }

                    //if (qualityProfileDTO.ClientId.HasValue)
                    //{
                    //    int qualityProfilePreferenceId = await AddQualityProfilePreference(qualityProfileDTO, qualityProfileId);
                    //    if (qualityProfilePreferenceId <= 0)
                    //    {
                    //        return Result.Fail<int>(Messages.FailedToSaveQualityProfilePreferences);
                    //    }
                    //}

                    await transaction.CommitAsync();

                    return Result.Ok(qualityProfileId);
                }
                catch (Exception ex)
                {
                    await transaction.RollbackAsync();
                    _logger.LogError(ex, Messages.FailedToSaveQualityProfile);

                    return Result.Fail<int>(Messages.FailedToSaveQualityProfile);
                }
            }
        }

        public async Task<Result<bool>> UpdateQualityProfileAsync(QualityProfileRequestModel request)
        {
            QualityProfileDTO qualityProfileDTO = await _qualityProfileRepository.GetQualityProfileByIdAsync(request.Id);

            if (qualityProfileDTO == null)
            {
                return Result.Fail<bool>(Messages.QualityProfileNotFound);
            }

            QualityProfileDTO qualityProfileWithSameName = await _qualityProfileRepository.GetQualityProfileByNameAsync(request.LanguageId, request.Name);
            if (qualityProfileWithSameName != null && qualityProfileWithSameName.Id != qualityProfileDTO.Id)
            {
                return Result.Fail<bool>(Messages.QualityProfileExistWithGivenName);
            }

            qualityProfileDTO.Name = request.Name;

            bool recordUpdated = await _qualityProfileRepository.UpdateQualityProfileAsync(qualityProfileDTO);
            return Result.Ok(recordUpdated);
        }

        public async Task<Result<bool>> ChangeRuleActivationAsync(RuleActivationRequestModel ruleActivationModel)
        {
            QualityProfileDTO qualityPofile = await _qualityProfileRepository.GetQualityProfileByIdAsync(ruleActivationModel.QualityProfileId);

            if (qualityPofile == null)
            {
                return Result.Fail<bool>(Messages.QualityProfileNotFound);
            }
            else if (string.IsNullOrWhiteSpace(qualityPofile.Key))
            {
                return Result.Fail<bool>(Messages.InvalidQualityProfile);
            }

            RuleActivationDTO ruleActivationDTO = ruleActivationModel.ToRuleActivationDTO();
            ruleActivationDTO.QualityProfileKey = qualityPofile.Key;

            Result<bool> result = await _sonarQubeClient.ChangeRuleActivationAsync(ruleActivationDTO);
            if (!result.IsSucceeded)
            {
                return Result.Fail<bool>(result.GetErrorString());
            }

            return Result.Ok(true);
        }

        public async Task<Result<ListResult<QualityProfileResponseModel>>> GetAllQualityProfilesAsync(QualityProfileListRequest request)
        {
            ListResult<QualityProfileDTO> qualityProfilesResult = await _qualityProfileRepository.GetAllQualityProfilesAsync(request);
            ListResult<QualityProfileResponseModel> qualityProfileResponse = qualityProfilesResult.ToQualityProfileResponseListResult();
            return Result.Ok(qualityProfileResponse);
        }

        public async Task<Result<List<IdNamePair>>> GetQualityProfilesByLanguageIdAsync(int languageId)
        {
            if (languageId <= 0)
            {
                return Result.Fail<List<IdNamePair>>(Messages.InvalidLanguageId);
            }

            List<QualityProfileDTO> qualityProfiles = await _qualityProfileRepository.GetQualityProfilesByLanguageIdAsync(languageId);
            List<IdNamePair> idNamePairs = qualityProfiles.Select(s => new IdNamePair { Id = s.Id, Name = s.Name }).ToList();
            return Result.Ok(idNamePairs);
        }

        public async Task<Result<QualityProfileResponseModel>> GetQualityProfileByIdAsync(int qualityProfileId)
        {
            QualityProfileDTO qualityProfileDTO = await _qualityProfileRepository.GetQualityProfileByIdAsync(qualityProfileId);

            if (qualityProfileDTO == null)
            {
                return Result.Fail<QualityProfileResponseModel>(Messages.QualityProfileNotFound);
            }

            return Result.Ok(qualityProfileDTO.ToQualityProfileResponse());
        }

        public async Task<Result<ListResult<SonarRuleDTO>>> GetQualityProfileRulesAsync(QualityProfileRuleListRequest request)
        {
            if (request.Pagination == null)
            {
                request.Pagination = new Pagination { PageNumber = 1, PageSize = 499 };
            }

            QualityProfileDTO qualityProfile = await _qualityProfileRepository.GetQualityProfileByIdAsync(request.QualityProfileId);

            if (qualityProfile == null || string.IsNullOrWhiteSpace(qualityProfile.Key))
            {
                return Result.Fail<ListResult<SonarRuleDTO>>(Messages.InvalidQualityProfile);
            }

            Result<ListResult<SonarRuleDTO>> result = await _sonarQubeClient.GetQualityProfileRulesAsync(qualityProfile.Key, request.Pagination);
            return result;
        }

        #endregion Public methods

        #region Private Methods        

        private async Task<Result<CreateQualityProfileResponseDTO>> CreateQualityProfile(QualityProfileDTO qualityProfileDTO)
        {
            Result<LanguageDTO> languageResult = await _languageService.GetLanguageByIdAsync(qualityProfileDTO.LanguageId);

            if (!languageResult.IsSucceeded || string.IsNullOrWhiteSpace(languageResult.Value?.Code))
            {
                return Result.Fail<CreateQualityProfileResponseDTO>(languageResult.GetErrorString());
            }

            CreateQualityProfile createQualityProfile = new CreateQualityProfile
            {
                Language = languageResult.Value.Code,
                Name = qualityProfileDTO.Name
            };

            return await _sonarQubeClient.AddQualityProfileAsync(createQualityProfile);
        }

        //private async Task<int> AddQualityProfilePreference(QualityProfileDTO qualityProfileDTO, int qualityProfileId)
        //{
        //    var qualityProfilePreferencesRequest = new QualityProfilePreferencesRequestDTO
        //    {
        //        EntityId = qualityProfileDTO.ClientId.Value,
        //        EntityType = EntityType.Client,
        //        QualityProfileId = qualityProfileId,
        //        LanguageId = qualityProfileDTO.LanguageId
        //    };

        //    int qualityProfilePreferenceId = await _qualityProfilePreferencesRepository.AddQualityProfilePreferenceAsync(qualityProfilePreferencesRequest);
        //    return qualityProfilePreferenceId;
        //}

        #endregion Private Methods
    }
}
