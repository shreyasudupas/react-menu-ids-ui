import { gql, useQuery } from '@apollo/client'
import { Client } from '../../pages/ClientDisplayList/ClientDisplayTypes';

interface ClientsResponse{
    clientsInformation:Client[];
}

export const GET_CLIENTS = gql`
query GetClientsInformation{
    clientsInformation {
      id
      clientId
      clientName
       description
       enabled
       allowedGrantType
    }
  }
`

export const useGetClients = () => {
  return useQuery<ClientsResponse>(GET_CLIENTS);
}