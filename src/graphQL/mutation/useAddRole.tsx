import { gql, useMutation } from '@apollo/client'
import { Role } from '../../pages/RoleList/RoleType';
import { GET_ROLES } from '../query/useGetRoles';

interface AddRoleResponse{
    addRole:Role;
}

interface AddRoleVariable{
    newRole:{
        roleId:string;
        roleName:string;
    }
}

const ADD_ROLE = gql`
mutation AddRole($newRole:RoleListResponseInput){
    addRole(newRole:$newRole) {
      roleId
    }
  }
`

export const useAddRole = () => {
  return useMutation<AddRoleResponse,AddRoleVariable>(ADD_ROLE,{
    refetchQueries:[
        {query: GET_ROLES}
    ]
  });
}