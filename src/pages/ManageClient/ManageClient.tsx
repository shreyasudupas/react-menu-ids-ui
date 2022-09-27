import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Checkbox } from 'primereact/checkbox';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import React, { useEffect, useReducer } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { ClientAllowedCorsOrigin } from '../../components/ClientInformation/ClientAllowedCorsOrigin';
import { ClientAllowedScopes } from '../../components/ClientInformation/ClientAllowedScopes';
import { ClientPostLogoutRedirectUrl } from '../../components/ClientInformation/ClientPostLogoutRedirectUrl';
import { ClientRedirectUrlComponent } from '../../components/ClientInformation/ClientRedirectUrlComponent';
import { ClientSecretComponent } from '../../components/ClientInformation/ClientSecretComponent';
import { useGetClientById } from '../../graphQL/query/useGetClientById';
import { Client } from '../ClientDisplayList/ClientDisplayTypes';
import { ManageClientAction, ManageClientState } from './ManageClientType';

const initialState:ManageClientState = {
    header:"Add Client Information",
    clientId:0,
    client: {
        id:0,clientId:'',clientName:'',description:'',createdDate:new Date(),enabled:false,requireConsent:false,requirePkce:false,
        allowedScopes:[],allowedGrantType:[],clientSecrets:[],allowedCorsOrigins:[],accessTokenLifetime:0,redirectUris:[],postLogoutRedirectUris:[]
    }
}

const reducer = (state:ManageClientState,action:ManageClientAction):ManageClientState => {
    switch(action.type){
        case 'UPDATE_HEADER':
            return {
                ...state,
                header: action.header
            }
        case 'ADD_CLIENT':
            return {
                ...state,
                client: action.newclient
            }
        case 'MODIFY_CLIENTID':
            return {
                ...state,
                clientId: action.id
            }
    }
}

export const ManageClient = () => {
    const [state,dispatch] = useReducer(reducer,initialState);
    const { clientId } = useParams();
    const { data } = useGetClientById(state.clientId);
    const navigate = useNavigate();

    useEffect(()=>{

        if(clientId !== undefined){
            dispatch({type:'UPDATE_HEADER',header:'Edit Client Information'})
            dispatch({type:'MODIFY_CLIENTID',id:parseInt(clientId)})
        }

        if(data !== undefined){
            if(data !== null){
                dispatch({type:"ADD_CLIENT",newclient:data.clientById})
            }
        }

    },[data,clientId])

    return (
        <React.Fragment>
            <div className='p-3'>
            <Card title={state.header}>
                <div className='formgrid grid p-fluid'>
                    <div className='field col-12 p-3'>
                        <span className="p-float-label">
                            <InputText id="clientId" value={state.client.clientId} />
                            <label htmlFor="clientId">Client Id</label>
                        </span>
                    </div>
                    <div className='field col-12 p-3'>
                        <span className="p-float-label">
                            <InputText id="clientName" value={state.client.clientName} />
                            <label htmlFor="clientName">Client Name</label>
                        </span>
                    </div>
                    <div className='field col-12 p-3'>
                        <span className="p-float-label">
                            <InputText id="description" value={state.client.description} />
                            <label htmlFor="description">Description</label>
                        </span>
                    </div>
                    <div className='field col-12 p-3'>
                        <span className="p-float-label">
                            <InputNumber id="accessTokenLifetime" value={state.client.accessTokenLifetime} />
                            <label htmlFor="accessTokenLifetime">Access Token Lifetime</label>
                        </span>
                    </div>
                    <div className='field col-12 p-3'>
                        <span className="p-float-label">
                            <InputText id="createdDate" value={state.client.createdDate.toString()} disabled/>
                            <label htmlFor="createdDate">Created Date</label>
                        </span>
                    </div>
                    <div className='field col-4 p-2'>
                        <Checkbox inputId="requireConsent" value={state.client.requireConsent} checked={state.client.requireConsent}></Checkbox>
                        <label htmlFor="requireConsent" className="p-checkbox-label"> Require Consent</label>
                    </div>
                    <div className='field col-4 p-2'>
                        <Checkbox inputId="requirePkce" value={state.client.requirePkce} checked={state.client.requirePkce}></Checkbox>
                        <label htmlFor="requirePkce" className="p-checkbox-label"> Require PKCE</label>
                    </div>
                    <div className='col-12 p-2'>
                        <Button label="Save" className="p-button-rounded" />
                    </div>
                    <div className='col-12 p-2'>
                        <Button label="Back" className="p-button-rounded p-button-secondary" onClick={()=> navigate('/operation/clients')}/>
                    </div>
                </div>
            </Card>
            </div>
            <div className='p-3'>
                <ClientAllowedScopes clientId={state.clientId} scopeList={state.client.allowedScopes}/>
            </div>
            <div className='p-3'>
                <ClientSecretComponent key={state.clientId} clientSecret={state.client.clientSecrets}/>
            </div>

            <div className='p-3'>
                <ClientAllowedCorsOrigin allowedCorsOrigins={state.client.allowedCorsOrigins}/>
            </div>

            <div className='p-3'>
                <ClientRedirectUrlComponent key={state.clientId} redirectUrls={state.client.redirectUris}/>
            </div>
            <div className='p-3'>
                <ClientPostLogoutRedirectUrl postLogoutRedirectUrl={state.client.postLogoutRedirectUris}/>
            </div>
            
            
        </React.Fragment>
    )
}