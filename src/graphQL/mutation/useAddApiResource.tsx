import { gql, useMutation } from '@apollo/client'
import { ApiResource } from '../../pages/ManageApiResource/ApiResource';
import { ApiResourceScope } from '../../pages/ManageApiResource/ApiResourceScope';

interface AddApiResourceResponse{
    addApiResource:ApiResource;
}

interface AddApiResourceVariable {
    addModel: {
        id: number;
        enabled: boolean;
        name: string;
        description: string | null;
        displayName: string | null;
        allowedAccessTokenSigningAlgorithms: string | null;
        showInDiscoveryDocument: boolean;
        created: string | null;
        updated: string | null;
        lastAccessed: string;
        nonEditable: boolean;
        scopes:ApiResourceScope[];
    };
}

const ADD_APIRESOURCE = gql`
mutation AddApiResource($addModel:ApiResourceModelInput!){
    addApiResource(apiResourceModel: $addModel) {
      id
      name
      description
      displayName
      showInDiscoveryDocument
      enabled
      nonEditable
      allowedAccessTokenSigningAlgorithms
      created
      lastAccessed
      scopes{
        id
        scope
        apiResourceId
      }
    }
  }
`

export const useAddApiResource = () => {
  return useMutation<AddApiResourceResponse,AddApiResourceVariable>(ADD_APIRESOURCE);
}