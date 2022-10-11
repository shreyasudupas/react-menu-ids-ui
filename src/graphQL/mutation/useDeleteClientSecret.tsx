import { gql, useMutation } from "@apollo/client"
import { ClientSecret } from "../../pages/ClientDisplayList/ClientDisplayTypes";

interface DeleteClientSecretRespose{
    deleteClientSecret:ClientSecret;
}

interface DeleteClientSecretVariable{
    clientSecret:{
        clientId: number;
        id: number;
        secretValue:string;
    }
}

const DELETE_CLIENT_SECRET = gql`
mutation DeleteClientSecret($clientSecret:ClientSecretModelInput!){
    deleteClientSecret (clientSecretModel: $clientSecret) {
      id
      clientId
      secretValue
    }
  }
`

export const useDeleteClientSecret = () => {
  return useMutation<DeleteClientSecretRespose,DeleteClientSecretVariable>(DELETE_CLIENT_SECRET);
}