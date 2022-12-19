import { IdentityResource } from "./IdentityResource";

export interface IdentityResourceState{
    identityResourceId:number;
    resource:IdentityResource;
    header:string;
}

export type IdentityResourceAction =
{ type:'UPDATE_RESOURCE_ID', value:number; }
| { type:'UPDATE_RESOURCE_VALUE', item:IdentityResource; }
| { type:'UPDATE_CARD_TITLE' , title:string; }