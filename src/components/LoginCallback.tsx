import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

const LoginCallback = () => {
    const auth = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
      
        async function signinAsync() {
          //console.log('Before callback')
          await auth.signinRedirectCallback()     
          //console.log('After callback')
          navigate('/user') 
        }
        signinAsync()
        
      }, [navigate])
      
  return (
    <div>Navigating.....</div>
  )
}

export default LoginCallback