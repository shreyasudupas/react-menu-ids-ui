import { gql, useMutation } from '@apollo/client'
import { RedirectUrl } from '../../pages/ClientDisplayList/ClientDisplayTypes';

interface DeleteClientRedirectUrlResponse{
    deleteClientRedirectUrl:RedirectUrl;
}

interface DeleteClientRedirectUrlVariable{
    clientRedirect:{
        id:number;
        clientId:number;
        redirectUri:string;
    }
}

const DELETE_CLIENT_REDIRECTURL = gql`
mutation DeleteClientRediectUrl($clientRedirect:RedirectUrlModelInput!){
    deleteClientRedirectUrl (redirectUrlModel: $clientRedirect) {
      id
      clientId
      redirectUri
    }
  }
`

export const useDeleteClientRedirectUrl = () => {
  return useMutation<DeleteClientRedirectUrlResponse,DeleteClientRedirectUrlVariable>(DELETE_CLIENT_REDIRECTURL);
}