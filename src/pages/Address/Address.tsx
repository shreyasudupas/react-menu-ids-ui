import { Card } from 'primereact/card'
import React, { useEffect, useReducer, useState } from 'react'
import { Areas } from '../../components/address/Areas'
import { Cities } from '../../components/address/Cities'
import { States } from '../../components/address/States'
import { useGetAddressList } from '../../graphQL/query/useGetAddressList'
import { AddressAction, AddressState } from './AddressType'

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

  return (
    <React.Fragment>
      <Card title="Edit Address">
        <States selectedStates={state.selectedStateId} 
                states={state.States} 
                sendStateIdFromState={setState}
        />
        
        {
          (state.selectedStateId === 0) ? <React.Fragment></React.Fragment> :
            <div className='p-3'>
              <Cities cities={state.Cities}
                      selectedCity={state.selectedCityId}
                      sendUpdatedCityId={setCity}
                      selectedStateId={state.selectedStateId}
                      />
            </div>
        }
        {
          (state.selectedCityId === 0) ? <React.Fragment></React.Fragment> :
            <div className='p-3'>
              <Areas areas={state.Areas}
                      stateId={state.selectedCityId}/>
            </div>
          
            
        }
      </Card>
    </React.Fragment>
    
  )
}