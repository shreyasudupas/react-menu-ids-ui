export interface Client{
    id:number;
    clientId:string;
    clientName:string;
    description:string;
    enabled:boolean;
    allowedGrantType:string[];
    createdDate:Date;
    accessTokenLifetime:number;
    requireConsent:boolean;
    requirePkce:boolean;
    requireClientSecret:boolean;
    allowedScopes:AllowedScope[];
    clientSecrets:ClientSecret[];
    allowedCorsOrigins:AllowedCorsOrigin[];
    redirectUris:RedirectUrl[];
    postLogoutRedirectUris:PostLogoutRedirectUri[];
}

export interface AllowedScope{
    id:number;
    scope:string;
}

export interface ClientSecret{
    id:number;
    clientId:number;
    secretvalue:string;
}

export interface AllowedCorsOrigin{
    id:number;
    clientId:number;
    url:string;
}

export interface RedirectUrl{
    id:number;
    clientId:number;
    redirectUri:string;
}

export interface PostLogoutRedirectUri{
    id:number;
    clientId:number;
    postLogoutRedirectUri:string;
}