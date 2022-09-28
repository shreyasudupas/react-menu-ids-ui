import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Dropdown } from 'primereact/dropdown';
import React, { useEffect, useState } from 'react'
import { useSaveClientAllowedGrantType } from '../../graphQL/mutation/useSaveClientAllowedGrantType';

type GrantTypeModel = {
    label:string;
    value:string;
}

type ClientGrantType = {
    clientId:number;
    grantValue:string[];
}

export const ClientGrantType = ( { grantValue,clientId }: ClientGrantType) => {
    const [ grantTypes, setGrantTypes ] = useState<GrantTypeModel[]>(
        [
            { label: 'Authorization Code', value:'authorization_code'},
            { label: 'Password', value:'password'},
            { label: 'Client Credentials', value:'client_credentials'}
        ]
    );
    const [ selectedGrant , setSelectedGrant] = useState<string>('');
    const [ clientIdFromParent ,setClientId ] = useState<number>(0);
    const [ saveGrantTypes ] = useSaveClientAllowedGrantType();

    useEffect(()=>{
        if(grantValue !== null && grantValue.length > 0){
            setSelectedGrant(grantValue[0]);
        }

        if(clientId !== null && clientId !== undefined){
            setClientId(clientId);
        }
    },[grantValue,clientId])

    const footerBody = () => {
        return (
            <Button label="Save GrantType" className="p-button-rounded" onClick={()=>saveGrantType()}/>
        )
    }

    const saveGrantType = () => {
        saveGrantTypes({
            variables:{
                clientId: clientIdFromParent,
                selectedGrantType: selectedGrant
            }
        }).then( result => {
            if(result.data?.saveAllowedGrantTypes !== null){
                alert('Saved GrantType')
            }
        }).catch(err => console.log(err))
    }

  return (
    <div>
        <Card title={"Grant Type"} footer={footerBody}>
            <Dropdown value={selectedGrant} 
                    options={grantTypes} 
                    onChange={(e)=> setSelectedGrant(e.value)} 
                    optionLabel="label"
                    optionValue="value"
                    placeholder="Select a Grant Type" />    
        </Card>
        
    </div>
  )
}