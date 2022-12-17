import { DropdownModel } from "../../components/user/UserAddressTypes";
import { ApiResource } from "./ApiResource";

export interface ApiResourceState{
    apiResourceId:number;
    header:string;
    apiResource:ApiResource;
}

export type ApiResourceAction = 
{ type:'UPDATE-HEADER', header:string}
| { type:'UPDATE-APIRESOURCE' , value:ApiResource }
| { type:'UPDATE-ID', value:string }