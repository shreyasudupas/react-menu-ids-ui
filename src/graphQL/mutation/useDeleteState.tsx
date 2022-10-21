import { gql, useMutation } from '@apollo/client'
import { City, State } from '../../pages/Address/AddressType';

interface DeleteStateResponse{
    deleteState:State | null;
}

interface DeleteStateVariable{
    state:{
        id:number;
        name:string;
        cities:City[];
    }
}

const DELETE_STATE = gql`
mutation DeleteState($state:StateInput!){
    deleteState(state:$state) {
      id
      name
    }
  }
`

export const useDeleteState = () => {
  return useMutation<DeleteStateResponse,DeleteStateVariable>(DELETE_STATE);
}