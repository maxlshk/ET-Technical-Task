import React from 'react'
import { NavLink } from 'react-router-dom'

function Registration() {
    return (
        <>
            <div>Registration</div>
            <NavLink
                className='bg-blue-400'
                to='/'
            >
                Home
            </NavLink>
        </>
    )
}

export default Registration