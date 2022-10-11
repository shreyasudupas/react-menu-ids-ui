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
import { useSaveClientBasicInformation } from '../../graphQL/mutation/useSaveClientBasicInformation';
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
            let clientInfo = action.newclient;
            return {
                ...state,
                client: {
                    id:clientInfo.id,clientId:clientInfo.clientId,clientName:clientInfo.clientName??'',description:clientInfo.description??'',
                    accessTokenLifetime:clientInfo.accessTokenLifetime,createdDate:clientInfo.createdDate,enabled:clientInfo.enabled,
                    requireConsent: clientInfo.requireConsent, requirePkce:clientInfo.requirePkce,allowedScopes:clientInfo.allowedScopes??[],allowedGrantType:
                    clientInfo.allowedGrantType??[],clientSecrets:clientInfo.clientSecrets??[],allowedCorsOrigins:clientInfo.allowedCorsOrigins??[],
                    redirectUris:clientInfo.redirectUris??[],postLogoutRedirectUris:clientInfo.postLogoutRedirectUris??[]
                }
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
    const [ SaveClientBasic ] = useSaveClientBasicInformation();
    const formik = useFormik<ClientInformationModel>({
        initialValues:{
            id:state.client.id,
            clientId:state.client.clientId,
            clientName:state.client.clientName,
            accessTokenLifetime:state.client.accessTokenLifetime,
            description:state.client.description,
            createdDate:state.client.createdDate.toString(),
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
            // debugger
            // alert(data);
            SaveClientBasic({
                variables:{
                    clientBasic:{
                        clientId:data.clientId,
                        id:data.id,
                        clientName:data.clientName,
                        accessTokenLifetime:data.accessTokenLifetime,
                        createdDate:data.createdDate,
                        description:data.description,
                        enabled:data.enabled,
                        requireConsent:data.requireConsent,
                        requirePkce:data.requirePkce
                    }
                }
            }).then((res)=>{
                console.log('Saved Client')
            }).catch(err=>console.log(err));

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

    //console.log(state)

    // const getFormErrorMessage = (name:any) => {
    //     return isFormFieldValid(name) && <small className="p-error">{formik.errors[name as keyof ClientInformationModel]}</small>;
    // };

    return (
        <React.Fragment>
            <div className='p-3'>
                <Card title={state.header}>
                    <form onSubmit={formik.handleSubmit} className="p-fluid">
                        <div className='formgrid grid p-fluid'>
                            <div className='field col-12 p-3'>
                                <span className="p-float-label">
                                    <InputText id="clientId"
                                        value={formik.values.clientId} 
                                        onChange={formik.handleChange}
                                        className={classNames({ 'p-invalid': isFormFieldValid('clientId') })}
                                        />
                                    <label htmlFor="clientId" className={classNames({ 'p-error': isFormFieldValid('clientId') })}>Client Id</label>
                                    {isFormFieldValid("clientId") && <small className="p-error">{formik.errors["clientId"]}</small>}
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
                <ClientSecretComponent key={state.clientId} clientId={state.clientId} clientSecret={state.client.clientSecrets} />
            </div>

            <div className='p-3'>
                <ClientAllowedCorsOrigin clientId={state.clientId} allowedCorsOrigins={state.client.allowedCorsOrigins} />
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