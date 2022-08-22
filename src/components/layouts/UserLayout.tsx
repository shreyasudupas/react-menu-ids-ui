import React from 'react'
import { Outlet } from 'react-router-dom'

const UserLayout = () => {
    return (
        <>
            {/* <div>This is User Layout</div> */}
            <Outlet />
        </>

    )
}

export default UserLayout