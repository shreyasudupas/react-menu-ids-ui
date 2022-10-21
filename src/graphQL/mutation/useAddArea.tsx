import { gql, useMutation } from "@apollo/client"
import { Area } from "../../pages/Address/AddressType";

interface AddAreaResponse{
    addArea:Area | null;
}

interface AddAreaVariable{
    newArea:{
        id:number;
        areaName:string;
        cityId:number | null;
    }
}

const ADD_NEWAREA = gql`
mutation AddArea($newArea: LocationAreaInput!){
    addArea(newArea:$newArea) {
      id
      areaName
      cityId
    }
  }
`

export const useAddArea = () => {
  return useMutation<AddAreaResponse,AddAreaVariable>(ADD_NEWAREA);
}