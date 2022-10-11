import { useFormik } from 'formik';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import React, { useEffect, useState } from 'react'
import { useDeleteClientAllowedCors } from '../../graphQL/mutation/useDeleteClientAllowedCors';
import { useSaveClientAllowedCors } from '../../graphQL/mutation/useSaveClientAllowedCors';
import { AllowedCorsOrigin } from '../../pages/ClientDisplayList/ClientDisplayTypes';

type AllowedCorsOriginType = {
    allowedCorsOrigins:AllowedCorsOrigin[];
    clientId:number;
}

export const ClientAllowedCorsOrigin = ({ allowedCorsOrigins, clientId }:AllowedCorsOriginType) => {
    const [allowedCorsOriginState,setAllowedCors] = useState<AllowedCorsOrigin[]>([]);
    const [ clientIdState,setClientId ] = useState<number>(0);
    const [dialogDisplay,setDialogDisplay] = useState<boolean>(false);
    const [ saveClientAllowedSecret ] = useSaveClientAllowedCors();
    const [ deleteClientAllowedSecret ] = useDeleteClientAllowedCors();
  
    useEffect(()=>{
  
      if(allowedCorsOrigins !== null){
        setAllowedCors(allowedCorsOrigins);
      }
      if(clientId > 0){
        setClientId(clientId);
      }

    },[allowedCorsOrigins,clientId])
  
    const formik = useFormik<AllowedCorsOrigin>({
      initialValues:{
        id:0,
        clientId:0,
        url:''
      },
      validate: (data) => {
        let errors:any = {};
  
        if(!data.url){
          errors.url = "Require a Cors url";
        }
  
        return errors;
  
      },
      onSubmit: (data) => {

        saveClientAllowedSecret({
          variables:{
            corsOrigin:{
              clientId:clientIdState,
              id:0,
              url:data.url
            }
          }
        }).then((res)=>{
          let result = res.data?.saveAllowedCorsOrigin!;
          if(result !== null){
            setAllowedCors(prevCors => 
              [...prevCors,{ id:result?.id ,url: result?.url , clientId: result?.clientId }]
            )
          }
        })
        .catch(err => console.log(err) )
      
          onHideDialog();
          formik.resetForm();
          }
    })
  
    const deleteAllowedCorsUrlTemplate = (rowData: AllowedCorsOrigin) => {
      return <Button
        icon="pi pi-user-edit"
        className="p-button-rounded p-button-danger"
        aria-label="Bookmark"
        onClick={()=>removeAllowedCors(rowData)}
      />
    }
  
    const removeAllowedCors = (rowData: AllowedCorsOrigin) => {

      deleteClientAllowedSecret({
        variables:{
          corsOrigin:{
             clientId: clientIdState,
             id: rowData.id,
             url: rowData.url
          }
        }
      }).then((res)=>{
        let result = res.data?.deleteAllowedCorsOrigin!;
        if(result !== null){
          setAllowedCors((prev=> allowedCorsOriginState.filter(allowedCors=> allowedCors.id !== result.id)));
        }
      })
      .catch( err => console.log(err));

        
    }
  
    const onHideDialog = () => {
      setDialogDisplay(false)
    }
  
    const isFormFieldValid = (name:any) => !!(formik.touched[name as keyof AllowedCorsOrigin] && formik.errors[name as keyof AllowedCorsOrigin]);
  
      const getFormErrorMessage = (name:any) => {
          return isFormFieldValid(name) && <small className="p-error">{formik.errors[name as keyof AllowedCorsOrigin]}</small>;
      };
  
    return (
      <React.Fragment>
        <Card title="Allowed CORS Origin Url">
          <DataTable value={allowedCorsOriginState} responsiveLayout="scroll">
            <Column field='url' header="CORS url" />
            <Column header="Delete" body={deleteAllowedCorsUrlTemplate} />
          </DataTable>
          <div className='col-12 p-2'>
            <Button label='Add CORS Url' className='p-button-rounded' onClick={()=> setDialogDisplay(true)}/>
          </div>
        </Card>
        <Dialog header={"Add CORS Url"} visible={dialogDisplay} onHide={() => onHideDialog()} breakpoints={{ '960px': '75vw', '640px': '100vw' }} style={{ width: '50vw' }}>
          <form onSubmit={formik.handleSubmit} className='p-fluid'>
            <div className='formgrid grid p-fluid'>
              <div className='field col-12 p-3'>
                <span className="p-float-label">
                  <InputText 
                      id="url"
                      name="url" 
                      value={formik.values.url}
                      onChange={formik.handleChange}
                      className= {classNames({'p-invalid': isFormFieldValid('url')})} 
                    />
                  <label htmlFor="url" className= {classNames({'p-invalid': isFormFieldValid('url')})}>CORS Url</label>
                  {getFormErrorMessage('url')}
                </span>
              </div>
              <div className='col-12'>
                <Button label='Add URL' className='p-button-rounded' />
              </div>
            </div>
          </form>
  
        </Dialog>
      </React.Fragment>
    )
}