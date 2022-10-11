import { gql, useMutation } from '@apollo/client'
import { AllowedCorsOrigin } from '../../pages/ClientDisplayList/ClientDisplayTypes';

interface SaveAllowedClientCorsResponse{
    saveAllowedCorsOrigin:AllowedCorsOrigin;
}

interface SaveAllowedClientCorsVariable{
    corsOrigin:{
        clientId: number,
        id: number,
        url:string
    }
}

const SAVE_CLIENT_ALLOWEDORIGIN = gql`
mutation SaveClientAllowedCorsOrigin($corsOrigin:AllowedCrosOriginModelInput!){
    saveAllowedCorsOrigin(allowedCrosOriginModel: $corsOrigin) {
      id
      clientId
      url
    }
  }
`

export const useSaveClientAllowedCors = () => {
  return useMutation<SaveAllowedClientCorsResponse,SaveAllowedClientCorsVariable>(SAVE_CLIENT_ALLOWEDORIGIN);
}