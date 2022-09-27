import React, { useEffect, useState } from 'react'
import { MultiSelect } from 'primereact/multiselect';
import { Card } from 'primereact/card';
import { DropdownModel } from '../user/UserAddressTypes';
import axios from 'axios';
import { AllowedScope } from '../../pages/ClientDisplayList/ClientDisplayTypes';
import { Button } from 'primereact/button';
import { useSaveClientAllowedScopeById } from '../../graphQL/mutation/useSaveClientAllowedScopeById';

type AllowedScopeType = {
  scopeList:AllowedScope[];
  clientId:number;
}

export const ClientAllowedScopes = ({ scopeList , clientId }:AllowedScopeType) => {

    const [getAllowedScopes, setAllowedScopes] = useState<DropdownModel[]>([]);
    const [ selectedScopes, setSelectedScopes ] = useState<string[]>([]);
    const [ clientIdState, setClientId ] = useState<number>(0)
    const [ saveClientAllowedScope ] = useSaveClientAllowedScopeById();

    const GETALLOWEDSCOPELIST:string = "https://localhost:5006/api/utility/getAllowedScopes";
    let storage = JSON.parse(sessionStorage.getItem(`oidc.user:${process.env.REACT_APP_AUTH_URL}:${process.env.REACT_APP_IDENTITY_CLIENT_ID}`)!);
    
    useEffect(()=>{
      if(getAllowedScopes.length === 0){
        axios.get(GETALLOWEDSCOPELIST,{ headers: { "Authorization" : `Bearer ${storage["access_token"]}` } })
        .then((result)=>{
            if(result.data !== null){
              setAllowedScopes(result.data);
            }
        })
        .catch(err=>console.log(err))
      }
    },[]);

    useEffect(()=>{
      if(scopeList !== null && scopeList !== undefined){
        let scopeListItem:string[] = [];
        scopeList.forEach(i=> scopeListItem.push(i.scope));
        setSelectedScopes(scopeListItem)
        setClientId(clientId)
      }
    },[scopeList,clientId]);

    const saveScopes = () => {
      //alert(selectedScopes);
      
      saveClientAllowedScope({
        variables:{
          clientId:clientIdState,
          scopes: selectedScopes
        }
      }).then((res)=>{
        if(res !== null){
          alert('success save scopes')
        }
      }).catch(err => console.log(err));

    }
    
  return (
    <React.Fragment>
      <Card title="Allowed Scopes">
        <div className='formgrid grid p-fluid'>
          <div className='field col-6 p-3'>
            <MultiSelect value={selectedScopes}
              options={getAllowedScopes}
              onChange={(e) => setSelectedScopes(e.value)}
              optionLabel="label"
              optionValue="value"
              placeholder="Select Scope Types"
              display="chip" />
          </div>
          <div className='col-4 p-3'>
            <Button label='Save Scopes' className='p-button-rounded' onClick={()=> saveScopes()}/>
          </div>
        </div>
      </Card>
    </React.Fragment>
  )
}