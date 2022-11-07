import { gql, useMutation } from '@apollo/client'
import { UserInformatation } from '../../pages/UserProfile/UserProfileTypes';

interface UserPictureUploadResponse{
    addUserProfilePicture:UserInformatation;
}

interface UserPictureUploadVariable{
    input:{
        id:string;
        file:any;
    }
}

const UPLOAD_PICTURE = gql`
mutation Upload($input: AddUserProfilePictureInput!){
    addUserProfilePicture(input: $input) {
      userProfile {
        id
      }
    }
  }
`

export  const useUserPictureUpload = () => {
  return useMutation<UserPictureUploadResponse,UserPictureUploadVariable>(UPLOAD_PICTURE);
}