import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { Checkbox } from 'primereact/checkbox'
import { Column } from 'primereact/column'
import { confirmDialog, ConfirmDialog } from 'primereact/confirmdialog'
import { DataTable } from 'primereact/datatable'
import { Toolbar } from 'primereact/toolbar'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDeleteIdentityResourceById } from '../../graphQL/mutation/useDeleteIdentityResourceById'
import { useGetAllIdentityResources } from '../../graphQL/query/useGetAllIdentityResources'
import { IdentityResource } from '../IdenitityResourceDetail/IdentityResource'

export const IdentityResourceList = () => {
    const [identityResources,setIdenitityResources] = useState<IdentityResource[]>([]);
    const { data,loading } = useGetAllIdentityResources();
    const [ deleteIdentityResource ] = useDeleteIdentityResourceById();
    const navigate = useNavigate();

    useEffect(()=>{
        if(data !== undefined){
            if(data !== null){
                setIdenitityResources(data.allIdentityResource);
            }
        }
    },[data])

    const editTemplate = (rowData:IdentityResource) => {
        return <Button type="button" 
                    icon="pi pi-user-plus" 
                    onClick={(e)=> navigate('/operation/identityResourceList/idenityResourceDetail/'+rowData.id)}
                    ></Button>;
    }

    const deleteTemplate = (rowData:IdentityResource) => {
        return <Button type="button" 
                icon="pi pi-users" 
                className="p-button-danger" 
                onClick={(e)=>confirmDelete(rowData)}
                ></Button>;
    }

    const confirmDelete = (rowData:IdentityResource) => {
        confirmDialog({
            message: 'Are you sure you want to proceed to delete with record ' + rowData.name + '?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => callDeleteIdentityResource(rowData.id),
            reject
        });
    };

    const reject = () => {}

    const callDeleteIdentityResource = (id:number) => {
        deleteIdentityResource({
            variables:{
                id: id
            }
        }).then((res)=>{
            let result = res.data?.deleteIdentityResource;
            if(result !== null && result !== undefined){
                if(result === true){
                    setIdenitityResources( prevIdentityResource => prevIdentityResource.filter(ir=>ir.id != id));
                }
            }
        })
        .catch(err => console.log(err))
    }

    const nonEditableTemplate = (rowData:IdentityResource) => {
        return <Checkbox inputId="cb2" checked={rowData.nonEditable} disabled={true}></Checkbox>
    }

    const leftContents = () => {
        return (<React.Fragment>
            <Button label="New" icon="pi pi-plus" className="mr-2" onClick={(e)=>navigate('/operation/identityResourceList/idenityResourceDetail/0')}/>
        </React.Fragment>
        )
    }

    return (
        <React.Fragment>
            <div className='grid p-fluid'>
                <div className='p-col-12'>
                    <p>
                        An identity resource is a named group of claims that can be requested using the scope parameter.The OpenID Connect specification suggests a couple
                        of standard scope name to claim type mappings that might be useful to you for inspiration, but you can freely design them yourself. Eg: profile,email
                    </p>
                </div>
            </div>
            <div className='col-12'>
                <Toolbar left={leftContents} />
                <Card title={"Identity Resource List"}>
                    <ConfirmDialog />
                    <DataTable value={identityResources} responsiveLayout="scroll">
                        <Column field="name" header="Name"></Column>
                        <Column field="displayName" header="DisplayName"></Column>
                        <Column header="Non Editable" body={nonEditableTemplate}></Column>
                        <Column header="Edit" body={editTemplate}></Column>
                        <Column header="Deelte" body={deleteTemplate}></Column>
                    </DataTable>
                </Card>
            </div>

        </React.Fragment>
    )
}