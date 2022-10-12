import { gql, useMutation } from "@apollo/client";
import { PostLogoutRedirectUri } from "../../pages/ClientDisplayList/ClientDisplayTypes";

interface DeleteClientPostLogoutRedirectUrlResponse{
    deleteClientPostLogoutRedirectUrl:PostLogoutRedirectUri;
}

interface DeleteClientPostLogoutRedirectUrlVariable{
    clientPostLogout:{
        id:number;
        clientId:number;
        postLogoutRedirectUri:string;
    }
}

const DELETE_POSTLOGOUTREDIRECTURL = gql`
mutation DeleteClientPostLogoutRedirectUrl($clientPostLogout:PostLogoutRedirectUriModelInput!){
    deleteClientPostLogoutRedirectUrl(postLogoutRedirectUriModel: $clientPostLogout) {
      id
      clientId
      postLogoutRedirectUri
    }
  }
`

export const useDeletePostLogoutRedirectUrl = () => {
  return useMutation<DeleteClientPostLogoutRedirectUrlResponse,DeleteClientPostLogoutRedirectUrlVariable>(DELETE_POSTLOGOUTREDIRECTURL);
}