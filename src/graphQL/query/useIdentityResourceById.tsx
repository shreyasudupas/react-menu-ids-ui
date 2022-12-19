import { gql, useQuery } from '@apollo/client';
import { IdentityResource } from '../../pages/IdenitityResourceDetail/IdentityResource';

interface GetIdenityResourceResponseById{
  identityResourceById:IdentityResource;
}

const GET_IDENTITYRESOURCE_BYID = gql`
query GetIdentityResourceById($id:Int!){
    identityResourceById (id:$id){
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

export const useIdentityResourceById = (id:number) => {
  return useQuery<GetIdenityResourceResponseById>(GET_IDENTITYRESOURCE_BYID,
    {
        variables:{
            id: id
        },
        fetchPolicy:'network-only'
    });
}