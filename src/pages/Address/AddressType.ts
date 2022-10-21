export interface State{
    id:number;
    name:string;
    cities:City[];
}

export interface City{
    id:number;
    name:string;
    stateId:number|null;
    areas:Area[];
}

export interface Area{
    id:number;
    areaName:string;
    cityId:number|null;
}

export interface AddressState{
    States:State[];
    Cities:City[];
    Areas:Area[];
    selectedStateId:number;
    selectedCityId:number;
    selectedAreaId:number;
}

export type AddressAction =
| { type:'UPDATE_STATES', states: State[] }
| { type:'UPDATE_CITIES', cities: City[] }
| { type:'UPDATE_AREA', areas: Area[] }
| { type:'UPDATE_SELECTED_STATES', selectedStateId: any }
| { type:'UPDATE_SELECTED_CITIES', selectedCityId: any }
| { type:'UPDATE_SELECTED_AREAS', selectedAreaId: any }