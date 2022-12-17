import React, { useEffect, useReducer, useState } from 'react'
import { MultiSelect } from 'primereact/multiselect';
import { Card } from 'primereact/card';
import axios from 'axios';
import { AllowedScope } from '../../pages/ClientDisplayList/ClientDisplayTypes';
import { Button } from 'primereact/button';
import { useSaveClientAllowedScopeById } from '../../graphQL/mutation/useSaveClientAllowedScopeById';
import { ClientAllowedScopeActon, ClientAllowedScopeState } from './Models/ClientAllowedScopeModel';

type AllowedScopeType = {
  scopeList:AllowedScope[];
  clientId:number;
}

const GETALLOWEDSCOPELIST:string = "https://localhost:5006/api/utility/getAllScopes";


const initialState: ClientAllowedScopeState = {
  allowedScopeList : [],
  clientIdFromParent:0,
  selectedscope:[]
}

const reducer = (state:ClientAllowedScopeState,action:ClientAllowedScopeActon):ClientAllowedScopeState => {
  switch(action.type){
    case 'UPDATE_CLIENTID':
      return {
        ...state,
        clientIdFromParent: action.clientId
      };
    case 'UPDATE_ALLOWED_SCOPE':
      return {
        ...state,
        allowedScopeList: action.allowedScopes
      }
    case 'UPDATE_SELECTED_SCOPES':
        return {
          ...state,
          selectedscope:action.scopes
        }
  }
}

export const ClientAllowedScopes = ({ scopeList , clientId }:AllowedScopeType) => {

    const [state,dispatch] = useReducer(reducer,initialState);
    const [ saveClientAllowedScope ] = useSaveClientAllowedScopeById();
    let storage = JSON.parse(sessionStorage.getItem(`oidc.user:${process.env.REACT_APP_AUTH_URL}:${process.env.REACT_APP_IDENTITY_CLIENT_ID}`)!);
    
    
    useEffect(()=>{
      if(state.allowedScopeList.length === 0){
        axios.get(GETALLOWEDSCOPELIST,{ headers: { "Authorization" : `Bearer ${storage["access_token"]}` } })
        .then((result)=>{
            if(result.data !== null){
              dispatch({ type:'UPDATE_ALLOWED_SCOPE', allowedScopes: result.data });
            }
        })
        .catch(err=>console.log(err))
        
      }
    },[]);

    useEffect(()=>{
      if(scopeList !== null && scopeList !== undefined){
        //debugger
        let scopeListItem:string[] = [];
        scopeList.forEach(i=> scopeListItem.push(i.scope));
        
        dispatch({ type:'UPDATE_SELECTED_SCOPES',scopes:scopeListItem});
        dispatch({ type:'UPDATE_CLIENTID',clientId: clientId });
      }
    },[scopeList,clientId]);

    const saveScopes = () => {
      // alert(state.selectedscope);
      
      saveClientAllowedScope({
        variables:{
          clientId:state.clientIdFromParent,
          scopes: state.selectedscope
        }
      }).then((res)=>{
        if(res !== null){
          alert('success save scopes')
        }
      }).catch(err => console.log(err));

    }

    const footerTemplate = () => {
      return <Button label='Save Scopes' className='p-button-rounded' onClick={()=> saveScopes()}/>
    }
    
  return (
    <React.Fragment>
      <Card title="Allowed Scopes" footer={footerTemplate}>
        <div className='formgrid grid p-fluid'>
          <div className='field col-6 p-3'>
            <MultiSelect value={state.selectedscope}
              options={state.allowedScopeList}
              onChange={(e) => dispatch({ type:'UPDATE_SELECTED_SCOPES',scopes:e.value })}
              optionLabel="label"
              optionValue="value"
              placeholder="Select Scope Types"
              display="chip" />
          </div>
        </div>
      </Card>
    </React.Fragment>
  )
}