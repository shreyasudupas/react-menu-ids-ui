export interface IdentityResource{
    id:number;
    enabled:boolean;
    name:string;
    description:string|null;
    displayName:string|null;
    required:boolean;
    emphasize:boolean;
    showInDiscoveryDocument:boolean;
    created:string|null;
    updated:string|null;
    nonEditable:boolean;
}