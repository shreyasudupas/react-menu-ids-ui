export interface State{
userId:string | null;
userInformation:UserInformatation;
activeIndex:number;
}

export interface UserInformatation{
id:string;
userName:string;
email:string;
cartAmount:number;
points:number;
address:any[];
claims:any[];
isAdmin:boolean;
}

export type Action = 
| { type: 'UPDATE-USERID'; Id:string }
| { type: 'INITIALIZE-USERINFORMATION'; userInfo:UserInformatation }
| { type: 'UPDATE-USERINFORMATION'; field:string; value:any }
| { type: 'UPDATE-ACTIVE-INDEX-ADDRESS'; }