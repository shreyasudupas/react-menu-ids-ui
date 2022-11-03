import { Card } from 'primereact/card'
import React, { useEffect, useReducer, useState } from 'react'
import { Areas } from '../../components/address/Areas'
import { Cities } from '../../components/address/Cities'
import { States } from '../../components/address/States'
import { useGetAddressList } from '../../graphQL/query/useGetAddressList'
import { AddressAction, AddressState, Area, City, State } from './AddressType'

const inititialState :AddressState = {
  States:[],
  Areas:[],
  Cities:[],
  selectedStateId:0,
  selectedCityId:0,
  selectedAreaId:0
}

const reducer = (state:AddressState,action:AddressAction):AddressState =>{
  switch(action.type){
    case 'UPDATE_STATES':
      return {
        ...state,
        States: action.states
      };
    case 'UPDATE_CITIES':
      return {
        ...state,
        Cities: action.cities
      };
    case 'UPDATE_AREA':
      return {
        ...state,
        Areas: action.areas
      };
    case 'UPDATE_SELECTED_STATES':
      return {
        ...state,
        selectedStateId: action.selectedStateId
      };
    case 'UPDATE_SELECTED_CITIES':
      return {
        ...state,
        selectedCityId: action.selectedCityId
      };
    case 'UPDATE_SELECTED_AREAS':
      return {
        ...state,
        selectedAreaId: action.selectedAreaId
      };
    case 'ADD_NEW_STATE':
      return {
        ...state,
        States: [...state.States,action.newState]
      }
    case 'REMOVE_STATE':
      return {
        ...state,
        States: state.States.filter(s=>s.id !== action.deleteState.id) 
      }
    case 'ADD_NEW_CITY':
      return {
        ...state,
        Cities: [...state.Cities,action.newCity]
      }
    case 'REMOVE_CITY':
      return {
        ...state,
        Cities: state.Cities.filter(s=>s.id !== action.deleteCity.id) 
      }
    case 'ADD_CITY_TO_STATE':
      let city = {
        id: action.newCity.id,
        name: action.newCity.name,
        stateId: action.selectedStateId,
        areas:[]
      };

      return {
        ...state,
        States: state.States.map( state => 
          state.id === action.selectedStateId? { id:state.id,name:state.name,cities:[...state.cities,city]} : {...state})
      }
    case 'REMOVE_CITY_FROM_STATE':
      return {
       ...state,
       States: state.States.map( state => 
        state.id === action.selectedStateId? { id:state.id,name:state.name,cities: state.cities.filter(c=>c.id !== action.cityId)} : {...state})
      }
    case 'ADD_NEW_AREA':
      return{
        ...state,
        Areas: [...state.Areas,action.newArea]
      }
    case 'REMOVE_AREA':
      return {
        ...state,
        Areas: state.Areas.filter(a=> a.id !== action.deleteAreaId)
      }
    case 'ADD_AREA_TO_STATES':
      return {
        ...state,
        States: state.States.map(state=>
          state.id === action.selectedStateId? { id: state.id,name:state.name,cities: state.cities.map(city=>
            city.id === action.selectedCityId? { id: city.id,stateId: city.stateId,areas:[...city.areas,action.newArea],name:state.name} : {...city})! } :{...state})
      }
    case 'REMOVE_AREA_FROM_STATES':
      return {
        ...state,
        States: state.States.map(state=>
          state.id === action.selectedStateId? { id: state.id,name:state.name,cities: state.cities.map(city=>
            city.id === action.selectedCityId? { id:city.id,name:city.name,stateId:city.stateId,areas: city.areas.filter(a=>a.id !== action.areaId) }:{...city}) } :{...state})
      }
  }
} 

export const Address = () => {
const [ state,dispatch ] = useReducer(reducer,inititialState);
//const [selectedCities1, setSelectedCities1] = useState(null);
const { data } =  useGetAddressList();

useEffect(()=>{
  if(data!==undefined){
    dispatch({type:'UPDATE_STATES',states: data.addressList})
  }
},[data])

console.log(state)

const setState = (stateId:any) => {
    //debugger
    var getState = state.States.find(s=>s.id == stateId);

    if(getState !== undefined){
      dispatch({ type:'UPDATE_CITIES',cities: getState?.cities });

      dispatch({ type:'UPDATE_SELECTED_STATES',selectedStateId: stateId });

      //Revert other selection when new selection is made
      dispatch({ type:'UPDATE_SELECTED_CITIES', selectedCityId:0 });

      dispatch({ type:'UPDATE_AREA',areas:[] });

      dispatch({ type:'UPDATE_SELECTED_AREAS',selectedAreaId:0 });
    }
}

const setCity = (cityId:any) => {

  var getArea = state.Cities.find(s=>s.id == cityId);

    if(getArea !== undefined){
      dispatch({ type:'UPDATE_AREA', areas: getArea.areas });

      dispatch({ type:'UPDATE_SELECTED_CITIES',selectedCityId: cityId });
    }
}

const setArea = (areaId:any) => {

  dispatch({ type:'UPDATE_SELECTED_AREAS',selectedAreaId: areaId });
}

const setNewAddedState = (newState:State) => {
  dispatch({ type: 'ADD_NEW_STATE', newState: newState });
}

const setDeletedState = (stateToRemove:State) => {
  dispatch({ type:'REMOVE_STATE',deleteState: stateToRemove })
}

const setNewCity = (newCity:City) => {
  dispatch({ type: 'ADD_NEW_CITY', newCity: newCity });

  dispatch({ type:'ADD_CITY_TO_STATE',newCity:newCity,selectedStateId: state.selectedStateId });
}

const removeCity = (removeCity:City) => {
  dispatch({ type:'REMOVE_CITY',deleteCity: removeCity });

  dispatch({ type: 'REMOVE_CITY_FROM_STATE',cityId: removeCity.id,selectedStateId: state.selectedStateId });
}

const setNewArea = (addNewArea:Area) => {
  dispatch({ type:'ADD_NEW_AREA',newArea: addNewArea });

  dispatch({ type: 'ADD_AREA_TO_STATES',newArea:addNewArea ,selectedCityId: state.selectedCityId,selectedStateId: state.selectedStateId });
}

const removeArea = (removeArea:Area) => {
  //debugger
  dispatch({ type:'REMOVE_AREA',deleteAreaId:removeArea.id });

  dispatch({ type:'REMOVE_AREA_FROM_STATES',areaId:removeArea.id,selectedCityId:state.selectedCityId,selectedStateId:state.selectedStateId });
}

  return (
    <React.Fragment>
      <Card title="Edit Address">
        <States selectedStates={state.selectedStateId} 
                states={state.States} 
                sendStateIdFromState={setState}
                newAddedState={setNewAddedState}
                sendDeletedState={setDeletedState}
        />
        
        {
          (state.selectedStateId === 0) ? <React.Fragment></React.Fragment> :
            <div className='p-3'>
              <Cities cities={state.Cities}
                      selectedCity={state.selectedCityId}
                      sendUpdatedCityId={setCity}
                      selectedStateId={state.selectedStateId}
                      sendNewCity= {setNewCity}
                      sendDeletedCity={removeCity}
                      />
            </div>
        }
        {
          (state.selectedCityId === 0) ? <React.Fragment></React.Fragment> :
            <div className='p-3'>
              <Areas areas={state.Areas}
                      stateId={state.selectedCityId}
                      sendArea={setNewArea}
                      sendDeletedArea={removeArea}/>
            </div>
          
            
        }
      </Card>
    </React.Fragment>
    
  )
}