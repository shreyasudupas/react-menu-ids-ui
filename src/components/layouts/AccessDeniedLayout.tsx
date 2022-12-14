import { InputText } from 'primereact/inputtext';
import { Menubar } from 'primereact/menubar';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import AccessDenied from '../../pages/AccessDenied';

const AccessDeniedLayout = () => {
    const auth = useAuth()
    const navigate = useNavigate()

    const items = [
        {
            label: 'Edit',
            icon: 'pi pi-fw pi-pencil',
            items: [
                {
                    label: 'Left',
                    icon: 'pi pi-fw pi-align-left'
                },
                {
                    label: 'Right',
                    icon: 'pi pi-fw pi-align-right'
                },
                {
                    label: 'Center',
                    icon: 'pi pi-fw pi-align-center'
                },
                {
                    label: 'Justify',
                    icon: 'pi pi-fw pi-align-justify'
                },

            ]
        },
        {
            label: 'Users',
            icon: 'pi pi-fw pi-user',
            items: [
                {
                    label: 'Dashboard',
                    icon: 'pi pi-fw pi-id-card',
                    command: () => { navigate('user/me') }
                },
                {
                    label: 'New',
                    icon: 'pi pi-fw pi-user-plus',

                },
                {
                    label: 'Delete',
                    icon: 'pi pi-fw pi-user-minus',

                },
                {
                    label: 'List',
                    icon: 'pi pi-fw pi-list',
                    command: () => { navigate('user/lists') }

                }
            ]
        },
        {
            label: 'Logout',
            icon: 'pi pi-fw pi-power-off',
            command: () => { handleLogout() }
        }
    ];

    if (!auth.isAuthenticated()) {
        auth.signinRedirect()
    }

    const handleLogout = () => {
        auth.logout()
    }

    const start = <img alt="logo" src="assets/menu/MenuLogo1.png"
        height="40" className="mr-2"></img>;
    const end = <InputText placeholder="Search" type="text" />;

    return (
        <>
            <Menubar model={items} start={start} end={end} />
            <div className='App-Logo'>
                <div className='App-login'>
                    <AccessDenied />
                </div>
            </div>
        </>
    )
}

export default AccessDeniedLayout