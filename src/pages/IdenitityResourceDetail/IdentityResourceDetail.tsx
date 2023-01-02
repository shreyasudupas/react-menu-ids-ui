import { useFormik } from 'formik';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Checkbox } from 'primereact/checkbox';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import React, { useEffect, useReducer } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useIdentityResourceById } from '../../graphQL/query/useIdentityResourceById';
import { IdentityResource } from './IdentityResource';
import { IdentityResourceAction, IdentityResourceState } from './StateModel';

const intitialValue: IdentityResourceState = {
    identityResourceId:0,
    resource: { id:0,enabled:false,created:'',description:'',displayName:'',emphasize:false,name:'',required:false,
        nonEditable:false,showInDiscoveryDocument:false,updated:null },
    header:''
}

const reducer = (state:IdentityResourceState,action:IdentityResourceAction):IdentityResourceState => {
    switch(action.type){
        case 'UPDATE_RESOURCE_ID':
            return {
                ...state,
                identityResourceId: action.value
            };
        case 'UPDATE_RESOURCE_VALUE':
            return {
                ...state,
                resource: action.item
            };
        case 'UPDATE_CARD_TITLE':
            return {
                ...state,
                header: action.title
            }
    }
}

export const IdentityResourceDetail = () => {
    const [state,dispatch] = useReducer(reducer,intitialValue);
    const { identityResourceId } = useParams();
    const { data } = useIdentityResourceById(state.identityResourceId);
    const navigate = useNavigate();

    useEffect(()=>{
        //debugger;
        if(identityResourceId !== undefined){
            if(identityResourceId !== "0"){
                dispatch({ type:'UPDATE_RESOURCE_ID',value: parseInt(identityResourceId) });

                dispatch({ type:'UPDATE_CARD_TITLE',title:'Edit Identity Resource' })
            }else{
                dispatch({ type:'UPDATE_CARD_TITLE',title:'Add Identity Resource' })
            }
            
        }
    },[identityResourceId])

    useEffect(()=>{
        //debugger
        if(data !== undefined){
            if(data.identityResourceById !== null){
                dispatch({ type:'UPDATE_RESOURCE_VALUE',item: data.identityResourceById })
            }
        }
    },[data])

    console.log(state);

    const identityResourceForm = useFormik<IdentityResource>({
        initialValues:{
            id: state.resource.id,
            enabled: state.resource.enabled,
            name: state.resource.name,
            displayName: state.resource.displayName,
            emphasize: state.resource.emphasize,
            required: state.resource.required,
            description: state.resource.description,
            created: state.resource.created,
            nonEditable: state.resource.nonEditable,
            showInDiscoveryDocument: state.resource.showInDiscoveryDocument,
            updated: state.resource.updated
        },
        validate: (data) => {
            let errors : any = {};

            if(!data.name)
                errors.name = "Name is required";

            if(!data.displayName)
                errors.displayName = "Display Name is required";

            return errors;
        },
        onSubmit: (data) => {

        },
        enableReinitialize: true
    });

    const isFormFieldValid = (name: any) => !!(identityResourceForm.touched[name as keyof IdentityResource] && identityResourceForm.errors[name as keyof IdentityResource]);

    const getFormErrorMessage = (name: any) => {
        return isFormFieldValid(name) && <small className="p-error">{identityResourceForm.errors[name as keyof IdentityResource]}</small>;
    };

    const Back = () => {
        navigate('/operation/identityResourceList');
    }
 
  return (
    <React.Fragment>
        <Card title={state.header}>
        <form onSubmit={identityResourceForm.handleSubmit} className='p-fluid'>
                    <div className='grid p-fluid'>
                        <div className='col-12'>
                            <span className="p-float-label field">
                                <InputText id="name"
                                    name="name"
                                    value={identityResourceForm.values.name}
                                    onChange={identityResourceForm.handleChange} />
                                <label htmlFor="name" className={classNames({ 'p-error': isFormFieldValid('name') })}>Name</label>
                                {getFormErrorMessage('name')}
                            </span>
                        </div>
                        <div className='col-12'>
                            <span className="p-float-label field">
                                <InputText id="displayName"
                                    name="displayName"
                                    value={identityResourceForm.values.displayName ?? ""}
                                    onChange={identityResourceForm.handleChange} />
                                <label htmlFor="displayName" className={classNames({ 'p-error': isFormFieldValid('displayName') })}>Display Name</label>
                                {getFormErrorMessage('displayName')}
                            </span>
                        </div>
                        <div className='col-12'>
                            <span className="p-float-label field">
                                <InputText id="description"
                                    name="description"
                                    value={identityResourceForm.values.description ?? ''}
                                    onChange={identityResourceForm.handleChange} />
                                <label htmlFor="description">Description</label>
                            </span>
                        </div>
                        <div className='col-12'>
                            <div className="field-radiobutton field">
                                <Checkbox inputId="required"
                                    name="required"
                                    checked={identityResourceForm.values.enabled}
                                    onChange={identityResourceForm.handleChange}
                                />
                                <label htmlFor="required">Required</label>
                            </div>
                        </div>
                        <div className='col-12'>
                            <div className="field-radiobutton field">
                                <Checkbox inputId="emphasize"
                                    name="emphasize"
                                    checked={identityResourceForm.values.enabled}
                                    onChange={identityResourceForm.handleChange}
                                />
                                <label htmlFor="emphasize">Emphasize</label>
                            </div>
                        </div>
                        <div className='col-12'>
                            <div className="field-radiobutton field">
                                <Checkbox inputId="showInDiscoveryDocument"
                                    name="showInDiscoveryDocument"
                                    checked={identityResourceForm.values.showInDiscoveryDocument}
                                    onChange={identityResourceForm.handleChange} />
                                <label htmlFor="showInDiscoveryDocument">Show In Discovery Document</label>
                            </div>
                        </div>
                        <div className='col-12'>
                            <div className="field-radiobutton field">
                                <Checkbox inputId="nonEditable"
                                    name="nonEditable"
                                    checked={identityResourceForm.values.nonEditable}
                                    onChange={identityResourceForm.handleChange} />
                                <label htmlFor="nonEditable">Non Editable</label>
                            </div>
                        </div>
                        <div className='col-12'>
                            <Button className="p-button-rounded" label='Save' />
                        </div>
                    </div>
                </form>
                <div className='grid p-fluid'>
                    <div className='col-12'>
                        <Button className="p-button-rounded p-button-secondary" label='Back' onClick={() => Back()} />
                    </div>
                </div>
        </Card>
    </React.Fragment>
  )
}