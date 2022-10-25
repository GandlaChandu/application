using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Models;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Repository.Models;
using Com.ACSCorp.Accelerator.Core.Repository.BaseRepository.Mapper;

using System.Collections.Generic;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.Repository
{
    public static class ProjectMapper
    {
        public static ProjectDTO ToProjectDTO(this Project project)
        {
            if (project == null)
            {
                return null;
            }

            ProjectDTO projectDTO = new ProjectDTO
            {
                ClientId = project.Division?.ClientId,
                ClientName = project.Division?.Client?.Name,
                DivisionId = project.DivisionId,
                DivisionName = project.Division?.Name,
                Id = project.Id,
                Name = project.Name,
                Key = project.Key,
                IsActive = project.IsActive,
                IsDeleted = project.IsDeleted
            };

            CommonMapper.MapBaseDTODetails(project, projectDTO);
            return projectDTO;
        }

        public static List<ProjectDTO> ToProjectDTOList(this List<Project> projects)
        {
            List<ProjectDTO> projectDTOs = new List<ProjectDTO>();

            foreach (var project in projects)
            {
                projectDTOs.Add(project.ToProjectDTO());
            }

            return projectDTOs;
        }

        public static Project ToProjectEntity(this ProjectDTO projectDTO)
        {
            if (projectDTO == null)
            {
                return null;
            }

            var project = new Project
            {
                Id = projectDTO.Id,
                DivisionId = projectDTO.DivisionId,
                Name = projectDTO.Name,
                Key = projectDTO.Key,
                IsActive = projectDTO.IsActive,
                IsDeleted = projectDTO.IsDeleted
            };

            return project;
        }
    }
}
