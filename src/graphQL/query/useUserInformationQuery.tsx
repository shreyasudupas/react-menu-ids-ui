import { gql, useQuery } from "@apollo/client";
import { UserInformatation } from '../../pages/UserProfile/UserProfileTypes';

interface UserInformationReponse{
  userInformation:UserInformatation;
}

interface UserInformationVariable{
  userId:string;
}


export const GET_USERINFORMATION = gql`
query GetUserInformation($userId:String!){
  userInformation (userId:$userId){
    id
    userName
    email
    cartAmount
    points
    isAdmin
    imagePath
    enabled
    claims{
      label
      value
    }
    address {
      id
      fullAddress
      city
      area
      state
      stateId
      myStates {
        label
        value
      }
      isActive
      city
      myCities {
        label
        value
      }
      cityId
      area
      myAreas {
        label
        value
      }
      areaId
    }
  }
}
`;

export function useUserInformationQuery(id:string) {
  return useQuery<UserInformationReponse, UserInformationVariable>(GET_USERINFORMATION, {
    variables: {
      userId: id
    }
  });
}