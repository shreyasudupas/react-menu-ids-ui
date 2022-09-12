import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import React, { useEffect, useReducer, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAddRole } from '../../graphQL/mutation/useAddRole';
import { useSaveRole } from '../../graphQL/mutation/useSaveRole';
import { useGetRoleById } from '../../graphQL/query/useGetRoleById';
import { ManageRoleAction, ManageRoleState } from './ManageRoleType';

const initialState:ManageRoleState = {
    headerName: "Edit Role",
    role: { roleId:"0",roleName:"" }
}

const reducer = (state:ManageRoleState,action:ManageRoleAction):ManageRoleState => {
    switch(action.type){
        case 'UPDATE_ROLE':
            //console.log('Update Role')
            return {
                ...state,
                role: action.role
            }
        case 'UPDATE_HEADER':
            //console.log('Update Header')
            return {
                ...state,
                headerName:action.header
            }
        case 'MODIFY_ROLE':
            return {
                ...state,
                role:{...state.role,roleName:action.value}
            }
    }
}

export const UserRole = () => {
    const navigate = useNavigate();
    const [state,dispatch] = useReducer(reducer,initialState);
    let { roleId } = useParams();
    const { data } = useGetRoleById((roleId !== undefined)?roleId:"")
    const [ addNewRole ] = useAddRole();
    const [ saveRole ] =  useSaveRole(state.role);
    const toast = useRef<any>(null);
    const RolesUrl:string = "/operation/roleList";

    //console.log(state)

    const showError = (message:string) => {
        toast.current.show({severity:'error', summary: 'Error Message', detail:message, life: 3000});
    }

    const showSuccess = (message:string) => {
        toast.current.show({severity:'success', summary: 'Success Message', detail:message, life: 3000});
    }

    useEffect(() => {

        if(roleId === "0"){
            dispatch({type:'UPDATE_HEADER',header:'Add Role'})
        }

        if(data !== undefined){
            if(data.role !== null )
                dispatch({type:'UPDATE_ROLE',role: data.role})
        }
        
    },[data])

    const footer = (
        <span>
            {(roleId === "0") ? <Button label="Add" icon="pi pi-plus" onClick = {()=> AddNewRole()} /> : <Button label="Save" icon="pi pi-check" onClick={(e)=> SaveRole()}/>}
            <Button label="Cancel" icon="pi pi-times" className="p-button-secondary ml-2" onClick={() => Back()} />
        </span>
    );

    const AddNewRole = () => {
        addNewRole({
            variables:{
                newRole:{
                    roleId:state.role.roleId,
                    roleName:state.role.roleName
            }}
        }).then((result)=>{
            if(result!=="0"){
                navigate(RolesUrl)
            }
            else{
                showError("Error Adding Role");
            }
        })
    }

    const SaveRole = () => {
        saveRole({
            variables:{
                roleId:state.role.roleId,
                roleName:state.role.roleName
            }
        }).then((res) => {
            if(res.data?.saveRole !== null){
                showSuccess("Role Saved");
            }
        }).catch((err)=> {
            console.log(err);
            showError("Error in Saving Role");
        })
    }

    const Back = () => {
        return navigate(RolesUrl);
    }

    
    const handleInput = (event:any) => {
        dispatch({ type:'MODIFY_ROLE',value: event.target.value })
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
                                  value={state.role.roleName}
                                  onChange={(e) => handleInput(e)}
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