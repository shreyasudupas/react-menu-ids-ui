import { gql, useQuery } from '@apollo/client'
import { ApiScopeData } from '../../pages/ApiScopes/ApiScopeType';

export interface ApiScopesResponse{
    apiScopes:ApiScopeData[];
}

export const GET_ALL_APISCOPES = gql`
query GetAllApiScopes{
    apiScopes {
      id
      name
      displayName
      description
    }
  }
`


export const useGetApiScopes = () => {
  return useQuery<ApiScopesResponse>(GET_ALL_APISCOPES);
}