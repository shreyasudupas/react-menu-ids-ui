import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Toolbar } from 'primereact/toolbar';
import React from 'react';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDeleteApiScope } from '../../graphQL/mutation/useDeleteApiScope';
import { useGetApiScopes } from '../../graphQL/query/useGetApiScopes';
import { ApiScopeData } from './ApiScopeType';

export const ApiScopes = () => {

    const [ apiScopes,setApiScopes] = useState<ApiScopeData[]>([]);
    const navigate = useNavigate();
    const { data } = useGetApiScopes();
    const [ deleteApiScopeData ] = useDeleteApiScope()

    useEffect(()=>{

        if(data !== undefined){
            setApiScopes(data.apiScopes)
        }
    },[data])


    const header = (
        <div className="table-header">
            API Scopes List
        </div>
    );

    const editBodyTemplate = (rowdata:ApiScopeData) => {
        return  <Button icon="pi pi-user-edit"
         className="p-button-rounded p-button-primary" 
         aria-label="Bookmark" 
         onClick={(e)=> { callManageApiScope(rowdata.id) }}/>
    }

    const DeleteBodyTemplate = (rowdata:ApiScopeData) => {
        return <Button
        icon="pi pi-user-edit"
         className="p-button-rounded p-button-danger" 
         aria-label="Bookmark" 
         onClick={(e)=> { deleteApiScope(rowdata.id) }}
        />
    }

    const callManageApiScope = (apiScopeId:number) => {
        let url:string = '/operation/manageApiScope/' + apiScopeId;
        navigate(url)
    }

    const deleteApiScope = (apiScopeId:number) => {
        deleteApiScopeData({
            variables:{
                apiScopeId: apiScopeId
            }
        }).then(res=> console.log('apiScope deleted'))
        .catch(err=> console.log(err))
    }

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="New" icon="pi pi-plus" className="p-button-success mr-2" onClick={()=> callNewApiScope() } />
            </React.Fragment>
        )
    }

    const callNewApiScope = () => {
        let url:string = '/operation/manageApiScope/' + 0;
        navigate(url)
    }

    
    return (
        <Card title="Api Scope List">
            <Toolbar className="mb-4" left={leftToolbarTemplate} ></Toolbar>
            <DataTable value={apiScopes} header={header} responsiveLayout="scroll">
                <Column field="id" header="#"></Column>
                <Column field="name" header="Name"></Column>
                <Column field="displayName" header="Display Name"></Column>
                <Column field="description" header="Description"></Column>
                <Column header="Edit" body={editBodyTemplate}></Column>
                <Column header="Delete" body={DeleteBodyTemplate}></Column>
            </DataTable>
        </Card>
    )
}