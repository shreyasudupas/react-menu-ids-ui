import { gql, useQuery } from '@apollo/client'
import { State } from '../../pages/Address/AddressType';

interface GetAddressListResponse{
    addressList:State[];
}

const GETADDRESS_LIST = gql`
query GetAddress{
    addressList {
      id
      name
      cities {
        id
        name
        stateId
        areas {
          id
          areaName
          cityId
        }
      }
    }
  }
`

export const useGetAddressList = () => {
  return useQuery<GetAddressListResponse>(GETADDRESS_LIST);
}