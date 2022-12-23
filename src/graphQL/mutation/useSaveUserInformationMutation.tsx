import { gql, useMutation } from "@apollo/client";

interface SaveUserInformationData{
    result:boolean;
}

interface SaveUserInfoVariables{
    saveUser:{
        id:string;
        userName:string;
        email:string;
        cartAmount:number;
        points:number;
        isAdmin:boolean;
        enabled:boolean;
    }
}
export const SAVE_USERINFO = gql`
mutation ModifyUserInformation($saveUser:UserInput!){
    modifyUserInformation(userInfoInput: $saveUser){
        result
    }
}
`
export function useSaveUserInformationMutation() {
  return useMutation<SaveUserInformationData,SaveUserInfoVariables>(SAVE_USERINFO);
}