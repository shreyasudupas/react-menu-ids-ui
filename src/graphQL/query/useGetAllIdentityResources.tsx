import { gql, useQuery } from '@apollo/client'
import { IdentityResource } from '../../pages/IdenitityResourceDetail/IdentityResource';

interface GetAllIdenityResourceResponse{
    allIdentityResource:IdentityResource[];
}

const GET_ALL_IDENTITYRESOURCE = gql`
query GetAllIdentityResources{
    allIdentityResource {
      id
      enabled
      name
      description
      displayName
      empahasize
      showInDiscoveryDocument
      required
      created
      updated
      nonEditable
    }
  }
`

export const useGetAllIdentityResources = () => {
  return useQuery<GetAllIdenityResourceResponse>(GET_ALL_IDENTITYRESOURCE,{
    fetchPolicy:'network-only'
  });
}