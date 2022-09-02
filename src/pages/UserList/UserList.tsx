import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import React from 'react'
import { IUserList } from './UserListType'
import { Badge } from 'primereact/badge';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom'

export const UserList = () => {

    const navigate = useNavigate();
    const userList:IUserList [] = [
        {userId:'f2806128-61e8-42ad-baf6-899821212fe9',email:'admin@test.com',isAdmin:true,username:'admin',createdDate:'08/13/2019'},
        {userId:'412f5e4f-80e8-4f60-80b2-34e600b70f40',email:'user@test.com',isAdmin:false,username:'user',createdDate:'08/17/2019'},
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

    const actionBodyTemplate = (rowData:IUserList) => {
        return  <Button type="button" icon="pi pi-cog" onClick={(e)=>callUserPage(rowData.userId)}></Button>;
    }

    const callUserPage = (userId:string) => {
        const url = "/user/" + userId;
        navigate(url);
    }

    const header = (
        <div className="table-header">
            User List
        </div>
    );

  return (
    <React.Fragment>
        <div className="card">
                <DataTable value={userList} header={header} responsiveLayout="scroll">
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