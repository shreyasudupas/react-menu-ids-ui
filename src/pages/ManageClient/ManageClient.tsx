import { useFormik } from 'formik';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Checkbox } from 'primereact/checkbox';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import React, { useEffect, useReducer } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { ClientAllowedCorsOrigin } from '../../components/ClientInformation/ClientAllowedCorsOrigin';
import { ClientAllowedScopes } from '../../components/ClientInformation/ClientAllowedScopes';
import { ClientGrantType } from '../../components/ClientInformation/ClientGrantType';
import { ClientPostLogoutRedirectUrl } from '../../components/ClientInformation/ClientPostLogoutRedirectUrl';
import { ClientRedirectUrlComponent } from '../../components/ClientInformation/ClientRedirectUrlComponent';
import { ClientSecretComponent } from '../../components/ClientInformation/ClientSecretComponent';
import { useGetClientById } from '../../graphQL/query/useGetClientById';
import { ClientInformationModel, ManageClientAction, ManageClientState } from './ManageClientType';

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
    const formik = useFormik<ClientInformationModel>({
        initialValues:{
            id:state.client.id,
            clientId:state.client.clientId,
            clientName:state.client.clientName,
            accessTokenLifetime:state.client.accessTokenLifetime,
            description:state.client.description,
            createdDate:state.client.createdDate,
            enabled:state.client.enabled,
            requireConsent:state.client.requireConsent,
            requirePkce: state.client.requirePkce
        },
        validate:(data) => {
            let errors:any = {};

            if(!data.clientId){
                errors.clientId ="Require Client Id";
            }

            if(!data.clientName){
                errors.clientName= "Require Client Name";
            }

            if(!data.accessTokenLifetime){
                errors.accessTokenLifetime = "Require Access Token";
            }

            return errors;
        },
        onSubmit: (data) => {
            debugger
            alert(data);
        },
        enableReinitialize:true,
    });

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

    },[data,clientId]);

    const isFormFieldValid = (name:any) => !!(formik.touched[name as keyof ClientInformationModel] && formik.errors[name as keyof ClientInformationModel]);

    // const getFormErrorMessage = (name:any) => {
    //     return isFormFieldValid(name) && <small className="p-error">{formik.errors[name as keyof ClientInformationModel]}</small>;
    // };

    return (
        <React.Fragment>
            <div className='p-3'>
                <Card title={state.header}>
                    <form onSubmit={formik.handleSubmit}>
                        <div className='formgrid grid p-fluid'>
                            <div className='field col-12 p-3'>
                                <span className="p-float-label">
                                    <InputText id="clientId"
                                        value={formik.values.clientId} 
                                        onChange={formik.handleChange}
                                        className={classNames({ 'p-invalid': isFormFieldValid('clientId') })}
                                        />
                                    <label htmlFor="clientId" className={classNames({ 'p-error': isFormFieldValid('clientId') })}>Client Id</label>
                                    {/* {getFormErrorMessage('clientId')} */}
                                </span>
                            </div>
                            <div className='field col-12 p-3'>
                                <span className="p-float-label">
                                    <InputText id="clientName" 
                                        value={formik.values.clientName} 
                                        onChange={formik.handleChange}
                                        className={classNames({ 'p-invalid': isFormFieldValid('clientName') })}
                                        />
                                    <label htmlFor="clientName">Client Name</label>
                                </span>
                            </div>
                            <div className='field col-12 p-3'>
                                <span className="p-float-label">
                                    <InputText id="description" 
                                        value={formik.values.description} 
                                        onChange={formik.handleChange}
                                        className={classNames({ 'p-invalid': isFormFieldValid('description') })}
                                        />
                                    <label htmlFor="description">Description</label>
                                </span>
                            </div>
                            <div className='field col-12 p-3'>
                                <span className="p-float-label">
                                    <InputNumber id="accessTokenLifetime" 
                                        value={formik.values.accessTokenLifetime} 
                                        onChange={formik.handleChange}
                                        className={classNames({ 'p-invalid': isFormFieldValid('accessTokenLifetime') })}
                                        />
                                    <label htmlFor="accessTokenLifetime">Access Token Lifetime</label>
                                </span>
                            </div>
                            <div className='field col-12 p-3'>
                                <span className="p-float-label">
                                    <InputText id="createdDate" 
                                        value={formik.values.createdDate.toString()} 
                                        disabled />
                                    <label htmlFor="createdDate">Created Date</label>
                                </span>
                            </div>
                            <div className='field-checkbox col-4 p-2'>
                                <Checkbox inputId="requireConsent" 
                                    name="requireConsent"
                                    checked={formik.values.requireConsent}
                                    onChange={formik.handleChange}></Checkbox>
                                <label htmlFor="requireConsent" className="p-checkbox-label"> Require Consent</label>
                            </div>
                            <div className='field-checkbox col-4 p-2'>
                                <Checkbox inputId="requirePkce"
                                 name="requirePkce"
                                 checked={formik.values.requirePkce}
                                 onChange={formik.handleChange}></Checkbox>
                                <label htmlFor="requirePkce" className="p-checkbox-label"> Require PKCE</label>
                            </div>
                            <div className='col-12 p-2'>
                                <Button type='submit' label="Save" className="p-button-rounded" />
                            </div>
                            <div className='col-12 p-2'>
                                <Button label="Back" className="p-button-rounded p-button-secondary" onClick={() => navigate('/operation/clients')} />
                            </div>
                        </div>
                    </form>

                </Card>
            </div>
            <div className='p-3'>
                <ClientAllowedScopes clientId={state.clientId} scopeList={state.client.allowedScopes} />
            </div>
            <div className='p-3'>
                <ClientGrantType clientId={state.clientId} grantValue={state.client.allowedGrantType} />
            </div>
            <div className='p-3'>
                <ClientSecretComponent key={state.clientId} clientSecret={state.client.clientSecrets} />
            </div>

            <div className='p-3'>
                <ClientAllowedCorsOrigin allowedCorsOrigins={state.client.allowedCorsOrigins} />
            </div>

            <div className='p-3'>
                <ClientRedirectUrlComponent key={state.clientId} redirectUrls={state.client.redirectUris} />
            </div>
            <div className='p-3'>
                <ClientPostLogoutRedirectUrl postLogoutRedirectUrl={state.client.postLogoutRedirectUris} />
            </div>


        </React.Fragment>
    )
}