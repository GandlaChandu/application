using Com.ACSCorp.Accelerator.Core.Repository.BaseRepository.Mapper;
using Com.ACSCorp.Accelerator.Core.Utility;
using Com.ACSCorp.Accelerator.TicketManagementSystem.Common.Enum;
using Com.ACSCorp.Accelerator.TicketManagementSystem.Models;
using Com.ACSCorp.Accelerator.TicketManagementSystem.Models.DTO;
using Com.ACSCorp.Accelerator.TicketManagementSystem.Repository.Models;

using System;

namespace Com.ACSCorp.Accelerator.TicketManagementSystem.Repository.Mapper
{
    public static class TicketSystemConfigurationMapper
    {
        public static TicketSystemConfigurationDTO ToDTO(this TicketSystemConfiguration ticketSystemConfiguration)
        {
            TicketSystemConfigurationDTO ticketSystemConfigurationDTO = null;
            
            if (ticketSystemConfiguration != null)
            {
                ticketSystemConfigurationDTO = new TicketSystemConfigurationDTO
                {
                    Id = ticketSystemConfiguration.Id,
                    ProjectId = ticketSystemConfiguration.ProjectId,
                    Type = (TicketSystemType)ticketSystemConfiguration.Type,
                    Configuration = DeserializeConfiguration((TicketSystemType)ticketSystemConfiguration.Type, ticketSystemConfiguration.Configuration)
                };
                CommonMapper.MapBaseDTODetails(ticketSystemConfiguration, ticketSystemConfigurationDTO);
            }
           
            return ticketSystemConfigurationDTO;
        }

        public static TicketSystemConfiguration ToEntity(this TicketSystemConfigurationDTO ticketSystemConfigurationDTO)
        {
            TicketSystemConfiguration ticketSystemConfiguration = null;
            
            if (ticketSystemConfigurationDTO != null)
            {
                ticketSystemConfiguration = new TicketSystemConfiguration
                {
                    Id = ticketSystemConfigurationDTO.Id,
                    ProjectId = ticketSystemConfigurationDTO.ProjectId,
                    Type = (short)ticketSystemConfigurationDTO.Type,
                    Configuration = JsonUtility.SerializeObject(ticketSystemConfigurationDTO.Configuration)
                };
            }
            
            return ticketSystemConfiguration;
        }

        private static BaseTicketSystemModel DeserializeConfiguration(TicketSystemType ticketSystemType, string obj)
        {
            switch (ticketSystemType)
            {
                case TicketSystemType.GitHub:
                    return JsonUtility.DeserializeObject<GitHubTicketSystemConfigurationDTO>(obj);
                default:
                    throw new NotImplementedException($"{ticketSystemType} not implemented");
            }
        }
    }
}
