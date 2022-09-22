import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import React, { useEffect, useState } from 'react'
import { Client, ClientSecret } from '../../pages/ClientDisplayList/ClientDisplayTypes'

type ClientSecretType = {
    clientSecret:ClientSecret[];
}

export const ClientSecretComponent = ({ clientSecret }: ClientSecretType) => {
  const [clientSecretState,setClientSecret] = useState<ClientSecret[]>([]);
  const [dialogDisplay,setDialogDisplay] = useState<boolean>(false);

  useEffect(()=>{

    if(clientSecret !== null){
      setClientSecret(clientSecret);
    }
  },[clientSecret])

  const deleteSecretTemplate = (rowData: Client) => {
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
      <Card title="App Secret">
        <DataTable value={clientSecretState} responsiveLayout="scroll">
          <Column header="Secret" />
          <Column header="Delete" body={deleteSecretTemplate} />
        </DataTable>
        <div className='col-12 p-2'>
          <Button label='Add Secret' className='p-button-rounded' onClick={()=> setDialogDisplay(true)}/>
        </div>
      </Card>
      <Dialog header={"Add New Secret"} visible={dialogDisplay} onHide={() => onHideDialog()} breakpoints={{ '960px': '75vw', '640px': '100vw' }} style={{ width: '50vw' }}>
        <div className='formgrid grid p-fluid'>
          <div className='field col-12'>
            <span className="p-float-label">
              <InputText id="secret" value={""} />
              <label htmlFor="secret">Secret</label>
            </span>
          </div>
          <div className='col-12'>
            <Button label='Add Secret' className='p-button-rounded'/>
          </div>
        </div>
      </Dialog>
    </React.Fragment>
  )
}