import { gql, useMutation } from '@apollo/client'
import { ApiScopeData } from '../../pages/ApiScopes/ApiScopeType';
import { ApiScopesResponse, GET_ALL_APISCOPES } from '../query/useGetApiScopes';

interface DeleteApiScopeResponse{
    deleteApiScope:ApiScopeData;
}

interface DeleteApiScopeVariable{
    apiScopeId:number;
}

const DELETEAPISCOPE_BY_ID = gql`
mutation DeleteApiScope($apiScopeId:Int!){
    deleteApiScope(apiScopeId: $apiScopeId) {
      id
    }
}
`

export const useDeleteApiScope = () => {
  return useMutation<DeleteApiScopeResponse,DeleteApiScopeVariable>(DELETEAPISCOPE_BY_ID,
    {
        update(cache, { data }) {
            const { apiScopes } = cache.readQuery<ApiScopesResponse>({
                query: GET_ALL_APISCOPES
            })!;

            if(data?.deleteApiScope !== null){
                cache.writeQuery({
                    query: GET_ALL_APISCOPES,
                    data: { 
                        apiScopes: apiScopes.filter(scope=>scope.id !== data?.deleteApiScope.id)
                    }
                })
            }
        }
    });
}