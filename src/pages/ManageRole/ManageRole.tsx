import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import React, { useEffect, useReducer, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetRoleById } from '../../graphQL/query/useGetRoleById';
import { Role } from '../RoleList/RoleType';
import { ManageRoleAction, ManageRoleState } from './ManageRoleType';

const initialState:ManageRoleState = {
    headerName: "Edit Role",
    role:null
}

const reducer = (state:ManageRoleState,action:ManageRoleAction):ManageRoleState => {
    switch(action.type){
        case 'UPDATE_ROLE':
            return {
                ...state,
                role: action.role
            }
        case 'UPDATE_HEADER':
            return {
                ...state,
                headerName:action.header
            }
    }
}

export const UserRole = () => {
    const navigate = useNavigate();
    const [state,dispatch] = useReducer(reducer,initialState);
    let { roleId } = useParams();
    const { data } = useGetRoleById((roleId !== undefined)?roleId:"")

    useEffect(() => {

        if(roleId === "0"){
            dispatch({type:'UPDATE_HEADER',header:'Add Role'})
        }

        if(data !== undefined){
            dispatch({type:'UPDATE_ROLE',role: data.role})
        }

        if(data?.role === null){
            let r : Role = {roleId:'',roleName:''} 
            dispatch({type:'UPDATE_ROLE',role: r})
        }
    },[data,roleId])

    const footer = (
        <span>
            <Button label="Save" icon="pi pi-check" />
            <Button label="Cancel" icon="pi pi-times" className="p-button-secondary ml-2" onClick={ ()=> Back() }/>
            <Button label="Delete" icon="pi pi-trash" className="p-button-danger ml-2" />
        </span>
    );

    const Back = () => {
        return navigate('/operation/roleList');
    }

  return (
      <React.Fragment>
          <Card title={state.headerName} footer={footer}>
              <div className='formgrid grid p-fluid'>
                  <div className='col-6'>
                      <div className='field col-12 p-3'>
                          <span className="p-float-label">
                              <InputText
                                  id="roleName"
                                  name="roleName"
                                  value={state.role?.roleName}
                                  onChange={(e) => dispatch({type:'UPDATE_ROLE',role: {roleId:state.role?.roleId! , roleName: state.role?.roleName!}})}
                              />
                              <label htmlFor="roleName">Role Name</label>
                          </span>
                      </div>
                  </div>
              </div>
          </Card>
      </React.Fragment>
  )
}