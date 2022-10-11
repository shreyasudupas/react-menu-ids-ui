import { useFormik } from 'formik'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { classNames } from 'primereact/utils'
import React, { useEffect, useState } from 'react'
import { useDeleteClientRedirectUrl } from '../../graphQL/mutation/useDeleteClientRedirectUrl'
import { useSaveClientRedirectUrl } from '../../graphQL/mutation/useSaveClientRedirectUrl'
import { RedirectUrl } from '../../pages/ClientDisplayList/ClientDisplayTypes'

export type RedirectUrlType = {
    redirectUrls:RedirectUrl[];
    clientId:number;
}

export const ClientRedirectUrlComponent = ({ redirectUrls,clientId }:RedirectUrlType) => {
    const [clientRedirectUrlState,setClientRedirectUrl] = useState<RedirectUrl[]>([]);
    const [ clientIdState,setClientId] = useState<number>(0);
    const [dialogDisplay,setDialogDisplay] = useState<boolean>(false);
    const [ saveClientRedirectUrl ] = useSaveClientRedirectUrl();
    const [ deleteClientRedirectUrl ] = useDeleteClientRedirectUrl();

    useEffect(()=>{
        if(redirectUrls !== null){
            setClientRedirectUrl(redirectUrls);
        }

        if(clientId > 0){
            setClientId(clientId);
        }
    },[redirectUrls,clientId])

    const formik = useFormik<RedirectUrl>({
        initialValues:{
            id:0,
            clientId:0,
            redirectUri:''
        },
        validate: (data) => {
            let errors:any = {};

            if(!data.redirectUri){
                errors.redirectUri = "Redirect Uri is required";
            }

            return errors;
        },
        onSubmit: (data) => {
            //alert('clicked')

            saveClientRedirectUrl({
                variables:{
                    clientRedirect:{
                        clientId: clientIdState,
                        id: 0,
                        redirectUri: data.redirectUri
                    }
                }
            }).then((res)=>{
                let result = res.data?.saveClientRedirectUrl!;

                if(result !== null) {
                    setClientRedirectUrl(prevRedirect => 
                        [...prevRedirect, result]
                    );
                }
            })
            .catch(err => console.log(err));

            onHideDialog();
            formik.resetForm();
        },
        enableReinitialize:true
    })

    const deleteRedirectUrlTemplate = (rowData:RedirectUrl) => {
        return <Button
            icon="pi pi-user-edit"
            className="p-button-rounded p-button-danger"
            aria-label="Bookmark"
            onClick={()=>removeRedirectUrl(rowData)}
      />
    }

    const removeRedirectUrl = (rowData: RedirectUrl) => {

        deleteClientRedirectUrl({
            variables:{
                clientRedirect:{
                    clientId: clientIdState,
                    id: rowData.id,
                    redirectUri: rowData.redirectUri
                }
            }
        }).then((res)=>{
            let result= res.data?.deleteClientRedirectUrl!;

            if(result !== null){
                setClientRedirectUrl((prevClientRedirectUrl=> prevClientRedirectUrl.filter(redirect=> redirect.id !== result.id)));
            }
        }).catch(err => console.log(err))
        
      }

    const onHideDialog = () => {
        setDialogDisplay(false)
    }

    const isFormFieldValid = (name:any) => !!(formik.touched[name as keyof RedirectUrl] && formik.errors[name as keyof RedirectUrl]);

    const getFormErrorMessage = (name:any) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name as keyof RedirectUrl]}</small>;
    };
        
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
                <form onSubmit={formik.handleSubmit} className='p-fluid'>
                    <div className='formgrid grid p-fluid'>
                        <div className='field col-12'>
                            <span className="p-float-label">
                                <InputText
                                    id="redirecturi"
                                    name="redirectUri"
                                    value={formik.values.redirectUri}
                                    onChange={formik.handleChange}
                                    className={classNames({ 'p-invalid': isFormFieldValid('redirectUri') })}
                                />
                                <label htmlFor="redirecturi" className={classNames({ 'p-error': isFormFieldValid('redirectUri') })}>Redirect Url</label>
                                {getFormErrorMessage('redirectUri')}
                            </span>
                        </div>
                        <div className='col-12'>
                            <Button type='submit' label='Add Redirect Url' className='p-button-rounded' />
                        </div>
                    </div>
                </form>
            </Dialog>

        </React.Fragment>
    )
}