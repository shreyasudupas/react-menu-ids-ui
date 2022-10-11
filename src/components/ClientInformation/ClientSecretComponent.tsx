import { useFormik } from 'formik'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { classNames } from 'primereact/utils'
import React, { useEffect, useState } from 'react'
import { useDeleteClientSecret } from '../../graphQL/mutation/useDeleteClientSecret'
import { useSaveClientSecret } from '../../graphQL/mutation/useSaveClientSecret'
import { ClientSecret } from '../../pages/ClientDisplayList/ClientDisplayTypes'

type ClientSecretType = {
    clientSecret:ClientSecret[];
    clientId:number;
}

export const ClientSecretComponent = ({ clientSecret,clientId }: ClientSecretType) => {
  const [clientSecretState,setClientSecret] = useState<ClientSecret[]>([]);
  const [dialogDisplay,setDialogDisplay] = useState<boolean>(false);
  const [ clientIdState,setClientId ] = useState<number>(0); 
  const [ saveClientSecret ] = useSaveClientSecret();
  const [ deleteClientSecret ] = useDeleteClientSecret();

  useEffect(()=>{

    if(clientSecret !== null){
      setClientSecret(clientSecret);
    }
 
    if(clientId > 0){
      setClientId(clientId)
    }
    
  },[clientSecret,clientId])

  const formik = useFormik<ClientSecret>({
    initialValues:{
      id:0,
      clientId:0,
      secretvalue:''
    },
    validate: (data) => {
      let errors:any = {};

      if(!data.secretvalue){
        errors.secretvalue = "Require a secret value";
      }

      return errors;

    },
    onSubmit: (data) => {
      let cId = clientIdState;

      saveClientSecret({
        variables:{
          clientSecret:{
            id: 0,
            clientId: cId,
            secretValue:data.secretvalue
          }
        }
      }).then((res)=>{
        if(res.data?.saveClientSecret !== null){
          let newSecret:ClientSecret = {
            id: res.data?.saveClientSecret.id!,clientId: res.data?.saveClientSecret.clientId!,secretvalue:res.data?.saveClientSecret.secretvalue! 
          };

          setClientSecret(prevSecret => 
            [...prevSecret, newSecret]
          )    
        }else{
          console.log('Error in saving Client Secret')
        }
      });

    onHideDialog();
    formik.resetForm();
    }
  })

  const deleteSecretTemplate = (rowData: ClientSecret) => {
    return <Button
      icon="pi pi-user-edit"
      className="p-button-rounded p-button-danger"
      aria-label="Bookmark"
      onClick={()=>removeClientSecret(rowData)}
    />
  }

  const removeClientSecret = (rowData: ClientSecret) => {

    deleteClientSecret({
      variables:{
        clientSecret:{
          id: rowData.id,
          clientId: clientIdState,
          secretValue:rowData.secretvalue
        }
      }
    }).then((res)=>{
      if(res.data?.deleteClientSecret !== null) {
        setClientSecret((prev=> clientSecretState.filter(secret=> secret.id !== rowData.id)));
      }
    })
    .catch(err=> console.log(err))
    
  }

  const onHideDialog = () => {
    setDialogDisplay(false)
  }

  const isFormFieldValid = (name:any) => !!(formik.touched[name as keyof ClientSecret] && formik.errors[name as keyof ClientSecret]);

    const getFormErrorMessage = (name:any) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name as keyof ClientSecret]}</small>;
    };

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
        <form onSubmit={formik.handleSubmit} className='p-fluid'>
          <div className='formgrid grid p-fluid'>
            <div className='field col-12 p-3'>
              <span className="p-float-label">
                <InputText 
                    id="secretvalue"
                    name="secretvalue" 
                    value={formik.values.secretvalue}
                    onChange={formik.handleChange}
                    className= {classNames({'p-invalid': isFormFieldValid('secretvalue')})} 
                  />
                <label htmlFor="secretvalue" className= {classNames({'p-invalid': isFormFieldValid('secretvalue')})}>Secret</label>
                {getFormErrorMessage('secretvalue')}
              </span>
            </div>
            <div className='col-12'>
              <Button label='Add Secret' className='p-button-rounded' />
            </div>
          </div>
        </form>

      </Dialog>
    </React.Fragment>
  )
}