import { ApiResourceScope } from "../../pages/ManageApiResource/ApiResourceScope";
import { DropdownModel } from "../user/UserAddressTypes";

export interface ApiResourceScopeState{
    allowedScopeList:DropdownModel[],
    seletedScope:string;
    apiResourceScopeList:ApiResourceScope[];
    apiResourceId:number;
}


export type ApiResourceScopeAction = {
    type:'UPDATE_ALLOWEDSCOPE_LIST', scopeList:DropdownModel[]
} | { type:'UPDATE_SELECTED_SCOPE', value:string }
| { type:'UPDATE_APIRESOURCE_SCOPE_LIST' , list:ApiResourceScope[] }
| { type:'UPDATE_APIRESOURCE_ID' , value:number; }
| { type: 'ADD_APIRESOURCESCOPE' , item:ApiResourceScope; }
| { type: 'DELETE_APIRESOURCESCOPE' , id:number; }