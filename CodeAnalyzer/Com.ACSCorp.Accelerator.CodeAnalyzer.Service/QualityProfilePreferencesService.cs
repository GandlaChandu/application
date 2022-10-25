using Com.ACSCorp.Accelerator.CodeAnalyzer.Common;
using Com.ACSCorp.Accelerator.CodeAnalyzer.IRepository;
using Com.ACSCorp.Accelerator.CodeAnalyzer.IService;
using Com.ACSCorp.Accelerator.CodeAnalyzer.IService.ApiClients;
using Com.ACSCorp.Accelerator.CodeAnalyzer.Models;
using Com.ACSCorp.Accelerator.CodeAnalyzer.Service.Mapper;
using Com.ACSCorp.Accelerator.CodeAnalyzer.SonarAdapter.DTO.QualityProfile;
using Com.ACSCorp.Accelerator.CodeAnalyzer.SonarAdapter.Interfaces;
using Com.ACSCorp.Accelerator.Core.Authorization.Interfaces;
using Com.ACSCorp.Accelerator.Core.Models;
using Com.ACSCorp.Accelerator.Core.Models.Enums;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.Service
{
    public class QualityProfilePreferencesService : IQualityProfilePreferencesService
    {
        private readonly IQualityProfilePreferencesRepository _qualityProfilePreferencesRepository;
        private readonly IQualityProfileRepository _qualityProfileRepository;
        private readonly IApplicationAnalyzerClient _applicationAnalyzerClient;
        private readonly ISonarQubeClient _sonarQubeClient;
        private readonly ILanguageService _languageService;
        private readonly IIdentityService _identityService;

        public QualityProfilePreferencesService(
            IQualityProfilePreferencesRepository qualityProfilePreferencesRepository,
            IQualityProfileRepository qualityProfileRepository,
            IApplicationAnalyzerClient applicationAnalyzerClient,
            ISonarQubeClient sonarQubeClient,
            ILanguageService languageService,
            IIdentityService identityService)
        {
            _qualityProfilePreferencesRepository = qualityProfilePreferencesRepository;
            _qualityProfileRepository = qualityProfileRepository;
            _applicationAnalyzerClient = applicationAnalyzerClient;
            _sonarQubeClient = sonarQubeClient;
            _languageService = languageService;
            _identityService = identityService;
        }

        public async Task<Result<QualityProfilePreferencesResponseModel>> GetQualityProfilePreferenceByEntityAsync(EntityType entityType, int entityId)
        {
            Result validationResult = await ValidateEntity(entityType, entityId);

            if (!validationResult.IsSucceeded)
            {
                return Result.Fail<QualityProfilePreferencesResponseModel>(validationResult.GetErrorString());
            }

            Result accessibilityResult = await ValidateAccessibility(entityType, entityId);

            if (!accessibilityResult.IsSucceeded)
            {
                return Result.Fail<QualityProfilePreferencesResponseModel>(accessibilityResult.GetErrorString());
            }

            List<QualityProfilePreferenceDTO> qualityProfilePreferences = await _qualityProfilePreferencesRepository.GetQualityProfilePreferenceByEntityAsync(entityType, entityId);
            QualityProfilePreferencesResponseModel qualityProfilePreferencesResponse = new QualityProfilePreferencesResponseModel
            {
                EntityId = entityId,
                EntityType = entityType,
                QualityProfilePreferences = qualityProfilePreferences.ToQualityProfilePreferenceModelList()
            };

            return Result.Ok(qualityProfilePreferencesResponse);
        }

        public async Task<Result<int>> AddQualityProfilePreferenceAsync(QualityProfilePreferencesRequestDTO qualityProfilePreferencesRequest)
        {
            QualityProfilePreferenceDTO qualityProfilePreference = await _qualityProfilePreferencesRepository.GetQualityProfilePreferenceAsync(qualityProfilePreferencesRequest.EntityType, qualityProfilePreferencesRequest.EntityId, qualityProfilePreferencesRequest.LanguageId);
            if (qualityProfilePreference != null)
            {
                return Result.Fail<int>(Messages.QualityProfilePrefernceAlreadyExistForGivenLanguage);
            }

            QualityProfileDTO qualityProfile = await _qualityProfileRepository.GetQualityProfileByIdAsync(qualityProfilePreferencesRequest.QualityProfileId);
            if (qualityProfilePreferencesRequest.LanguageId != qualityProfile.LanguageId)
            {
                return Result.Fail<int>(string.Format(Messages.QualityProfilePrefernceCanNotBeAssociated, qualityProfile.Id, qualityProfile.LanguageId, qualityProfilePreference.LanguageId));
            }
            Result entityValidation = await ValidateEntity(qualityProfilePreferencesRequest.EntityType, qualityProfilePreferencesRequest.EntityId);
            if (!entityValidation.IsSucceeded)
            {
                return Result.Fail<int>(entityValidation.GetErrorString());
            }

            Result accessibilityResult = await ValidateAccessibility(qualityProfilePreferencesRequest.EntityType, qualityProfilePreferencesRequest.EntityId);

            if (!accessibilityResult.IsSucceeded)
            {
                return Result.Fail<int>(accessibilityResult.GetErrorString());
            }

            if (qualityProfilePreferencesRequest.EntityType == EntityType.Project)
            {
                ProjectQualityProfileMapDTO projectQualityProfileMap = new ProjectQualityProfileMapDTO
                {
                    EntityId = qualityProfilePreferencesRequest.EntityId,
                    LanguageId = qualityProfilePreferencesRequest.LanguageId,
                    QualityProfileName = qualityProfile.Name,
                    IsActive = true
                };
                Result mapResult = await UpdateSonarQubeQualityProfileToProjectMap(projectQualityProfileMap);
                if (!mapResult.IsSucceeded)
                {
                    return Result.Fail<int>(mapResult.GetErrorString());
                }
            }

            int result = await _qualityProfilePreferencesRepository.AddQualityProfilePreferenceAsync(qualityProfilePreferencesRequest);
            if (result <= 0)
            {
                return Result.Fail<int>(Messages.FailedToSaveQualityProfilePreferences);
            }
            return Result.Ok(result);
        }

        public async Task<Result<int>> UpdateQualityProfilePrefereceAsync(UpdateQualityProfilePreferenceModel updateQualityProfilePreferenceRequest)
        {
            QualityProfilePreferenceDTO qualityProfilePreference = await _qualityProfilePreferencesRepository.GetQualityProfilePreferencByIdAsync(updateQualityProfilePreferenceRequest.Id);
            if (qualityProfilePreference == null)
            {
                return Result.Fail<int>(string.Format(Messages.QualityProfilePrefernceNotFound, updateQualityProfilePreferenceRequest.Id));
            }
            else if (qualityProfilePreference.QualityProfileId == updateQualityProfilePreferenceRequest.QualityProfileId)
            {
                return Result.Ok(updateQualityProfilePreferenceRequest.Id);
            }

            Result accessibilityResult = await ValidateAccessibility(qualityProfilePreference.EntityType, qualityProfilePreference.EntityId);

            if (!accessibilityResult.IsSucceeded)
            {
                return Result.Fail<int>(accessibilityResult.GetErrorString());
            }

            QualityProfileDTO qualityProfile = await _qualityProfileRepository.GetQualityProfileByIdAsync(updateQualityProfilePreferenceRequest.QualityProfileId);
            if (qualityProfilePreference.LanguageId != qualityProfile.LanguageId)
            {
                return Result.Fail<int>(string.Format(Messages.QualityProfilePrefernceCanNotBeAssociated, qualityProfile.Id, qualityProfile.LanguageId, qualityProfilePreference.LanguageId));
            }

            if (qualityProfilePreference.EntityType == EntityType.Project)
            {
                ProjectQualityProfileMapDTO projectQualityProfileMap = new ProjectQualityProfileMapDTO
                {
                    EntityId = qualityProfilePreference.EntityId,
                    LanguageId = qualityProfilePreference.LanguageId,
                    QualityProfileName = qualityProfilePreference.QualityProfileName,
                    IsActive = false
                };
                Result mapResult = await UpdateSonarQubeQualityProfileToProjectMap(projectQualityProfileMap);
                if (!mapResult.IsSucceeded)
                {
                    return Result.Fail<int>(mapResult.GetErrorString());
                }
                projectQualityProfileMap.QualityProfileName = qualityProfile.Name;
                projectQualityProfileMap.IsActive = true;

                mapResult = await UpdateSonarQubeQualityProfileToProjectMap(projectQualityProfileMap);
                if (!mapResult.IsSucceeded)
                {
                    return Result.Fail<int>(mapResult.GetErrorString());
                }
            }
            QualityProfilePreferencesRequestDTO qualityProfilePreferencesRequest = GetQualityProfilePreferenceRequestDTO(qualityProfilePreference, updateQualityProfilePreferenceRequest.QualityProfileId);
            int result = await _qualityProfilePreferencesRepository.UpdateQualityProfilePreferenceAsync(qualityProfilePreferencesRequest);
            if (result <= 0)
            {
                return Result.Fail<int>(Messages.FailedToSaveQualityProfilePreferences);
            }
            return Result.Ok(result);
        }

        public async Task<Result<bool>> DeleteAsync(int id)
        {
            QualityProfilePreferenceDTO qualityProfileToDelete = await _qualityProfilePreferencesRepository.GetQualityProfilePreferencByIdAsync(id);
            if (qualityProfileToDelete == null)
            {
                return Result.Fail<bool>(string.Format(Messages.QualityProfilePrefernceNotFound, id));
            }

            Result accessibilityResult = await ValidateAccessibility(qualityProfileToDelete.EntityType, qualityProfileToDelete.EntityId);

            if (!accessibilityResult.IsSucceeded)
            {
                return Result.Fail<bool>(accessibilityResult.GetErrorString());
            }

            if (qualityProfileToDelete.EntityType == EntityType.Project)
            {
                ProjectQualityProfileMapDTO projectQualityProfileMap = new ProjectQualityProfileMapDTO
                {
                    EntityId = qualityProfileToDelete.EntityId,
                    LanguageId = qualityProfileToDelete.LanguageId,
                    QualityProfileName = qualityProfileToDelete.QualityProfileName,
                    IsActive = false
                };
                Result mapResult = await UpdateSonarQubeQualityProfileToProjectMap(projectQualityProfileMap);

                if (!mapResult.IsSucceeded)
                {
                    return Result.Fail<bool>(mapResult.GetErrorString());
                }
            }

            return Result.Ok(await _qualityProfilePreferencesRepository.DeleteByIdAsync(id));
        }

        public async Task<Result<bool>> DeleteQualityProfilePreferencesAsync(EntityType entityType, int entityId)
        {
            Result validationResult = await ValidateEntity(entityType, entityId);

            if (!validationResult.IsSucceeded)
            {
                return Result.Fail<bool>(validationResult.GetErrorString());
            }

            Result accessibilityResult = await ValidateAccessibility(entityType, entityId);

            if (!accessibilityResult.IsSucceeded)
            {
                return Result.Fail<bool>(accessibilityResult.GetErrorString());
            }

            List<QualityProfilePreferenceDTO> qualityProfilePreferences = await _qualityProfilePreferencesRepository.GetQualityProfilePreferenceByEntityAsync(entityType, entityId);

            if (qualityProfilePreferences == null || qualityProfilePreferences.Count == 0)
            {
                return Result.Fail<bool>(string.Format(Messages.QualityProfilePreferncesNotFound, entityType, entityId));
            }

            if (entityType == EntityType.Project)
            {
                foreach (var qualityProfilePreference in qualityProfilePreferences)
                {
                    ProjectQualityProfileMapDTO projectQualityProfileMap = new ProjectQualityProfileMapDTO
                    {
                        EntityId = qualityProfilePreference.EntityId,
                        LanguageId = qualityProfilePreference.LanguageId,
                        QualityProfileName = qualityProfilePreference.QualityProfileName,
                        IsActive = false
                    };
                    Result mapResult = await UpdateSonarQubeQualityProfileToProjectMap(projectQualityProfileMap);

                    if (!mapResult.IsSucceeded)
                    {
                        return Result.Fail<bool>(mapResult.GetErrorString());
                    }
                }
            }
            bool isDeleted = await _qualityProfilePreferencesRepository.DeleteQualityProfilePreferencesAsync(entityType, entityId);

            if (isDeleted)
            {
                return Result.Ok(true);
            }
            else
            {
                return Result.Fail<bool>(string.Format(Messages.FailedToRemoveQualityProfilePrefernces, entityType, entityId));
            }
        }

        private static QualityProfilePreferencesRequestDTO GetQualityProfilePreferenceRequestDTO(QualityProfilePreferenceDTO qualityProfilePreference, int qualityProfileId)
        {
            return new QualityProfilePreferencesRequestDTO
            {
                Id = qualityProfilePreference.Id,
                EntityId = qualityProfilePreference.EntityId,
                EntityType = qualityProfilePreference.EntityType,
                LanguageId = qualityProfilePreference.LanguageId,
                QualityProfileId = qualityProfileId
            };
        }

        private async Task<Result> ValidateEntity(EntityType entityType, int entityId)
        {
            if (entityType == EntityType.Client)
            {
                ClientDTO client = await _applicationAnalyzerClient.GetClientByIdAsync(entityId);
                if (client == null)
                {
                    return Result.Fail(string.Format(Messages.EntityIdNotFound, entityId));
                }
            }
            else
            {
                ProjectDTO project = await _applicationAnalyzerClient.GetProjectByIdAsync(entityId);
                if (project == null)
                {
                    return Result.Fail(string.Format(Messages.EntityIdNotFound, entityId));
                }
            }

            return Result.Ok();
        }

        private async Task<Result> ValidateAccessibility(EntityType entityType, int entityId)
        {
            if (entityType == EntityType.Client)
            {
                if (!_identityService.HasClientAdminAccess(entityId))
                {
                    return Result.Fail(Messages.UnAuthorizedEntityAccess);
                }
            }

            else if (entityType == EntityType.Project)
            {
                ProjectDTO project = await _applicationAnalyzerClient.GetProjectByIdAsync(entityId);

                if (!_identityService.HasProjectAdminAccess(entityId, project.ClientId.Value))
                {
                    return Result.Fail(Messages.UnAuthorizedEntityAccess);
                }
            }

            return Result.Ok();
        }

        private async Task<Result> UpdateSonarQubeQualityProfileToProjectMap(ProjectQualityProfileMapDTO projectQualityProfileMapDTO)
        {
            Result<LanguageDTO> languageResult = await _languageService.GetLanguageByIdAsync(projectQualityProfileMapDTO.LanguageId);

            if (!languageResult.IsSucceeded || string.IsNullOrWhiteSpace(languageResult.Value?.Code))
            {
                return Result.Fail(languageResult.GetErrorString());
            }

            ProjectDTO project = await _applicationAnalyzerClient.GetProjectByIdAsync(projectQualityProfileMapDTO.EntityId);

            if (project == null)
            {
                return Result.Fail(Messages.ProjectDetailNotFound);
            }

            ProjectQualityProfileDTO projectQualityProfile = new ProjectQualityProfileDTO
            {
                Language = languageResult.Value.Code,
                ProjectKey = project.Key,
                QualityProfileName = projectQualityProfileMapDTO.QualityProfileName
            };

            Result result;
            if (projectQualityProfileMapDTO.IsActive)
            {
                result = await _sonarQubeClient.AddProjectQualityProfileAsync(projectQualityProfile);
            }
            else
            {
                result = await _sonarQubeClient.RemoveProjectQualityProfileAsync(projectQualityProfile);
            }

            if (!result.IsSucceeded)
            {
                return Result.Fail(result.GetErrorString());
            }

            return Result.Ok();
        }

    }
}
