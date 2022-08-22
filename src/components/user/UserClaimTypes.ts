export interface UserClaimState{
    editClaimDialog:boolean;
    addClaimDialog:boolean;
    deleteConfirmDialog:boolean;
    claims:Array<claimModel>;
    claim:claimModel;
}

export interface claimModel{
    label:string | null;
    value:string | null;
}

export type ClaimAction = 
| { type: "edit-claim-dialog"; isOpen:boolean }
| { type: "add-claim-dialog"; isOpen:boolean }
| { type: "delete-claim-dialog"; isOpen:boolean }
| { type: "claims-list-update"; claims:Array<claimModel> }
| { type: "claim-user-add"; addClaim:claimModel }
| { type: "claim-user-update"; claim:claimModel }