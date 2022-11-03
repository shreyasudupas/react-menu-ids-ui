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
| { type:'ADD_NEW_STATE', newState: State }
| { type:'REMOVE_STATE', deleteState: State }
| { type:'ADD_NEW_CITY', newCity: City }
| { type:'REMOVE_CITY', deleteCity: City }
| { type:'ADD_CITY_TO_STATE', newCity: City , selectedStateId:number }
| { type:'REMOVE_CITY_FROM_STATE', cityId: number , selectedStateId:number }