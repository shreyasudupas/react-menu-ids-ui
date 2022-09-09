import { gql, useQuery } from "@apollo/client"
import { Role } from "../../pages/RoleList/RoleType";

interface GetRolesResponse{
    roles:Role[];
}

export const GET_ROLES = gql`
query GetRoles{
    roles {
      roleId
      roleName
    }
  }
`

export const useGetRoles = () => {
  return useQuery<GetRolesResponse>(GET_ROLES);
}