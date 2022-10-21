import { gql, useMutation } from '@apollo/client';
import { City, State } from '../../pages/Address/AddressType';

interface AddStateResponse{
    addState:State | null;
}

interface AddStateVariable{
    newState:{
        id:number;
        name:string;
        cities:City[];
    }
}

const ADD_NEWSTATE = gql`
mutation AddState($newState:StateInput!){
    addState(newState:$newState) {
      id
      name
    }
  }
`

export const useAddState = () => {
  return useMutation<AddStateResponse,AddStateVariable>(ADD_NEWSTATE);
}