import { gql, useMutation } from '@apollo/client'
import { Area, City } from '../../pages/Address/AddressType';

interface DeleteCityReponse{
    deleteCity:City|null;
}

interface DeleteCityVariable{
    city:{
        id:number;
        name:string;
        stateId:number|null;
        areas:Area[];
    }
}

const DELETE_CITY = gql`
mutation DeleteCity($city:CityInput!){
    deleteCity(city:$city) {
      id
      name
      stateId
    }
  }
`

export const useDeleteCity = () => {
  return useMutation<DeleteCityReponse,DeleteCityVariable>(DELETE_CITY);
}