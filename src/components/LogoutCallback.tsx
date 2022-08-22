import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

const LogoutCallback = () => {
    const auth = useAuth()
    const navigate = useNavigate()

    useEffect(()=>{
        async function signout(){
            await auth.signoutRedirectCallback()

            console.log('Logout successful')
        }
        signout()
    },[navigate])
    
    return <div>{'Logging out Please wait.......'}</div>
}

export default LogoutCallback