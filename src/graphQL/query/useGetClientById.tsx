import { gql, useQuery } from '@apollo/client'
import { Client } from '../../pages/ClientDisplayList/ClientDisplayTypes';

interface GetClientByIdResponse{
    clientById:Client;
}

interface GetClientByIdVariables{
    clientId:number;
}

export const GET_CLIENTS_BY_ID = gql`
query GetClientInfoById($clientId:Int!){
    clientById(clientId: $clientId) {
      id
      clientId
      clientName
      description
      createdDate
      accessTokenLifetime
      requireConsent
      requirePkce
      allowedScopes {
        id
        scope
      }
      allowedGrantType
      clientSecrets {
        id
        secretValue
      }
      allowedCorsOrigins {
        id
        url
      }
      enabled
      redirectUris {
        id
        redirectUri
      }
      postLogoutRedirectUris {
        id
        postLogoutRedirectUri
      }
    }
  }
`

export const useGetClientById = (clientId:number) => {
  return useQuery<GetClientByIdResponse,GetClientByIdVariables>(GET_CLIENTS_BY_ID,{
    variables:{
        clientId: clientId
    }
  });
}