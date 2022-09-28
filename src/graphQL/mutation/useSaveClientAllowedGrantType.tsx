import { gql, useMutation } from '@apollo/client'

interface SaveAllowedGrantResponse{
    saveAllowedGrantTypes:string;
}

interface SaveAllowedGrantVariables{
    clientId:number;
    selectedGrantType:string;
}

const SAVE_CLIENT_ALLOWEDGRANTTYPES = gql`
mutation SaveGrantType($clientId:Int!,$selectedGrantType:String!){
    saveAllowedGrantTypes(clientId: $clientId,selectedGrantTypes: $selectedGrantType)
  }
`

export const useSaveClientAllowedGrantType = () => {
  return useMutation<SaveAllowedGrantResponse,SaveAllowedGrantVariables>(SAVE_CLIENT_ALLOWEDGRANTTYPES);
}