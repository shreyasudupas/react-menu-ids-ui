import { gql, useMutation } from '@apollo/client'
import { Role } from '../../pages/RoleList/RoleType';
import { GetRolesResponse, GET_ROLES } from '../query/useGetRoles';

interface DeleteRoleByIdRepsonse{
    deleteRole:Role;
}

interface DeleteRoleByIdVariable{
    roleId:string;
}

const DELETEROLEBYID = gql`
mutation DeleteRole($roleId:String!){
    deleteRole(roleId:$roleId){
        roleId
    }
  }
`

export const useDeleteRoleById = (roleId:string) => {
  return useMutation<DeleteRoleByIdRepsonse,DeleteRoleByIdVariable>(DELETEROLEBYID,{
    variables:{
        roleId: roleId
    },
   update(cache,{ data }) {
    const { roles } = cache.readQuery<GetRolesResponse>({
        query: GET_ROLES
    })!;

    //console.log(roles.filter(role => role.roleId !== data?.deleteRole.roleId));

    cache.writeQuery({
        query: GET_ROLES,
        data: {
            roles: roles.filter(role =>
                role.roleId !== data?.deleteRole.roleId)
        }
    });
   }
  });
}