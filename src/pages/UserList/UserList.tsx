import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import React from 'react'
import { IUserList } from './UserListType'
import { Badge } from 'primereact/badge';
import { Button } from 'primereact/button';

export const UserList = () => {
    const userList:IUserList [] = [
        {userId:'1-a',email:'sample1@test.com',isAdmin:true,username:'sample',createdDate:'08/13/2019'},
        {userId:'1-b',email:'sample2@test.com',isAdmin:false,username:'sample 2',createdDate:'08/17/2019'},
        {userId:'1-c',email:'sample3@test.com',isAdmin:false,username:'sample 3',createdDate:'08/19/2019'}
    ];

    const typeBodyTemplate = (rowData:IUserList) => {
        if(rowData.isAdmin){
            return  <Badge value="ADMIN" severity="info" className="mr-2"></Badge>
        }
        else{
            return  <Badge value="USER" severity="warning" className="mr-2"></Badge>
        }
    }

    const actionBodyTemplate = (rowData:any) => {
        return  <Button type="button" icon="pi pi-cog"></Button>;
    }

  return (
    <React.Fragment>
        <div className="card">
                <DataTable value={userList} responsiveLayout="scroll">
                    <Column field="username" header="Username"></Column>
                    <Column field="email" header="Email"></Column>
                    <Column field="isAdmin" header="Type" body={typeBodyTemplate}></Column>
                    <Column field="createdDate" header="Created Date"></Column>
                    <Column header="Action" body={actionBodyTemplate}></Column>
                </DataTable>
            </div>
    </React.Fragment>
  )
}