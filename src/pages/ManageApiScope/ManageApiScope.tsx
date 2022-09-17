import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import React, { useEffect, useReducer } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAddApiScope } from '../../graphQL/mutation/useAddApiScope';
import { useGetApiScopeById } from '../../graphQL/query/useGetApiScopeById';
import { ApiScopeData } from '../ApiScopes/ApiScopeType';
import { ManageApiScopeAction, ManageApiScopeState } from './ManageApiScopeType';
import { useFormik } from 'formik';
import { classNames } from 'primereact/utils';
import { useSaveApiScope } from '../../graphQL/mutation/useSaveApiScope';

const initialState:ManageApiScopeState = {
    apiScope: {id:0,name:'',description:'',displayName:''},
    header:"Add ApiScope",
    apiScopeId:0
}

const reducer = (state:ManageApiScopeState,action:ManageApiScopeAction) : ManageApiScopeState => {
    switch(action.type){
        case 'ADD_APISCOPE':
            return {
                 ...state,
                 apiScope:action.apiScope
            }
        case 'UPDATE_APISCOPE':
            return {
                ...state,
                apiScope: { ...state.apiScope, [action.field]:action.value }
            }
        case 'UPDATE_HEADER':
            return {
                ...state,
                header:action.header
            }
        case 'UPDATE_SCOPEID':
            return {
                ...state,
                apiScopeId:action.scopeId
            }
    }
}

export const ManageApiScope = () => {
    const [state,dispatch] = useReducer(reducer,initialState);
    const { apiScopeId } = useParams();
    const { data } = useGetApiScopeById(state.apiScopeId);
    const navigate = useNavigate();
    const [ addApiScope ] = useAddApiScope();
    const [ saveApiScope  ] = useSaveApiScope();
    
    const formik = useFormik<ApiScopeData>({
        initialValues: {
            id:state.apiScope.id,
            description: state.apiScope.description,
            displayName:state.apiScope.displayName,
            name:state.apiScope.name
        },
        validate: (data) => {
            let errors:any = {};

            if (!data.name) {
                errors.name = 'Name is required.';
            }


            if (!data.displayName) {
                errors.displayName = 'Display name is required.';
            }
            return errors;
        },
        onSubmit: (data) => {

            //alert(JSON.stringify(data))
            if(state.apiScopeId === 0)
            {
                addApiScope({
                    variables: {
                        newScope: {
                            id: data.id,
                            name: data.name,
                            description: data.description,
                            displayName: data.displayName
                        }
                    }
                }).then((res) => {
                    console.log('Item added')
                    formik.resetForm();
                }).catch(err => console.log(err))
            }else
            {
                //alert('save clicked');
                saveApiScope({
                    variables:{
                        saveScope:{
                            id:data.id,
                            name: data.name,
                            description: data.description,
                            displayName: data.displayName
                        }
                    }
                }).then((res)=>{
                    console.log('Item saved')
                }).catch(err => console.log(err))
            }
            
        },
        enableReinitialize: true
    });

    useEffect(()=>{

        if(apiScopeId !== undefined){
            let id = parseInt(apiScopeId);
            dispatch({ type:'UPDATE_SCOPEID', scopeId: id })
        }

        if(data !== undefined){
            if(data.apiScopeById !== null){
                dispatch({ type:'ADD_APISCOPE' , apiScope: data.apiScopeById })
                dispatch({ type:'UPDATE_HEADER', header:'Edit ApiScope' })
            }
        }
    },[data,apiScopeId])

    const callApiScopeList = () => {
        navigate('/operation/apiscope')
    }

    const isFormFieldValid = (name:any) => !!(formik.touched[name as keyof ApiScopeData] && formik.errors[name as keyof ApiScopeData]);

    const getFormErrorMessage = (name:any) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name as keyof ApiScopeData]}</small>;
    };

    return (
        <React.Fragment>
            <Card title={state.header}>
                <form onSubmit={formik.handleSubmit} className="p-fluid">
                    <div className='formgrid grid p-fluid'>
                        <div className='col-6'>
                            <div className='field col-12 p-3'>
                                <span className="p-float-label">
                                    <InputText
                                        id="name"
                                        name="name"
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        className={classNames({ 'p-invalid': isFormFieldValid('name') })}
                                    />
                                    <label htmlFor="name" className={classNames({ 'p-error': isFormFieldValid('name') })}>Name*</label>
                                    {getFormErrorMessage('name')}
                                </span>
                            </div>
                            <div className='field col-12 p-3'>
                                <span className="p-float-label">
                                    <InputText
                                        id="displayName"
                                        name="displayName"
                                        value={formik.values.displayName}
                                        onChange={formik.handleChange}
                                        className={classNames({ 'p-invalid': isFormFieldValid('name') })}
                                    />
                                    <label htmlFor="displayName" className={classNames({ 'p-error': isFormFieldValid('displayName') })}>Display Name</label>
                                    {getFormErrorMessage('displayName')}
                                </span>
                            </div>
                            <div className='field col-12 p-3'>
                                <span className="p-float-label">
                                    <InputText
                                        id="description"
                                        name="description"
                                        value={formik.values.description}
                                        onChange={formik.handleChange}
                                        placeholder="Description" />
                                    <label htmlFor="description">Description</label>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className='grid'>
                        <div className='col-6'>
                            <div className='col-12'>
                                <Button type="submit" label="Submit" className="mt-2" />
                            </div>
                            <div className='col-12'>
                                <Button label="Cancel" className="p-button-secondary ml-2" onClick={() => callApiScopeList()} />
                            </div>
                        </div>
                    </div>
                </form>

            </Card>
        </React.Fragment>
    )
}
