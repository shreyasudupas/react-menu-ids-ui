import { ApiResourceScope } from "./ApiResourceScope";

export interface ApiResource{
    id:number;
    enabled:boolean;
    name:string;
    description:string|null;
    displayName:string|null;
    allowedAccessTokenSigningAlgorithms:string|null;
    showInDiscoveryDocument:boolean;
    created:string|null;
    updated:string|null;
    lastAccessed:string;
    nonEditable:boolean;
    scopes:ApiResourceScope[];
}