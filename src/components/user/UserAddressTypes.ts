
export interface UserAddressState {
    cities: Array<DropdownModel>;
    areas: Array<DropdownModel>;
    listUserAddress: Array<UserAddressModel>;
}

interface DropdownModel {
    label: string;
    value: number;
}

export interface UserAddressModel {
    id: number;
    fullAddress: string;
    city: string;
    cityId: string;
    myCities: any;
    area: string;
    areaId:string;
    myAreas: any;
    state: string;
    stateId:string;
    myStates: any;
    isActive: boolean;
}

export type UserAddressAction = 
| { type: 'modify-cities'; userId:number; value:Array<DropdownModel>; }
| { type: 'modify-area'; userId:number;value:Array<DropdownModel>; }
| { type: 'add-list-userAddress'; listUserAddress:Array<UserAddressModel>; }
| { type: 'add-new-address'; newAddress:UserAddressModel; }
| { type: 'modify-user-address-form'; userId:number; field:string; value:any; }
