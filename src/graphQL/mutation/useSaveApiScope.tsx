import { gql, useMutation } from "@apollo/client"
import { ApiScopeData } from "../../pages/ApiScopes/ApiScopeType";
import { ApiScopesResponse, GET_ALL_APISCOPES } from "../query/useGetApiScopes";

interface SaveApiScopeResponse{
    saveApiScope:ApiScopeData;
}

interface SaveApiScopeVariable{
    saveScope: {
        id:number;
        name:string;
        displayName:string;
        description:string;
      }
}

const SAVE_APISCOPE = gql`
mutation SaveApiScope($saveScope:ApiScopeModelInput!){
    saveApiScope(apiScopeModel: $saveScope) {
      id
      name
      displayName
      description
    }
}
`

export const useSaveApiScope = () => {
  return useMutation<SaveApiScopeResponse, SaveApiScopeVariable>(SAVE_APISCOPE,
    {
      update(cache, { data }) {
        const { apiScopes } = cache.readQuery<ApiScopesResponse>({
          query: GET_ALL_APISCOPES
        })!;

        if (apiScopes !== null) {
          cache.writeQuery({
            query: GET_ALL_APISCOPES,
            data: {
              apiScopes: apiScopes.map(
                scope => scope.id === data?.saveApiScope.id ? { id: data.saveApiScope.id,name:data.saveApiScope.name,displayName: data.saveApiScope.displayName,
                description: data.saveApiScope.description }: { ...scope })
            }
          });
        }
      }
    });
}