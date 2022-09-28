import { DropdownModel } from "../../user/UserAddressTypes";

export interface ClientAllowedScopeState{
    allowedScopeList:DropdownModel[];
    selectedscope:string[];
    clientIdFromParent:number;
}

export type ClientAllowedScopeActon = 
| { type:'UPDATE_ALLOWED_SCOPE', allowedScopes:DropdownModel[];  }
| { type:'UPDATE_SELECTED_SCOPES',scopes:string[]; }
| { type:'UPDATE_CLIENTID',clientId:number; }