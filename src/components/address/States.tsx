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
import React, { useEffect, useState } from 'react'
import { useAddState } from '../../graphQL/mutation/useAddState'
import { useDeleteState } from '../../graphQL/mutation/useDeleteState'
import { State } from '../../pages/Address/AddressType'

interface StateType{
    states:State[];
    selectedStates:number;
    sendStateIdFromState: (stateId:any) => void;
}

export const States = ({ states,selectedStates,sendStateIdFromState }:StateType) => {
const [ statesState,setStates ] = useState<State[]>([]);
const [stateDialog,setStateDialog] = useState<boolean>(false);
const [ addState ] = useAddState();
const [ deleteState ] = useDeleteState();

useEffect(()=>{
  if(states.length > 0){
    setStates(states);
  }
},[states]);

const formik = useFormik<State>({
  initialValues:{
    id:0,
    name:'',
    cities:[]
  },
  validate: (data) =>{
    var errors:any = {};

    if(!data.name){
      errors.name= "State name is required";
    }

    return errors;
  },
  onSubmit: (data) =>{
      //alert(data)

      addState({
        variables:{
          newState:{
            id:data.id,
            name:data.name,
            cities:[]
          }
        }
      }).then((res)=>{
          let result = res.data?.addState;

          if(result!==null && result !== undefined){
            setStates(prevStates=> [...prevStates,result!]);

            console.log('State added');
          }
      }).catch(ex=>console.log(ex));

      formik.resetForm();
  },
  enableReinitialize: true
});

const removeState = (rowData:State) => {
  deleteState({
    variables:{
      state:{
        id: rowData.id,
        name:rowData.name,
        cities:rowData.cities
      }
    }
  }).then((res)=>{
      let result = res.data?.deleteState;

      if(result !== null){
          setStates(prevStates=> prevStates.filter(x=>x.id !== result?.id));
      }

  }).catch(err=> console.log(err))
}

    const leftStateToolbarTemplate = () => {
        return (
          <React.Fragment>
            <Button label="New" icon="pi pi-plus" className="p-button-success mr-2"  
            onClick={() => setStateDialog(true)}
            />
          </React.Fragment>
        )
      }

      const deleteStateTemplate = (rowData:State) => {
        return (
          <Button
            icon="pi pi-user-edit"
            className="p-button-rounded p-button-danger"
            aria-label="Bookmark"
            onClick={()=>removeState(rowData)}
      />
        )
      }

      const isFormFieldValid = (name:any) => !!(formik.touched[name as keyof State] && formik.errors[name as keyof State]);

      const getFormErrorMessage = (name:any) => {
          return isFormFieldValid(name) && <small className="p-error">{formik.errors['name']}</small>;
      };

      const closeDialog = () => {
        setStateDialog(false);
    
        formik.resetForm();
      }
      
  return (
    <React.Fragment>
      <Card title="Edit States">
        <Toolbar className="mb-4" left={leftStateToolbarTemplate}></Toolbar>

        <div className='col-12'>
          <DataTable value={statesState} responsiveLayout="scroll">
            <Column field="name" header="States"></Column>
            <Column header="Delete" body={deleteStateTemplate} />
          </DataTable>
        </div>
        <div className='col-6'>
          <Dropdown value={selectedStates}
            options={statesState}
            onChange={(e) => sendStateIdFromState(e.value)}
            optionLabel="name"
            optionValue='id'
            placeholder="Select a State"
          />
        </div>
      </Card>

      <Dialog header="Add States" visible={stateDialog} style={{ width: '450px' }}
        //footer={this.renderFooter('displayBasic')} 
        onHide={() => closeDialog()}>
        <form onSubmit={formik.handleSubmit} className="p-fluid">
          <div className='formgrid grid p-fluid'>
            <div className='col-12'>
              <InputText
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                placeholder="Enter New State" 
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