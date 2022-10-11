import { gql, useMutation } from '@apollo/client'
import { RedirectUrl } from '../../pages/ClientDisplayList/ClientDisplayTypes';

interface SaveClientRedirectUrlResponse{
    saveClientRedirectUrl:RedirectUrl;
}

interface SaveClientRedirectUrlVariable{
    clientRedirect:{
        id:number;
        clientId:number;
        redirectUri:string;
    }
}

const SAVE_CLIENT_REDIRECTURL = gql`
mutation SaveClientRediectUrl($clientRedirect:RedirectUrlModelInput!){
    saveClientRedirectUrl (redirectUrlModel: $clientRedirect) {
      id
      clientId
      redirectUri
    }
  }
`

export const useSaveClientRedirectUrl = () => {
  return useMutation<SaveClientRedirectUrlResponse,SaveClientRedirectUrlVariable>(SAVE_CLIENT_REDIRECTURL);
}