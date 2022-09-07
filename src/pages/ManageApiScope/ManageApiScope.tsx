import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

export const ManageApiScope = () => {
    const { apiScopeId } = useParams();
    const [manageApiScope, setManageApiScope] = useState({
        id: 1, name: 'inventoryApi', displayName: 'Menu Inventory', description: ''
    });

    const handleInput = (event: any) => {
        setManageApiScope({
            ...manageApiScope,
            [event.target.name]: event.target.value
        })
    }

    const footer = (
        <span>
            <Button label="Save" icon="pi pi-check" />
            <Button label="Cancel" icon="pi pi-times" className="p-button-secondary ml-2" />
        </span>
    );

    return (
        <React.Fragment>
            <Card title="Manage Api Scope" footer={footer}>
                <div className='formgrid grid p-fluid'>
                    <div className='col-6'>
                        <div className='field col-12 p-3'>
                            <span className="p-float-label">
                                <InputText
                                    id="name"
                                    name="name"
                                    value={manageApiScope.name}
                                    onChange={(e) => handleInput(e)}
                                />
                                <label htmlFor="name">Name</label>
                            </span>
                        </div>
                        <div className='field col-12 p-3'>
                            <span className="p-float-label">
                                <InputText
                                    id="displayName"
                                    name="displayName"
                                    value={manageApiScope.displayName}
                                    onChange={(e) => handleInput(e)}
                                />
                                <label htmlFor="displayName">Display Name</label>
                            </span>
                        </div>
                        <div className='field col-12 p-3'>
                            <span className="p-float-label">
                                <InputText
                                    id="description"
                                    name="description"
                                    value={manageApiScope.displayName}
                                    onChange={(e) => handleInput(e)}
                                    placeholder="Description" />
                                <label htmlFor="description">Description</label>
                            </span>
                            
                        </div>
                    </div>
                </div>
            </Card>
        </React.Fragment>
    )
}