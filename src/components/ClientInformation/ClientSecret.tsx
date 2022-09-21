import { Card } from 'primereact/card'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import React from 'react'

type clientSecret = {
    id:number;
    clientId:number;
    secretvalue:string;
}

export const ClientSecret = (secret:clientSecret) => {
  return (
    <React.Fragment>
        <Card title="App Secret">
                    <DataTable value={state.client.clientSecrets} responsiveLayout="scroll">
                        <Column header="Secret"/>
                        <Column header="Delete" body={deleteSecretTemplate}/>
                    </DataTable>
                    <div className='col-12 p-2'>
                        <Button label='Add Secret' className='p-button-rounded'/>
                    </div>
                </Card>
    </React.Fragment>
  )
}