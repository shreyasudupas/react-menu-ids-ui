import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import React, { useEffect, useState } from 'react'
import { IUserList } from './UserListType'
import { Badge } from 'primereact/badge';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom'
import { useGetUserListQuery } from '../../graphQL/query/useGetUserListQuery';
import { Card } from 'primereact/card';

export const UserList = () => {

    const navigate = useNavigate();
    const { data } = useGetUserListQuery();
    const [ users ,setUsers ] = useState<IUserList[]>([]);

    useEffect(()=>{
        if(users.length === 0){
            if(data !== undefined)
                setUsers(data.userList);
        }
    },[data])


    const typeBodyTemplate = (rowData:IUserList) => {
        if(rowData.isAdmin){
            return  <Badge value="ADMIN" severity="info" className="mr-2"></Badge>
        }
        else{
            return  <Badge value="USER" severity="warning" className="mr-2"></Badge>
        }
    }

    const actionBodyTemplate = (rowData:IUserList) => {
        return  <Button type="button" icon="pi pi-cog" onClick={(e)=>callUserPage(rowData.id)}></Button>;
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
          <Card title="User List">
              <DataTable value={users} header={header} responsiveLayout="scroll">
                  <Column field="userName" header="Username"></Column>
                  <Column field="email" header="Email"></Column>
                  <Column field="isAdmin" header="Type" body={typeBodyTemplate}></Column>
                  <Column field="createdDate" header="Created Date"></Column>
                  <Column header="Action" body={actionBodyTemplate}></Column>
              </DataTable>
          </Card>
      </React.Fragment>
  )
}