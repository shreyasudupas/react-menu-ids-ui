import { gql, useMutation } from "@apollo/client";
import { DropdownModel, UserAddressModel } from "../../components/user/UserAddressTypes";


interface UserProfileAddressVariable{
    saveAddress:{
        id:number,
        fullAddress:string,
        state:string,
        stateId:string,
        city:string,
        cityId:string,
        myCities:DropdownModel[],
        area:string,
        areaId:string,
        isActive: boolean,
        myAreas:DropdownModel[],
        myStates:DropdownModel[]
    }
}

const ADD_MODIFY_USER_ADDRESS = gql`
mutation SaveUserAddress($saveAddress:UserProfileAddressInput!){
    addModifyAddress(userProfileAddress: $saveAddress) {
      id
      city
    }
  }
`;

export function useAddModifyUserAddress(){
    return useMutation<UserAddressModel,UserProfileAddressVariable>(ADD_MODIFY_USER_ADDRESS);
}