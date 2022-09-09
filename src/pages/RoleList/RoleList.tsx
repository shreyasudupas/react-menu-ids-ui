import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Toolbar } from 'primereact/toolbar';
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDeleteRoleById } from '../../graphQL/mutation/useDeleteRoleById';
import { useGetRoles } from '../../graphQL/query/useGetRoles';
import { Role } from './RoleType';

export const UserRoleList = () => {

    const navigate = useNavigate();
    const { data } = useGetRoles();
    const [ roles,setRoles] = useState<Role[]>([])
    const [ deleteRoleById ] = useDeleteRoleById("");
    const toast = useRef<any>(null);

    const showError = (message:string) => {
        toast.current.show({severity:'error', summary: 'Error Message', detail:message, life: 3000});
    }

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
            </React.Fragment>
        )
    }

    const DeleteRoleById = (roleId:string | undefined) => {
        if(roleId !== undefined && roleId !== "0"){
            deleteRoleById({ 
                variables:{
                    roleId: roleId
                }
            }).then((res)=>{
                var result = res.data?.deleteRole;

                debugger
                if(result?.roleId !== roleId){
                    showError("Error Deleting Role");
                }
            }).catch(err=>console.log(err))
        }
    }


    const editBodyTemplate = (rowdata:Role) => {
        return  (
            <div>
                <Button icon="pi pi-user-edit"
                    className="p-button-rounded p-button-primary"
                    aria-label="Bookmark"
                    onClick={(e) => { callManageRole(rowdata.roleId) }}
                />
                <Button icon="pi pi-user-minus"
                    className="p-button-rounded p-button-danger"
                    aria-label="Bookmark"
                    onClick={(e) => { DeleteRoleById(rowdata.roleId) }}
                />
            </div>
        
    )}

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