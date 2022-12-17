import { Button } from 'primereact/button';
import { Card } from 'primereact/card'
import { Checkbox } from 'primereact/checkbox';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Toolbar } from 'primereact/toolbar';
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDeleteApiResourceById } from '../../graphQL/mutation/useDeleteApiResourceById';
import { useGetApiResourceList } from '../../graphQL/query/useGetApiResourcesList'
import { ApiResource } from '../ManageApiResource/ApiResource';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';

export const ApiResourcesList = () => {

    const navigate = useNavigate();
    const { data } = useGetApiResourceList();
    const [ apiResourceList, setApiResourceList] = useState<ApiResource[]>([]);
    const [ deleteApiResourceById ] = useDeleteApiResourceById(); 
    const toast = useRef<any>(null);


    useEffect(()=>{
        if(apiResourceList.length == 0){
            if(data !== undefined){
                setApiResourceList(data.allApiResources);
            }
        }
    },[data])

    //console.log(data?.allApiResources)

    const showInDocumentTemplate = (rowData:ApiResource) => {
        //debugger
        return <Checkbox name="showInDiscoveryDocument" checked={rowData.showInDiscoveryDocument} disabled={true}/>
    }
    const enabledTemplate = (rowData:ApiResource) => {
        //debugger
        return <Checkbox name="enabled" checked={rowData.enabled} disabled={true}/>
    }

    const leftContents = () => {
        return (<React.Fragment>
            <Button label="New" icon="pi pi-plus" className="mr-2" onClick={(e)=>callApiResourceDetailPage(0)}/>
        </React.Fragment>
        )
    }

    const callApiResourceDetailPage = (resourceId:number) => {
        let url = "/operation/apiResourceList/resource/" + resourceId;
        navigate(url);
    }

    const editTemplate = (rowData:ApiResource) => {
        return <Button type="button" icon="pi pi-user-plus" onClick={(e)=>callApiResourceDetailPage(rowData.id)}></Button>;
    }

    const deleteTemplate = (rowData:ApiResource) => {
        return <Button type="button" 
                icon="pi pi-users" 
                className="p-button-danger" 
                onClick={(e)=>confirmDelete(rowData)}
                ></Button>;
    }

    const callDeleteApiResource = (id:number) => {

        deleteApiResourceById({
            variables:{
                id: id
            }
        }).then(res=>{
            let result = res.data?.deleteApiResourcesById;

            if(result !== undefined){
                if(result !== null){
                    toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'Delete Successful', life: 3000 });

                    //remove the record from the list
                    setApiResourceList(prevApiResource => prevApiResource.filter(a=>a.id !== result?.id));
                }
            }else{
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error when deleting', life: 3000 });
            }
        })
        
    }

    const reject = () => {
        // toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    }

    const confirmDelete = (rowData:ApiResource) => {
        confirmDialog({
            message: 'Are you sure you want to proceed to delete with record ' + rowData.name + '?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => callDeleteApiResource(rowData.id),
            reject
        });
    };

    return (
        <React.Fragment>
            <Toast ref={toast} />
            <Card title="API Resource List">
                <div className='grid'>
                    <div className='col-12'>
                        <p>
                            The ApiResource class allows for some additional organization as well as grouping and isolation of scopes as well as providing some common settings.
                            In more complex systems, often the notion of a resource is introduced. This might be e.g. a physical or logical API. In turn each API can potentially have scopes as well. Some scopes might be exclusive to that resource, and some scopes might be shared.
                        </p>
                    </div>
                </div>
                <Toolbar left={leftContents} />
                <ConfirmDialog />

                <DataTable value={apiResourceList} responsiveLayout="scroll">
                    <Column field="name" header="Name"></Column>
                    <Column field="displayName" header="DisplayName"></Column>
                    <Column header="Show in Document" body={showInDocumentTemplate}></Column>
                    <Column header="Enabled" body={enabledTemplate}></Column>
                    <Column header="Edit" body={editTemplate}></Column>
                    <Column header="Delete" body={deleteTemplate} />
                </DataTable>
            </Card>
        </React.Fragment>
    )
}