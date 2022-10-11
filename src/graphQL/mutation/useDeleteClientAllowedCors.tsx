import { gql, useMutation } from '@apollo/client'
import { AllowedCorsOrigin } from '../../pages/ClientDisplayList/ClientDisplayTypes';

interface DeleteClientAllowedCorsResponse{
    deleteAllowedCorsOrigin:AllowedCorsOrigin;
}

interface DeleteClientAllowedCorsVariable{
    corsOrigin:{
        clientId: number,
        id: number,
        url:string
    }
}

const DELETE_CLIENT_ALLOWEDORIGIN = gql`
mutation DeleteClientAllowedCorsOrigin($corsOrigin:AllowedCrosOriginModelInput!){
    deleteAllowedCorsOrigin(allowedCrosOriginModel: $corsOrigin) {
      id
      clientId
      url
    }
  }
`

export const useDeleteClientAllowedCors = () => {
  return useMutation<DeleteClientAllowedCorsResponse,DeleteClientAllowedCorsVariable>(DELETE_CLIENT_ALLOWEDORIGIN);
}