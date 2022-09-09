import { gql, useMutation } from '@apollo/client'
import { GET_ROLES } from '../query/useGetRoles';

interface DeleteRoleByIdRepsonse{
    result:boolean;
}

interface DeleteRoleByIdVariable{
    roleId:string;
}

const DELETEROLEBYID = gql`
mutation DeleteRole($roleId:String!){
    deleteRole(roleId:$roleId)
  }
`

export const useDeleteRoleById = (roleId:string) => {
  return useMutation<DeleteRoleByIdRepsonse,DeleteRoleByIdVariable>(DELETEROLEBYID,{
    variables:{
        roleId: roleId
    },
    refetchQueries:[
        { query: GET_ROLES },
        'GetRoles'
    ]
  });
}