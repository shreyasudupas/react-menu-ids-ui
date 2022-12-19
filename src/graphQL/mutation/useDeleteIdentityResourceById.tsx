import { gql, useMutation } from '@apollo/client'

interface DeleteIdentityResourceByIdResponse{
    deleteIdentityResource:boolean;
}

interface DeleteIdentityResoorceByIdVariable{
     id:number;
}

const DELETE_IDENTITYRESOURCE_BY_ID = gql`
mutation DeleteIdentityResourceById($id:Int!){
    deleteIdentityResource(id: $id)
  }
`

export const useDeleteIdentityResourceById = () => {
  return useMutation<DeleteIdentityResourceByIdResponse,DeleteIdentityResoorceByIdVariable>(DELETE_IDENTITYRESOURCE_BY_ID);
}