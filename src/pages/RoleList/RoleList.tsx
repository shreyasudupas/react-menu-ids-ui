import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Toolbar } from 'primereact/toolbar';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useGetRoles } from '../../graphQL/query/useGetRoles';
import { Role } from './RoleType';

export const UserRoleList = () => {

    const navigate = useNavigate();
    const { data } = useGetRoles();
    const [ roles,setRoles] = useState<Role[]>([])

    useEffect(()=>{
        if(roles.length === 0){
            if(data !== undefined){
                setRoles(data.roles);
            }
        }
    },[data])
    

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="New" icon="pi pi-plus" className="p-button-success mr-2" onClick={()=> callManageRole('0')}/>
                <Button label="Delete" icon="pi pi-trash" className="p-button-danger" />
            </React.Fragment>
        )
    }


    const editBodyTemplate = (rowdata:Role) => {
        return  <Button icon="pi pi-user-edit"
         className="p-button-rounded p-button-primary" 
         aria-label="Bookmark" 
         onClick={(e)=> { callManageRole(rowdata.roleId) }}
         />
    }

    const callManageRole = (roleId:string) => {
        let url:string = '/operation/manageRole/' + roleId;
        navigate(url)
    }
    
  return (
    <React.Fragment>
        <Card title="User Roles List">
            <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>

              <DataTable value={roles} responsiveLayout="scroll">
                  <Column field="roleName"  header="Roles"></Column>
                  <Column header="Edit" body={editBodyTemplate}></Column>
              </DataTable>
        </Card>
    </React.Fragment>
  )
}