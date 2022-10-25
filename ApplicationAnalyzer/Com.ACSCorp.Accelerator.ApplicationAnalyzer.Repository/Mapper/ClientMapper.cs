using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Models;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Repository.Models;
using Com.ACSCorp.Accelerator.Core.Repository.BaseRepository.Mapper;

using System.Collections.Generic;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.Repository.Mapper
{
    public static class ClientMapper
    {
        public static ClientDTO ToClientDTO(this Client client)
        {
            if (client == null)
            {
                return null;
            }

            var clientDTO = new ClientDTO
            {
                Id = client.Id,
                Name = client.Name,
                IsActive = client.IsActive,
                IsDeleted = client.IsDeleted
            };

            CommonMapper.MapBaseDTODetails(client, clientDTO);

            return clientDTO;
        }

        public static List<ClientDTO> ToClientDTOList(this List<Client> clients)
        {
            var clientDTOs = new List<ClientDTO>();

            foreach (var client in clients)
            {
                clientDTOs.Add(client.ToClientDTO());
            }

            return clientDTOs;
        }

        public static Client ToClientEntity(this ClientDTO clientDTO)
        {
            if (clientDTO == null)
            {
                return null;
            }

            var client = new Client
            {
                Id = clientDTO.Id,
                Name = clientDTO.Name,
                IsActive = clientDTO.IsActive,
                IsDeleted = clientDTO.IsDeleted
            };

            return client;
        }
    }
}
