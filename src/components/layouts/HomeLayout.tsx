import React from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { InputText } from 'primereact/inputtext';
import { Menubar } from 'primereact/menubar';
import '../App.css';
import { useAuth } from '../../context/useAuth';

const HomeLayout = () => {
  const auth = useAuth()
  const navigate = useNavigate()

  const items = [
    {
      label: 'Home',
      icon: 'pi pi-home',
      command: () => { navigate('') }

    },
    {
      label: 'Login',
      icon: 'pi pi-fw pi-unlock',
      command: () => { 
        auth.signinRedirect()
      }
    }
  ]

      if(auth.isAuthenticated()){
        return <Navigate to="user" />
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

export default HomeLayout