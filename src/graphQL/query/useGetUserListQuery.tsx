import { gql, useQuery } from '@apollo/client'
import { IUserList } from '../../pages/UserList/UserListType';

interface UserListReponse{
userList:IUserList[];
}

const GET_USERLIST = gql`
query GetUserList{
    userList {
      id
      userName
      email
      isAdmin
      enabled
      createdDate
    }
  }
`

export const useGetUserListQuery = () => {
  return useQuery<UserListReponse>(GET_USERLIST)
}