import { gql, useMutation } from "@apollo/client";
import { ClientSecret } from "../../pages/ClientDisplayList/ClientDisplayTypes"

interface SaveClientResponse{
    saveClientSecret:ClientSecret;
}

interface SaveClientVariables{
    clientSecret:{
        clientId: number;
        id: number;
        secretValue:string;
    }
}

const SAVECLIENT_SECRET = gql`
mutation SaveClientSecret($clientSecret:ClientSecretModelInput!){
    saveClientSecret(clientSecretModel: $clientSecret) {
      id
      clientId
      secretValue
    }
  }
`

export const useSaveClientSecret = () => { 
  return useMutation<SaveClientResponse,SaveClientVariables>(SAVECLIENT_SECRET);
}
