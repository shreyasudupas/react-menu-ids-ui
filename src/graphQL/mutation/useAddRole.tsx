import { gql, useMutation } from '@apollo/client'
import { Role } from '../../pages/RoleList/RoleType';
import { GetRolesResponse, GET_ROLES } from '../query/useGetRoles';

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
      roleName
    }
  }
`

export const useAddRole = () => {
  return useMutation<AddRoleResponse,AddRoleVariable>(ADD_ROLE,{
    update(cache,{ data }) {
        const { roles } = cache.readQuery<GetRolesResponse>({
            query: GET_ROLES
        })!;
    
        cache.writeQuery({
            query: GET_ROLES,
            data: {
                roles: [
                    ...roles,
                    data?.addRole
                ]
            }
        });
        //console.log(cache.readQuery<GetRolesResponse>({query: GET_ROLES})!);
       }
  });
}