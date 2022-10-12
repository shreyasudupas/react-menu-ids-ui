import { gql, useMutation } from '@apollo/client'
import { PostLogoutRedirectUri } from '../../pages/ClientDisplayList/ClientDisplayTypes';

interface SaveClientPostLogoutRedirect{
    saveClientPostLogoutRedirectUrl:PostLogoutRedirectUri;
}

interface SaveClientPostLogoutRedirectUrlVaribale{
    clientPostLogout:{
        id:number;
        clientId:number;
        postLogoutRedirectUri:string;
    }
}

const SAVE_CLIENT_POSTLOGOUTREDIRECTURL = gql`
mutation SaveClientPostLogoutRedirectUrl($clientPostLogout:PostLogoutRedirectUriModelInput!){
    saveClientPostLogoutRedirectUrl(postLogoutRedirectUriModel: $clientPostLogout) {
      id
      clientId
      postLogoutRedirectUri
    }
  }
`

export const useSaveClientPostLogoutRedirectUrl = () => {
  return useMutation<SaveClientPostLogoutRedirect,SaveClientPostLogoutRedirectUrlVaribale>(SAVE_CLIENT_POSTLOGOUTREDIRECTURL);
}