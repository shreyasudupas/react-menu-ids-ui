import { gql, useQuery } from '@apollo/client'
import { Role } from '../../pages/RoleList/RoleType';

interface GetRoleByIdResponse{
    role:Role;
}

interface GetRoleByIdVariable{
    roleId:string;    
}

const GET_ROLEBYID = gql`
query GetRoleById($roleId:String!){
    role(roleId: $roleId ) {
      roleId
      roleName
    }
  }
`

export const useGetRoleById = (RoleId:string) => {
  return useQuery<GetRoleByIdResponse,GetRoleByIdVariable>(GET_ROLEBYID,{
    variables:{
        roleId: RoleId
    }
  });
}