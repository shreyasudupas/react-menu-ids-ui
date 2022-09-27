import { useFormik } from 'formik';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import React, { useEffect, useState } from 'react'
import { PostLogoutRedirectUri } from '../../pages/ClientDisplayList/ClientDisplayTypes';

type PostLogoutRedirectType = {
    postLogoutRedirectUrl:PostLogoutRedirectUri[];
}

export const ClientPostLogoutRedirectUrl = ({ postLogoutRedirectUrl }:PostLogoutRedirectType) => {
    const [postLogoutRedirectState,setPostLogoutRedirect] = useState<PostLogoutRedirectUri[]>([]);
    const [dialogDisplay,setDialogDisplay] = useState<boolean>(false);
  
    useEffect(()=>{
  
      if(postLogoutRedirectUrl !== null){
        setPostLogoutRedirect(postLogoutRedirectUrl);
      }
    },[postLogoutRedirectUrl])
  
    const formik = useFormik<PostLogoutRedirectUri>({
      initialValues:{
        id:0,
        clientId:0,
        postLogoutRedirectUri:''
      },
      validate: (data) => {
        let errors:any = {};
  
        if(!data.postLogoutRedirectUri){
          errors.postLogoutRedirectUri = "Require a post logout Url";
        }
  
        return errors;
  
      },
      onSubmit: (data) => {
        setPostLogoutRedirect(prevLogoutUrl => 
          [...postLogoutRedirectState,{ clientId:0,id:0,postLogoutRedirectUri: data.postLogoutRedirectUri }]
      )
  
      onHideDialog();
      formik.resetForm();
      }
    })
  
    const deletePostLogoutUrlTemplate = (rowData: PostLogoutRedirectUri) => {
      return <Button
        icon="pi pi-user-edit"
        className="p-button-rounded p-button-danger"
        aria-label="Bookmark"
        onClick={()=>removePostLogoutUrl(rowData)}
      />
    }
  
    const removePostLogoutUrl = (rowData: PostLogoutRedirectUri) => {
        setPostLogoutRedirect((prev=> postLogoutRedirectState.filter(postLogout=> postLogout.id !== rowData.id)));
    }
  
    const onHideDialog = () => {
      setDialogDisplay(false)
    }
  
    const isFormFieldValid = (name:any) => !!(formik.touched[name as keyof PostLogoutRedirectUri] && formik.errors[name as keyof PostLogoutRedirectUri]);
  
      const getFormErrorMessage = (name:any) => {
          return isFormFieldValid(name) && <small className="p-error">{formik.errors[name as keyof PostLogoutRedirectUri]}</small>;
      };
  
    return (
      <React.Fragment>
        <Card title="Post Logout Redirect Url">
          <DataTable value={postLogoutRedirectState} responsiveLayout="scroll">
            <Column field='postLogoutRedirectUri' header="Post Logout url" />
            <Column header="Delete" body={deletePostLogoutUrlTemplate} />
          </DataTable>
          <div className='col-12 p-2'>
            <Button label='Add Post Logout Url' className='p-button-rounded' onClick={()=> setDialogDisplay(true)}/>
          </div>
        </Card>
        <Dialog header={"Add Post Logout Redirect Url"} visible={dialogDisplay} onHide={() => onHideDialog()} breakpoints={{ '960px': '75vw', '640px': '100vw' }} style={{ width: '50vw' }}>
          <form onSubmit={formik.handleSubmit} className='p-fluid'>
            <div className='formgrid grid p-fluid'>
              <div className='field col-12 p-3'>
                <span className="p-float-label">
                  <InputText 
                      id="postLogoutRedirectUri"
                      name="postLogoutRedirectUri" 
                      value={formik.values.postLogoutRedirectUri}
                      onChange={formik.handleChange}
                      className= {classNames({'p-invalid': isFormFieldValid('postLogoutRedirectUri')})} 
                    />
                  <label htmlFor="postLogoutRedirectUri" className= {classNames({'p-invalid': isFormFieldValid('postLogoutRedirectUri')})}>Logout Url</label>
                  {getFormErrorMessage('postLogoutRedirectUri')}
                </span>
              </div>
              <div className='col-12'>
                <Button label='Add Post Logout Url' className='p-button-rounded' />
              </div>
            </div>
          </form>
  
        </Dialog>
      </React.Fragment>
    )
}