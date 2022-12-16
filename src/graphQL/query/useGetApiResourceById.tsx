import { gql, useQuery } from "@apollo/client"
import { ApiResource } from "../../pages/ManageApiResource/ApiResource";

export interface GetApiResourceByIdResponse{
    apiResourcesById:ApiResource;
}

export interface GetApiResourceVariable{
    id:number;
}

const GET_API_RESOURCEBYID = gql`
query GetAllApiResourcesById($id:Int!){
    apiResourcesById(id:$id) {
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
    }
  }
`;

export const useGetApiResourceById = (resourceId:number) => {
  return useQuery<GetApiResourceByIdResponse>(GET_API_RESOURCEBYID,{
    variables:{
        id: resourceId
    },
    fetchPolicy: 'network-only',
  });
}