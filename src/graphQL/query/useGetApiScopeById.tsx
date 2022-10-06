import { gql, useQuery } from '@apollo/client'
import { ApiScopeData } from '../../pages/ApiScopes/ApiScopeType';

interface GetApiScopeByIdResponse{
    apiScopeById:ApiScopeData;
}

interface GetApiScopeByIdVariable{
    id:number;
}

const GETAPISCOPE_BY_ID = gql`
query GetApiScopeById($id:Int!){
    apiScopeById(id: $id) {
      id
      name
      displayName
      description
    }
  }
`

export const useGetApiScopeById = (apiScopeId:number) => {
  return useQuery<GetApiScopeByIdResponse,GetApiScopeByIdVariable>(GETAPISCOPE_BY_ID,{
    variables:{
        id:apiScopeId
    },
    fetchPolicy: "no-cache"
  });
}