import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import React, { useEffect, useReducer } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from 'primereact/button';
import { ApiResourceAction, ApiResourceState } from './ApiResourceState';
import { useGetApiResourceById } from '../../graphQL/query/useGetApiResourceById';
import { useFormik } from 'formik';
import { ApiResource } from './ApiResource';
import { Checkbox } from 'primereact/checkbox';
import { classNames } from 'primereact/utils';
import { useAddApiResource } from '../../graphQL/mutation/useAddApiResource';
import { ApiResourceScope } from '../../components/ApiResources/ApiResourceScope';

const initialState: ApiResourceState = {
    apiResourceId: 0,
    header: '',
    apiResource: {
        id: 0, allowedAccessTokenSigningAlgorithms: '', created: '', description: '', displayName: '', enabled: true,
        lastAccessed: '', name: '', nonEditable: false, updated: null, showInDiscoveryDocument: false,scopes:[]
    }
}

const reducer = (state: ApiResourceState, action: ApiResourceAction): ApiResourceState => {
    switch (action.type) {
        case 'UPDATE-HEADER':
            return {
                ...state,
                header: action.header
            };
        case 'UPDATE-APIRESOURCE':
            return {
                ...state,
                apiResource: action.value
            };
        case 'UPDATE-ID':
            let id = parseInt(action.value);
            return {
                ...state,
                apiResourceId: id
            };
    }
}



export const ManageApiResource = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { apiResourceId } = useParams();
    const { data } = useGetApiResourceById(state.apiResourceId);
    const navigate = useNavigate();
    const [addApiResoure] = useAddApiResource();

    useEffect(() => {
        if (apiResourceId !== undefined)
            if (apiResourceId === "0") {
                dispatch({ type: 'UPDATE-HEADER', header: 'Add Manage API Resource' });
            } else {
                dispatch({ type: 'UPDATE-HEADER', header: 'Edit Manage API Resource' });

                dispatch({ type: 'UPDATE-ID', value: apiResourceId });
            }
    }, [apiResourceId])

    useEffect(() => {
        if (data !== undefined) {
            if (data.apiResourcesById != null) {
                dispatch({ type: 'UPDATE-APIRESOURCE', value: data.apiResourcesById });
            }
        }
    }, [data])

    const Back = () => {
        navigate('/operation/apiResourceList');
    }

    const formik = useFormik<ApiResource>({
        initialValues: {
            id: state.apiResource.id,
            name: state.apiResource.name,
            displayName: state.apiResource.displayName,
            description: state.apiResource.description,
            allowedAccessTokenSigningAlgorithms: state.apiResource.allowedAccessTokenSigningAlgorithms,
            created: state.apiResource.created,
            lastAccessed: state.apiResource.lastAccessed,
            enabled: state.apiResource.enabled,
            nonEditable: state.apiResource.nonEditable,
            showInDiscoveryDocument: state.apiResource.showInDiscoveryDocument,
            updated: state.apiResource.updated,
            scopes: state.apiResource.scopes
        },
        validate: (data) => {
            let errors: any = {};

            if (!data.name) {
                errors.name = "Name is Required";
            }

            if (!data.displayName) {
                errors.displayName = "Display Name is Required";
            }

            return errors;
        },
        onSubmit: (data) => {
            //let createdDate = moment(data.created).format('MM/DD/YYYY h:mm:ss');

            //console.log(data)
            addApiResoure({
                variables: {
                    addModel: {
                        id: data.id,
                        name: data.name,
                        displayName: data.displayName,
                        description: data.description,
                        allowedAccessTokenSigningAlgorithms: data.allowedAccessTokenSigningAlgorithms,
                        created: data.created,
                        lastAccessed: data.lastAccessed,
                        enabled: data.enabled,
                        nonEditable: data.nonEditable,
                        showInDiscoveryDocument: data.showInDiscoveryDocument,
                        updated: data.updated,
                        scopes: data.scopes
                    }
                }
            }).then((result) => {
                let res = result.data?.addApiResource;

                if (res !== undefined) {
                    if (res.id > 0) {
                        formik.resetForm();
                        navigate('/operation/apiResourceList');
                    } else {
                        console.log('Error Saving form')
                    }
                }
            })
                .catch(err => console.log(err))
        },
        enableReinitialize: true,
    });

    const isFormFieldValid = (name: any) => !!(formik.touched[name as keyof ApiResource] && formik.errors[name as keyof ApiResource]);

    //console.log(state)

    // const getFormErrorMessage = (name: any) => {
    //     return isFormFieldValid(name) && <small className="p-error">{formik.errors[name as keyof ApiResource]}</small>;
    // };

    return (
        <div>
            <Card title={state.header}>
                <form onSubmit={formik.handleSubmit} className='p-fluid'>
                    <div className='grid p-fluid'>
                        <div className='col-12'>
                            <span className="p-float-label field">
                                <InputText id="name"
                                    name="name"
                                    value={formik.values.name}
                                    onChange={formik.handleChange} />
                                <label htmlFor="name" className={classNames({ 'p-error': isFormFieldValid('name') })}>Name</label>
                                {isFormFieldValid('name') && <small className="p-error">{formik.errors['name']}</small>}
                            </span>
                        </div>
                        <div className='col-12'>
                            <span className="p-float-label field">
                                <InputText id="displayName"
                                    name="displayName"
                                    value={formik.values.displayName ?? ""}
                                    onChange={formik.handleChange} />
                                <label htmlFor="displayName" className={classNames({ 'p-error': isFormFieldValid('displayName') })}>Display Name</label>
                                {isFormFieldValid('displayName') && <small className="p-error">{formik.errors['displayName']}</small>}
                            </span>
                        </div>
                        <div className='col-12'>
                            <span className="p-float-label field">
                                <InputText id="description"
                                    name="description"
                                    value={formik.values.description ?? ''}
                                    onChange={formik.handleChange} />
                                <label htmlFor="description">Description</label>
                            </span>
                        </div>
                        <div className='col-12 field'>
                            <span className="p-float-label field">
                                <InputText id="signingAlogo"
                                    name="allowedAccessTokenSigningAlgorithms"
                                    value={formik.values.allowedAccessTokenSigningAlgorithms ?? ''}
                                    onChange={formik.handleChange} />
                                <label htmlFor="signingAlogo">Allowed Access Token Signing Algorithms</label>
                            </span>
                        </div>
                        <div className='col-12'>
                            <div className="field-radiobutton field">
                                <Checkbox inputId="enable"
                                    name="enable"
                                    checked={formik.values.enabled}
                                    onChange={formik.handleChange}
                                />
                                <label htmlFor="enable">Enabled</label>
                            </div>
                        </div>
                        <div className='col-12'>
                            <div className="field-radiobutton field">
                                <Checkbox inputId="showInDiscoveryDocument"
                                    name="showInDiscoveryDocument"
                                    checked={formik.values.showInDiscoveryDocument}
                                    onChange={formik.handleChange} />
                                <label htmlFor="showInDiscoveryDocument">Show In Discovery Document</label>
                            </div>
                        </div>
                        <div className='col-12'>
                            <div className="field-radiobutton field">
                                <Checkbox inputId="nonEditable"
                                    name="nonEditable"
                                    checked={formik.values.nonEditable}
                                    onChange={formik.handleChange} />
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

            {state.apiResourceId > 0 ?
                <ApiResourceScope parentAPiResourceScope={state.apiResource.scopes} parentApiResourceId={state.apiResourceId}/>
                : <React.Fragment></React.Fragment>}
            

        </div>
    )
}