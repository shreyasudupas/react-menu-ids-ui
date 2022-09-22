import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import React, { useEffect, useState } from 'react'
import { Client, RedirectUrl } from '../../pages/ClientDisplayList/ClientDisplayTypes'

export type RedirectUrlType = {
    redirectUrls:RedirectUrl[];
}

export const ClientRedirectUrlComponent = ({redirectUrls}:RedirectUrlType) => {
    const [clientRedirectUrlState,setClientRedirectUrl] = useState<RedirectUrl[]>([]);
    const [dialogDisplay,setDialogDisplay] = useState<boolean>(false);

    useEffect(()=>{
        if(redirectUrls !== null){
            setClientRedirectUrl(redirectUrls);
        }
    },[redirectUrls])

    const deleteRedirectUrlTemplate = (rowData:Client) => {
        return <Button
            icon="pi pi-user-edit"
            className="p-button-rounded p-button-danger"
            aria-label="Bookmark"
      />
    }

    const onHideDialog = () => {
        setDialogDisplay(false)
      }
        
    return (
        <React.Fragment>
            <Card title="Redirect Uri List">
                <DataTable value={clientRedirectUrlState} responsiveLayout="scroll">
                    <Column field='redirectUri' header="Redirect Url" />
                    <Column header="Delete" body={deleteRedirectUrlTemplate} />
                </DataTable>
                <div className='col-12 p-2'>
                    <Button label='Add Redirect Url' className='p-button-rounded' onClick={() => setDialogDisplay(true)} />
                </div>
            </Card>

            <Dialog header={"Add Redirect Uri"} visible={dialogDisplay} onHide={() => onHideDialog()} breakpoints={{ '960px': '75vw', '640px': '100vw' }} style={{ width: '50vw' }}>
                <div className='formgrid grid p-fluid'>
                    <div className='field col-12'>
                        <span className="p-float-label">
                            <InputText id="redirecturl" value={""} />
                            <label htmlFor="redirecturl">Redirect Url</label>
                        </span>
                    </div>
                    <div className='col-12'>
                        <Button label='Add Redirect Url' className='p-button-rounded' />
                    </div>
                </div>
            </Dialog>

        </React.Fragment>
    )
}