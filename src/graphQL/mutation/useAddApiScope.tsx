import { gql, useMutation } from '@apollo/client'
import { ApiScopeData } from '../../pages/ApiScopes/ApiScopeType';
import { ApiScopesResponse, GET_ALL_APISCOPES } from '../query/useGetApiScopes'

interface AddApiScopeResponse{
    addApiScope:ApiScopeData;
}

interface AddApiScopeVariable{
    newScope:{
        id:number;
        name:string;
        displayName:string;
        description:string;
    }
}

const ADD_APISCOPE = gql`
mutation AddApiScope($newScope:ApiScopeModelInput!){
    addApiScope(apiScopeModel: $newScope) {
      id
      name
      displayName
      description
    }
}
`

export const useAddApiScope = () => {
  return useMutation<AddApiScopeResponse,AddApiScopeVariable>(ADD_APISCOPE,
    {
        update(cache , { data }) {
            const { apiScopes } = cache.readQuery<ApiScopesResponse>({
                query: GET_ALL_APISCOPES
            })!;

            if(apiScopes !== null){
                cache.writeQuery({
                    query: GET_ALL_APISCOPES,
                    data: {
                        apiScopes:[
                            ...apiScopes,
                            data?.addApiScope
                        ]
                    }
                });
            }
        }
    }
    );
}