import { Role } from "../RoleList/RoleType";

export interface ManageRoleState{
    //roleId:string;
    role:Role | null;
    headerName:string;
}

export type ManageRoleAction = 
//| { type:'UPDATE_ROLEID'; roleId:string; }
| { type:'UPDATE_ROLE'; role:Role; }
| { type:'UPDATE_HEADER'; header:string; }