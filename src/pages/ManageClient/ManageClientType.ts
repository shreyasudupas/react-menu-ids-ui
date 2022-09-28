import { Client } from "../ClientDisplayList/ClientDisplayTypes";

export interface ManageClientState {
    header:string;
    clientId:number;
    client:Client;
}

export type ManageClientAction = 
| { type:'UPDATE_HEADER'; header:string; }
| { type:'ADD_CLIENT'; newclient:Client; }
//| { type:'MODIFY_CLIENT'; client:Client; }
| { type:'MODIFY_CLIENTID'; id:number; }