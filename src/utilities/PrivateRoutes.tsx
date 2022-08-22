import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import PageNotFound from '../pages/PageNotFound'

function PrivateRoutes() {
    let auth = false
  return (
    auth? <Outlet /> : <Navigate to="/not-found"/>
  )
}

export default PrivateRoutes