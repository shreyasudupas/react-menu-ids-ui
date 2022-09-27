import { gql, useMutation } from '@apollo/client'

interface SaveClientAllowedScope{
  saveAllowedScopes:string[]
}

interface SaveClientAllowedScopeVariable{
  clientId:number;
  scopes:string[];
}

const SAVE_CLIENT_ALLOWEDSCOPES = gql`
mutation SaveClientAllowedScopes($clientId:Int!,$scopes:[String!]){
  saveAllowedScopes(clientId: $clientId,scopes: $scopes)
}
`

export const useSaveClientAllowedScopeById = () => {
  return useMutation<SaveClientAllowedScope,SaveClientAllowedScopeVariable>(SAVE_CLIENT_ALLOWEDSCOPES);
}