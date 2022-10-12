import { useFormik } from 'formik';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import React, { useEffect, useState } from 'react'
import { useDeletePostLogoutRedirectUrl } from '../../graphQL/mutation/useDeletePostLogoutRedirectUrl';
import { useSaveClientPostLogoutRedirectUrl } from '../../graphQL/mutation/useSaveClientPostLogoutRedirectUrl';
import { PostLogoutRedirectUri } from '../../pages/ClientDisplayList/ClientDisplayTypes';

type PostLogoutRedirectType = {
    postLogoutRedirectUrl:PostLogoutRedirectUri[];
    clientId:number;
}

export const ClientPostLogoutRedirectUrl = ({ postLogoutRedirectUrl, clientId }:PostLogoutRedirectType) => {
    const [postLogoutRedirectState,setPostLogoutRedirect] = useState<PostLogoutRedirectUri[]>([]);
    const [ clientIdState,setClientId ] = useState<number>(0);
    const [dialogDisplay,setDialogDisplay] = useState<boolean>(false);
    const [ saveClientPostLogoutRedirectUrl ] = useSaveClientPostLogoutRedirectUrl();
    const [ deleteClientPostLogoutRedirectUrl ] = useDeletePostLogoutRedirectUrl();
  
    useEffect(()=>{
  
      if(postLogoutRedirectUrl !== null){
        setPostLogoutRedirect(postLogoutRedirectUrl);
      }

      if(clientId>0){
        setClientId(clientId);
      }
    },[postLogoutRedirectUrl,clientId])
  
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

        saveClientPostLogoutRedirectUrl({
          variables:{
            clientPostLogout:{
              id:0,
              clientId: clientIdState,
              postLogoutRedirectUri: data.postLogoutRedirectUri
            }
          }
        }).then((res)=>{
          let result = res.data?.saveClientPostLogoutRedirectUrl!;

          if(result !== null){
            setPostLogoutRedirect(prevLogoutUrl => 
              [...prevLogoutUrl,result]
            )
          }

        }).catch(err=>console.log(err))
        
  
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

        deleteClientPostLogoutRedirectUrl({
          variables:{
            clientPostLogout:{
              id: rowData.id,
              clientId: clientIdState,
              postLogoutRedirectUri: rowData.postLogoutRedirectUri
            }
          }
        }).then((res)=>{
          let result = res.data?.deleteClientPostLogoutRedirectUrl!;

          if(result !== null){
            setPostLogoutRedirect((prevLogoutRedirectUrl=> prevLogoutRedirectUrl.filter(postLogout=> postLogout.id !== result.id)));
          }
        }).catch(err=>console.log(err))
        
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