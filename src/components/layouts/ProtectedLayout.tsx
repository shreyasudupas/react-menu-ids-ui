import { InputText } from 'primereact/inputtext'
import { Menubar } from 'primereact/menubar'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/useAuth'
import '../App.css'

const ProtectedLayout = () => {
    const auth = useAuth()
    const navigate = useNavigate()
    let isAdmin:string = 'Loading'

    const items = [
        {
            label: 'Edit',
            icon: 'pi pi-fw pi-pencil',
            items: [
                {
                    label: 'API Scopes',
                    icon: 'pi pi-fw pi-align-left',
                    command: () => { navigate('operation/apiscope') }
                },
                {
                    label: 'User Roles',
                    icon: 'pi pi-fw pi-align-right',
                    command: () => { navigate('operation/userRoleList') }
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
                    command: () => { navigate('user') }
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
                    command: () => { navigate('user/list') }

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
     } //else {
    //     //call the isAdminRole
    //     isAdmin = auth.userRoleIsAdmin()
    // }

    //This will give the result once promise will finish giving its result
    useEffect(() => {
        async function checkIfAdmin() {
            let role = await auth.userRoleIsAdmin()

            if (role !== "admin") {
                navigate('/access-denied')
            }
        }
        checkIfAdmin()
    }, [isAdmin])

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
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default ProtectedLayout