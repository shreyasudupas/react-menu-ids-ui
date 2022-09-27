import { useFormik } from 'formik'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { classNames } from 'primereact/utils'
import React, { useEffect, useState } from 'react'
import { RedirectUrl } from '../../pages/ClientDisplayList/ClientDisplayTypes'

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

            setClientRedirectUrl(prevRedirect => 
                [...clientRedirectUrlState,{ clientId:0,id:0,redirectUri:data.redirectUri }]
            )

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
        setClientRedirectUrl((prev=> clientRedirectUrlState.filter(redirect=> redirect.id !== rowData.id)));
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