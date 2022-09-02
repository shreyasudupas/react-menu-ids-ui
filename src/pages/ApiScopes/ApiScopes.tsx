import { Button } from 'primereact/button';
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import React from 'react'
import { ApiScopeData } from './ApiScopeType';

export const ApiScopes = () => {

    const apiScopes:ApiScopeData[] = [
        {id:1,name:'inventoryApi',displayName:'Menu Inventory',description:''},
        {id:2,name:'userIDSApi',displayName:'User Controller API in IDS',description:''},
        {id:3,name:'IdentityServerApi',displayName:'IdentityServerApi',description:''},
        {id:4,name:'basketApi',displayName:'Basket MicroService API read',description:''}
    ];

    const header = (
        <div className="table-header">
            API Scopes List
        </div>
    );

    const editBodyTemplate = (rowdata:ApiScopeData) => {
        return  <Button icon="pi pi-user-edit" className="p-button-rounded p-button-primary" aria-label="Bookmark" />
    }
    
  return (
    <div className="card">
        <DataTable value={apiScopes} header={header} responsiveLayout="scroll">
            <Column field="id" header="#"></Column>
            <Column field="name" header="Name"></Column>
            <Column field="displayName" header="Display Name"></Column>
            <Column field="description" header="Description"></Column>
            <Column header="Edit" body={editBodyTemplate}></Column>
        </DataTable>
</div>
  )
}