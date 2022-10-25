using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Common;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Common.Enum;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.IRepository;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.IService;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.IService.ApiClients;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Models;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Validators;
using Com.ACSCorp.Accelerator.Core.Authorization.Interfaces;
using Com.ACSCorp.Accelerator.Core.Models;
using Com.ACSCorp.Accelerator.Core.Utility;

using FluentValidation.Results;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.Service
{
    public class ProjectService : IProjectService
    {
        #region Variables

        private readonly IProjectRepository _projectRepository;
        private readonly IDivisionRepository _divisionRepository;
        private readonly IIdentityService _identityService;
        private readonly ICodeAnalyzerClient _codeAnalyzerClient;

        #endregion Variables

        #region Constructors

        public ProjectService(IProjectRepository projectRepository,
            IDivisionRepository divisionRepository,
            IIdentityService identityService,
            ICodeAnalyzerClient codeAnalyzerClient)
        {
            _projectRepository = projectRepository;
            _divisionRepository = divisionRepository;
            _identityService = identityService;
            _codeAnalyzerClient = codeAnalyzerClient;
        }

        #endregion Constructors

        #region Public Methods

        /// <summary>
        /// Get all projects based on pagination
        /// </summary>
        /// <param name="pagination"></param>
        /// <returns></returns>
        public async Task<Result<ListResult<ProjectDTO>>> GetAllProjectsAsync(ProjectListRequest request)
        {
            List<int> accessibleProjects = _identityService.GetAccessibleProjects();
            ListResult<ProjectDTO> results = await _projectRepository.GetAllProjectsAsync(request, accessibleProjects);

            return Result.Ok(results);
        }

        /// <summary>
        /// Get project by id
        /// </summary>
        /// <param name="projectId"></param>
        /// <returns></returns>
        public async Task<Result<ProjectDTO>> GetProjectAsync(int projectId)
        {
            ProjectDTO project = await _projectRepository.GetProjectAsync(projectId);

            if (project == null || project.IsDeleted)
            {
                return Result.Fail<ProjectDTO>(Messages.ProjectNotFound);
            }

            return Result.Ok(project);
        }

        /// <summary>
        /// Get project by key
        /// </summary>
        /// <param name="key"></param>
        /// <returns></returns>
        public async Task<Result<ProjectDTO>> GetProjectByKeyAsync(Guid key)
        {
            ProjectDTO project = await _projectRepository.GetProjectByKeyAsync(key);
            return Result.Ok(project);
        }

        /// <summary>
        /// Save Project
        /// </summary>
        /// <param name="project"></param>
        /// <returns></returns>
        public async Task<Result<int>> AddProjectAsync(ProjectDTO project)
        {
            Result result = await ValidateProjectAsync(project);

            if (!result.IsSucceeded)
            {
                return Result.Fail<int>(result.GetErrorString());
            }

            DivisionDTO divisionDTO = await _divisionRepository.GetByIdAsync(project.DivisionId);

            if (divisionDTO == null || divisionDTO.IsDeleted)
            {
                return Result.Fail<int>(Messages.DivisionNotFound);
            }

            if (!_identityService.HasClientAdminAccess(divisionDTO.ClientId))
            {
                return Result.Fail<int>(Messages.UnAuthorizedEntityAccess);
            }

            ProjectDTO existingProject = await _projectRepository.GetProjectByNameAsync(project.Name);

            if (existingProject != null)
            {
                return Result.Fail<int>(Messages.ProjectExistWithGivenName);
            }

            if (project.Key == Guid.Empty)
            {
                project.Key = Guid.NewGuid();
            }
            project.IsDeleted = false;

            int projectId = await _projectRepository.AddProjectAsync(project);

            await _codeAnalyzerClient.CreateProjectAsync(project.Key.ToString());

            return Result.Ok(projectId);
        }

        /// <summary>
        /// Update project
        /// </summary>
        /// <param name="projectDTO"></param>
        /// <returns></returns>
        public async Task<Result<int>> UpdateProjectAsync(ProjectDTO projectDTO)
        {
            Result result = await ValidateProjectAsync(projectDTO);

            if (!result.IsSucceeded)
            {
                return Result.Fail<int>(result.GetErrorString());
            }

            ProjectDTO project = await _projectRepository.GetProjectAsync(projectDTO.Id);

            if (project == null || project.IsDeleted)
            {
                return Result.Fail<int>(Messages.ProjectNotFound);
            }

            if (!_identityService.HasProjectAdminAccess(projectDTO.Id, project.ClientId.Value))
            {
                return Result.Fail<int>(Messages.UnAuthorizedEntityAccess);
            }

            ProjectDTO existingProject = await _projectRepository.GetProjectByNameAsync(projectDTO.Name);

            if (existingProject != null && existingProject.Id != projectDTO.Id)
            {
                return Result.Fail<int>(Messages.ProjectExistWithGivenName);
            }

            project.Name = projectDTO.Name;
            project.DivisionId = projectDTO.DivisionId;
            project.IsActive = projectDTO.IsActive;

            int projectId = await _projectRepository.UpdateProjectAsync(project);

            return Result.Ok(projectId);
        }

        public async Task<Result<List<IdNamePair>>> GetAllActiveProjectsByDivisionIdAsync(int divisionId, ScanType? scanType)
        {
            List<int> accessibleProjects = _identityService.GetAccessibleProjects();
            List<IdNamePair> projects = await _projectRepository.GetAllActiveProjectsByDivisionIdAsync(divisionId, scanType, accessibleProjects);

            return Result.Ok(projects);
        }

        public async Task<Result<List<IdNamePair>>> GetNamesByIdsAsync(int[] ids)
        {
            List<IdNamePair> projects = await _projectRepository.GetNamesByIds(ids);
            return Result.Ok(projects);
        }

        /// <summary>
        /// Gets Static Scan Types
        /// </summary>
        /// <returns></returns>
        public Result<List<IdNamePair>> GetStaticScanTypes()
        {
            List<IdNamePair> list = new List<IdNamePair>();
            List<StaticScanType> staticScanTypes = Enum.GetValues(typeof(StaticScanType)).Cast<StaticScanType>().ToList();

            foreach (StaticScanType staticScanType in staticScanTypes)
            {
                list.Add(new IdNamePair
                {
                    Id = (int)staticScanType,
                    Name = staticScanType.GetEnumDescription()
                });
            }
            return Result.Ok(list);
        }

        /// <summary>
        /// Gets Scan Types
        /// </summary>
        /// <returns></returns>
        public Result<List<IdNamePair>> GetScanTypes()
        {
            List<IdNamePair> list = new List<IdNamePair>();
            List<ScanType> scanTypes = Enum.GetValues(typeof(ScanType)).Cast<ScanType>().ToList();

            foreach (ScanType scanType in scanTypes)
            {
                list.Add(new IdNamePair
                {
                    Id = (int)scanType,
                    Name = scanType.GetEnumDescription()
                });
            }
            return Result.Ok(list);
        }

        /// <summary>
        /// Gets Scan Types
        /// </summary>
        /// <returns></returns>
        public Result<List<IdNamePair>> GetSourceCodeTypes()
        {
            var list = new List<IdNamePair>();
            List<SourceCodeType> sourceCodeTypes = Enum.GetValues(typeof(SourceCodeType)).Cast<SourceCodeType>().ToList();

            foreach (SourceCodeType sourceCodeType in sourceCodeTypes)
            {
                list.Add(new IdNamePair
                {
                    Id = (int)sourceCodeType,
                    Name = sourceCodeType.GetEnumDescription()
                });
            }
            return Result.Ok(list);
        }

        /// <summary>
        /// Gets Scan Types
        /// </summary>
        /// <returns></returns>
        public Result<List<IdNamePair>> GetSourceControlTypes()
        {
            var list = new List<IdNamePair>();
            List<SourceControlType> sourceControlTypes = Enum.GetValues(typeof(SourceControlType)).Cast<SourceControlType>().ToList();

            foreach (SourceControlType sourceControlType in sourceControlTypes)
            {
                list.Add(new IdNamePair
                {
                    Id = (int)sourceControlType,
                    Name = sourceControlType.GetEnumDescription()
                });
            }
            return Result.Ok(list);
        }

        /// <summary>
        /// Gets Ticket system types
        /// </summary>
        /// <returns></returns>
        public Result<List<IdNamePair>> GetTicketSystemTypes()
        {
            var ticketSystemTypeResult = new List<IdNamePair>();
            List<TicketSystemType> ticketSystemTypes = Enum.GetValues(typeof(TicketSystemType)).Cast<TicketSystemType>().ToList();

            foreach (TicketSystemType ticketSystemType in ticketSystemTypes)
            {
                ticketSystemTypeResult.Add(new IdNamePair
                {
                    Id = (int)ticketSystemType,
                    Name = ticketSystemType.GetEnumDescription()
                });
            }
            return Result.Ok(ticketSystemTypeResult);
        }

        public async Task<Result<List<int>>> GetClientIdsByProjectIdsAsync(List<int> accessibleProjectIds)
        {
            List<int> clientIds = await _projectRepository.GetClientIdsByProjectIdsAsync(accessibleProjectIds);
            return Result.Ok(clientIds);
        }

        #endregion Public Methods

        #region Private Methods

        private async Task<Result> ValidateProjectAsync(ProjectDTO project)
        {
            var projectValidator = new ProjectValidator();
            ValidationResult validationResult = await projectValidator.ValidateAsync(project);

            if (!validationResult.IsValid)
            {
                return Result.Fail(validationResult.ToString());
            }

            return Result.Ok();
        }

        #endregion Private Methods
    }
}
