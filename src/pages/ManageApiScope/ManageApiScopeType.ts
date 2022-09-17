import { ApiScopeData } from "../ApiScopes/ApiScopeType";

export interface ManageApiScopeState{
    apiScope:ApiScopeData;
    header:string;
    apiScopeId:number;
}

export type ManageApiScopeAction = 
   | { type: 'UPDATE_APISCOPE'; field:string; value:string; }
   | { type:'UPDATE_HEADER'; header:string; }
   | { type:'UPDATE_SCOPEID'; scopeId:number; }
   | { type:'ADD_APISCOPE'; apiScope:ApiScopeData; }