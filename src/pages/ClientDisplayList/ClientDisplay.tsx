import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { Checkbox } from 'primereact/checkbox'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Toolbar } from 'primereact/toolbar'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetClients } from '../../graphQL/query/useGetClients'
import { Client } from './ClientDisplayTypes'


export const ClientDisplay = () => {
  const { data } = useGetClients();
  const navigate = useNavigate();
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {

    if (data !== undefined) {
      if (data !== null) {
        setClients(data.clientsInformation);
      }
    }

  }, [data]);

  const leftToolbarTemplate = () => {
    return (
      <div>
        <Button label="New" icon="pi pi-plus" className="p-button-success mr-2" onClick={callNewClientPage}/>
      </div>
    )
  }

  const callNewClientPage = () => {
    navigate('/operation/client/0');
  }

  const callManageClientPage = (clientId: number) => {
    let url = '/operation/client/'+ clientId
    navigate(url);
  }

  const editBodyTemplate = (rowdata: Client) => {
    return <Button icon="pi pi-user-edit"
      className="p-button-rounded p-button-primary"
      aria-label="Bookmark"
      onClick={()=>callManageClientPage(rowdata.id)}
    />
  }

  const DeleteBodyTemplate = (rowdata: Client) => {
    return <Button
      icon="pi pi-user-edit"
      className="p-button-rounded p-button-danger"
      aria-label="Bookmark"
    />
  }

  const enabledBodyTemplate = (rowData:Client) => {
    return (
      <>
        <Checkbox inputId="binary" value={rowData.enabled} checked={rowData.enabled} readOnly={true} />
      </>
    )
  }


  return (
    <div>
      <Toolbar className="mb-4" left={leftToolbarTemplate} ></Toolbar>
      <Card title="Client List">
        <DataTable value={clients} responsiveLayout="scroll">
          <Column field="clientId" header="Client Id"></Column>
          <Column field="clientName" header="Client Name"></Column>
          <Column field="enabled" header="Enabled" body={enabledBodyTemplate}></Column>
          <Column field="description" header="Description"></Column>
          <Column header="Edit" body={editBodyTemplate}></Column>
          <Column header="Delete" body={DeleteBodyTemplate}></Column>
        </DataTable>
      </Card>
    </div>
  )
}