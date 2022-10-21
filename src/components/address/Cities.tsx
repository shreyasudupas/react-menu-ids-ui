import { useFormik } from 'formik'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import { Toolbar } from 'primereact/toolbar'
import { classNames } from 'primereact/utils'
import React, { useState } from 'react'
import { City } from '../../pages/Address/AddressType'

interface CityType{
    cities:City[];
    selectedCity:any;
    selectedStateId:number;
    sendUpdatedCityId:(cityId:any) => void;
}

export const Cities = ({ cities,selectedCity,sendUpdatedCityId,selectedStateId }:CityType) => {
  const [cityDialog,setCityDialog] = useState<boolean>(false);
  const formik = useFormik<City>({
    initialValues:{
      id:0,
      name:'',
      areas:[],
      stateId: selectedStateId
    },
    validate: (data) =>{
      let errors:any = {};

      if (!data.name) {
        errors.name = 'City name is required.';
      }
  
      return errors;
    },
    onSubmit: (data) =>{
        alert(data)

        formik.resetForm();
    },
    enableReinitialize: true
  });
  
    const leftCityToolbarTemplate = () => {
        return (
          <React.Fragment>
            <Button label="New" icon="pi pi-plus" className="p-button-success mr-2"  onClick={() => setCityDialog(true)}/>
          </React.Fragment>
        )
      }

  const closeDialog = () => {
    setCityDialog(false);

    formik.resetForm();
  }

  const isFormFieldValid = (name:any) => !!(formik.touched[name as keyof City] && formik.errors[name as keyof City]);

  const getFormErrorMessage = (name:any) => {
      return isFormFieldValid(name) && <small className="p-error">{formik.errors['name']}</small>;
  };
      
  return (
    <React.Fragment>
      <Card title="Edit City">
        <Toolbar className="mb-4" left={leftCityToolbarTemplate}></Toolbar>

        <div className='col-12'>
          <DataTable value={cities} responsiveLayout="scroll">
            <Column field="name" header="Cities"></Column>
          </DataTable>
        </div>
        <div className='col-6'>
          <Dropdown value={selectedCity}
            options={cities}
            onChange={(e) => sendUpdatedCityId(e.value)}
            optionLabel="name"
            optionValue='id'
            placeholder="Select a City"
          />
        </div>
      </Card>

      <Dialog header="Add City" visible={cityDialog} style={{ width: '450px' }}
        //footer={this.renderFooter('displayBasic')} 
        onHide={() => closeDialog()}>
        <form onSubmit={formik.handleSubmit} className='p-fluid'>
          <div className='grid formgrid p-fluid'>
            <div className='col-12'>
              <InputText
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                placeholder="Enter new City" 
                className={classNames({ 'p-invalid': isFormFieldValid('name') })}
                />
                {getFormErrorMessage('name')}
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