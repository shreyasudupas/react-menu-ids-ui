import axios from 'axios'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { Column } from 'primereact/column'
import { confirmDialog, ConfirmDialog } from 'primereact/confirmdialog'
import { DataTable } from 'primereact/datatable'
import { Dropdown } from 'primereact/dropdown'
import React, { useEffect, useReducer } from 'react'
import { ApiResourceScope as ApiResourceScopeModel } from '../../pages/ManageApiResource/ApiResourceScope'
import { DropdownModel } from '../user/UserAddressTypes'
import { ApiResourceScopeAction, ApiResourceScopeState } from './ApiResourceScopeModel'

const inititalState: ApiResourceScopeState = {
    allowedScopeList:[],
    seletedScope:'',
    apiResourceScopeList:[],
    apiResourceId:0
}

const GETALLOWEDSCOPELIST:string = "https://localhost:5006/api/utility/getAllowedScopes";
const ADD_ALLOWED_SCOPE:string = "https://localhost:5006/api/utility/addApiResourceScope";
const DELETE_ALLOWED_SCOPE:string = "https://localhost:5006/api/utility/deleteApiResourceScope";

const reducer = (state:ApiResourceScopeState,action:ApiResourceScopeAction):ApiResourceScopeState => {
    switch (action.type) {
        case 'UPDATE_ALLOWEDSCOPE_LIST':
            return {
                ...state,
                allowedScopeList: action.scopeList
            };
        case 'UPDATE_SELECTED_SCOPE':
            return {
                ...state,
                seletedScope: action.value
            };
        case 'UPDATE_APIRESOURCE_SCOPE_LIST':
            return {
                ...state,
                apiResourceScopeList: action.list
            }
        case 'UPDATE_APIRESOURCE_ID':
            return {
                ...state,
                apiResourceId: action.value
            };
        case 'ADD_APIRESOURCESCOPE':
            return {
                ...state,
                apiResourceScopeList: [...state.apiResourceScopeList, action.item]
            };
        case 'DELETE_APIRESOURCESCOPE':
            return {
                ...state,
                apiResourceScopeList: state.apiResourceScopeList.filter(a=>a.id != action.id)
            };
    }
}

type ApiResourceScopeType = {
    parentApiResourceId:number;
    parentAPiResourceScope:ApiResourceScopeModel[];
}

export const ApiResourceScope = ({ parentAPiResourceScope,parentApiResourceId }:ApiResourceScopeType) => {
    const [state,dispatch] = useReducer(reducer,inititalState);
    let storage = JSON.parse(sessionStorage.getItem(`oidc.user:${process.env.REACT_APP_AUTH_URL}:${process.env.REACT_APP_IDENTITY_CLIENT_ID}`)!);


    useEffect(()=>{
        if(state.allowedScopeList.length === 0){
          axios.get(GETALLOWEDSCOPELIST,{ headers: { "Authorization" : `Bearer ${storage["access_token"]}` } })
          .then((result)=>{
              if(result.data !== null){
                dispatch({ type:'UPDATE_ALLOWEDSCOPE_LIST', scopeList: result.data });
              }
          })
          .catch(err=>console.log(err))
          
        }
      },[]);

    useEffect(()=>{
        if(parentAPiResourceScope.length > 0){
            dispatch({ type:'UPDATE_APIRESOURCE_SCOPE_LIST', list: parentAPiResourceScope });
        }

        if(parentApiResourceId > 0){
            dispatch({ type:'UPDATE_APIRESOURCE_ID',value: parentApiResourceId });
        }
    },[parentAPiResourceScope,parentApiResourceId]);

      const deleteTemplate = (rowData:ApiResourceScopeModel) => {
        return <Button type="button" 
                icon="pi pi-users" 
                className="p-button-danger" 
                onClick={(e)=>confirmDelete(rowData)}
                ></Button>;
    }

    const reject = () => {
    }

    const confirmDelete = (rowData:ApiResourceScopeModel) => {
        confirmDialog({
            message: 'Are you sure you want to proceed to delete with record ' + rowData.scope + '?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => deleteApiResourceScope(rowData),
            reject
        });
    };

    const addApiResourceScope = (event:any) => {
        if(event.value !== "" || event.value !== undefined){
            //alert(state.seletedScope);
            let addApiScopeModel = { 
                scopeId: state.seletedScope,
                apiResourceId: state.apiResourceId
             };
             let headers  = {
                 "Authorization" : `Bearer ${storage["access_token"]}` 
                };
            axios.post(ADD_ALLOWED_SCOPE, addApiScopeModel,{ headers })
             .then((res)=>{
                if(res.data !==  null){
                    dispatch({ type:'ADD_APIRESOURCESCOPE',item: res.data });
                }else{
                    alert('Something went wrong in adding the resource in API');
                }
             })
             .catch(err=>console.log(err))

            dispatch({ type:'UPDATE_SELECTED_SCOPE',value:"" });
        }else{
            alert('Please select value');
        }
    }

    const deleteApiResourceScope = (rowData:ApiResourceScopeModel) => {
        //debugger
        let body = {
            scopeName: rowData.scope,
            apiResourceId: rowData.apiResourceId
        };
        let headers  = {
            "Authorization" : `Bearer ${storage["access_token"]}` 
        };

        axios.delete(DELETE_ALLOWED_SCOPE,{ data:body,headers: headers })
        .then((res)=>{
            let result = res.data;

            if(result === true){
                dispatch({ type:'DELETE_APIRESOURCESCOPE', id: rowData.id });
            }
        })
        .catch(err=> console.log(err))
    }
      
    return (
        <React.Fragment>
            <ConfirmDialog />
            <div className='p-3'>
                <div className='grid'>
                    <div className='col-12'>
                        <Card title={"Add Scopes"}>
                            <div className='grid'>
                                <div className='col-12'>
                                    <Dropdown value={state.seletedScope}
                                        options={state.allowedScopeList}
                                        onChange={(e) => dispatch({ type: 'UPDATE_SELECTED_SCOPE', value: e.value })}
                                        optionLabel="label"
                                        optionValue='value'
                                        placeholder="Select a Scoped Value" />
                                </div>
                                <div className='col-6'>
                                    <Button type='button'
                                        label='Add Scope'
                                        icon='pi pi-users'
                                        className='p-button-primary'
                                        onClick={(e) => addApiResourceScope(e)} />
                                </div>
                                <div className='col-12'>
                                    <DataTable value={state.apiResourceScopeList} responsiveLayout="scroll">
                                        <Column field="scope" header="Scope"></Column>
                                        <Column header="Delete" body={deleteTemplate}></Column>
                                    </DataTable>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}