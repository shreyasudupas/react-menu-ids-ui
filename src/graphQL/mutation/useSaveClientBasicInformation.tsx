import { gql, useMutation } from '@apollo/client'
import { ClientInformationModel } from '../../pages/ManageClient/ManageClientType';
import { ClientsResponse, GET_CLIENTS } from '../query/useGetClients';

interface SaveClientInfoReponse{
    saveClientBasicInformation:ClientInformationModel;
}

interface SaveClientInfoVariable{
    clientBasic:{
        id:number;
        clientId:string;
        clientName:string;
        description:string;
        enabled:boolean;
        createdDate:string;
        accessTokenLifetime:number;
        requireConsent:boolean;
        requirePkce:boolean;
        requireClientSecret:boolean;
    }
}

const SAVE_CLIENTBASIC = gql`
mutation SaveClientBasicInfo($clientBasic:ClientBasicInfoInput!){
    saveClientBasicInformation(clientBasicInfo: $clientBasic) {
      id
      clientId
      clientName
      description
      enabled
      accessTokenLifetime
      createdDate
      requireConsent
      requirePkce
    }
  }
`

export const useSaveClientBasicInformation = () => {
  return useMutation<SaveClientInfoReponse,SaveClientInfoVariable>(SAVE_CLIENTBASIC,{
    update(cache,{ data }) {
        const { clientsInformation } = cache.readQuery<ClientsResponse>({
            query: GET_CLIENTS
        })!;


        let result = data?.saveClientBasicInformation;

        if(result!== null && result!== undefined){
            cache.writeQuery({
                query: GET_CLIENTS,
                data: {
                    clientsInformation:clientsInformation.map(client=>
                        client.id === result!.id? {...clientsInformation} : {id:result?.id,clientId:result?.clientId,clientName:result?.clientName,
                        description:result?.description,accessTokenLifetime:result?.accessTokenLifetime,enabled:true,createdDate:result?.createdDate,
                        requirePkce:result?.requirePkce,requireConsent:result?.requireConsent,allowedGrantTypes:[]})
                }
            });
        }

        
    }
  });
}