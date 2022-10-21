import { gql, useMutation } from '@apollo/client'
import { Area, City } from '../../pages/Address/AddressType';

interface AddNewCityResponse{
    addCity:City | null;
}

interface AddNewCityVariable{
    newCity:{
        id:number;
        name:string;
        stateId:number|null;
        areas:Area[];
    }
}

const ADD_NEWCITY= gql`
mutation AddCity($newCity:CityInput!){
    addCity(newCity:$newCity) {
      id
      name
      stateId
    }
  }
`

export const useAddNewCity = () => {
  return useMutation<AddNewCityResponse,AddNewCityVariable>(ADD_NEWCITY);
}