import { gql, useMutation } from '@apollo/client'
import { Role } from '../../pages/RoleList/RoleType';
import { GetRolesResponse, GET_ROLES } from '../query/useGetRoles';

export interface SaveRoleResponse{
    saveRole:Role;
}

interface SaveRoleVariable{
    roleId:string;
    roleName:string;
}

const SAVE_ROLE = gql`
mutation SaveRole($roleId:String!,$roleName:String!){
    saveRole(roleId: $roleId,roleName: $roleName) {
      roleId    
      roleName
    }
  }
`

export type saveRoleInput = 
{ 
    roleId:string;
    roleName:string
}

export const useSaveRole = (roleInput:saveRoleInput) => {
  return useMutation<SaveRoleResponse,SaveRoleVariable>(SAVE_ROLE,{
    variables:{
        roleId: roleInput.roleId,
        roleName: roleInput.roleName
    },
    update(cache,{ data }) {
        const { roles } = cache.readQuery<GetRolesResponse>({
            query: GET_ROLES
        })!;
        let getEditedRole = data?.saveRole;

        if(getEditedRole !== null){
            cache.writeQuery({
                query: GET_ROLES,
                data: {
                    roles: roles.map(role =>
                    role.roleId == data?.saveRole.roleId ? { roleId:getEditedRole?.roleId,roleName:getEditedRole?.roleName } : {...role} )
                }
            });
        }
        console.log('editted successfully')
    
    }
  });
}