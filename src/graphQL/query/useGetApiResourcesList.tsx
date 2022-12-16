import { gql, useQuery } from "@apollo/client"
import { ApiResource } from "../../pages/ManageApiResource/ApiResource";

interface GetAllApiResourceListResponse{
    allApiResources:ApiResource[];
}

const GET_ALL_API_RESOURCE = gql`
query GetAllApiResources{
    allApiResources {
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
`

export const useGetApiResourceList = () => {
    return useQuery<GetAllApiResourceListResponse>(GET_ALL_API_RESOURCE,{
      fetchPolicy: 'network-only'
    });
}