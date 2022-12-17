import { gql, useMutation } from '@apollo/client'
import { ApiResource } from '../../pages/ManageApiResource/ApiResource';

interface DeleteApiResourceByIdResponse{
    deleteApiResourcesById:ApiResource;
}

interface DeleteApiResourceByIdVariable{
    id:number;
}

const DELETE_APIRESOURCE = gql`
mutation DeleteApiResourceById($id:Int!){
    deleteApiResourcesById(id:$id) {
      id
      name
      description
      displayName
      showInDiscoveryDocument
      enabled
      nonEditable
      allowedAccessTokenSigningAlgorithms
      created
      lastAccessed
    }
  }
`

export const useDeleteApiResourceById = () => {
  return useMutation<DeleteApiResourceByIdResponse,DeleteApiResourceByIdVariable>(DELETE_APIRESOURCE,{
    fetchPolicy: 'network-only'
  });
}