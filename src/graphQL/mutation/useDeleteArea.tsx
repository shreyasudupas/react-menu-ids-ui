import { gql, useMutation } from '@apollo/client'
import { Area } from '../../pages/Address/AddressType';

interface DeleteAreaResponse{
    addArea:Area | null;
}

interface DeleteAreaVariable{
    area:{
        id:number;
        areaName:string;
        cityId:number | null;
    }
}

const DELETE_AREA = gql`
mutation DeleteArea($area: LocationAreaInput!){
    deleteArea(area:$area)  {
      id
      areaName
      cityId
    }
  }
`

export const useDeleteArea = () => {
  return useMutation<DeleteAreaResponse,DeleteAreaVariable>(DELETE_AREA);
}