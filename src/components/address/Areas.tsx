import { useFormik } from 'formik'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Toolbar } from 'primereact/toolbar'
import { classNames } from 'primereact/utils'
import React, { useState } from 'react'
import { Area } from '../../pages/Address/AddressType'

interface AreaProps{
    areas:Area[];
    stateId:number;
}

export const Areas = ({ areas,stateId }: AreaProps) => {
    const [areaDialog,setAreaDialog] = useState<boolean>(false);
    const formik = useFormik<Area>({
        initialValues:{
          id:0,
          areaName:'',
          cityId:stateId
        },
        validate: (data) =>{
          let errors:any = {};
    
          if (!data.areaName) {
            errors.areaName = 'Area name is required.';
          }
      
          return errors;
        },
        onSubmit: (data) =>{
            alert(data)
    
            formik.resetForm();
        },
        enableReinitialize: true
      });

    const leftAreaToolbarTemplate = () => {
        return (
          <React.Fragment>
            <Button label="New" icon="pi pi-plus" className="p-button-success mr-2"  onClick={() => setAreaDialog(true)}/>
          </React.Fragment>
        )
    }

    const closeDialog = () => {
        setAreaDialog(false);
    
        formik.resetForm();
      }

      const isFormFieldValid = (name:any) => !!(formik.touched[name as keyof Area] && formik.errors[name as keyof Area]);

  return (
      <React.Fragment>
          <Card title="Edit Area">
              <Toolbar className="mb-4" left={leftAreaToolbarTemplate}></Toolbar>

              <div className='col-12'>
                  <DataTable value={areas} responsiveLayout="scroll">
                      <Column field="areaName" header="Area"></Column>
                  </DataTable>
              </div>
          </Card>

          <Dialog header="Add Area" visible={areaDialog} style={{ width: '450px' }}
              //footer={this.renderFooter('displayBasic')} 
              onHide={() => closeDialog()}>
             <form onSubmit={formik.handleSubmit} className="p-fluid">
                <div className='grid p-fluid'>
                  <div className='col-12'>
                      <InputText
                          name="areaName"
                          value={formik.values.areaName}
                          onChange={formik.handleChange}
                          placeholder="Enter new Areas" 
                          className={classNames({ 'p-invalid': isFormFieldValid('name') })}
                          />
                        {isFormFieldValid('areaName') && <small className="p-error">{formik.errors['areaName']}</small>}
                  </div>
                  <div className='col-12'>
                    <Button type="submit" label="Submit" className="mt-2" />
                  </div>
              </div>
             </form>
              
          </Dialog>
      </React.Fragment>
  )
}