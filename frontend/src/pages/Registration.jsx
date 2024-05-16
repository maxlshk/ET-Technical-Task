import React from 'react'
import { NavLink } from 'react-router-dom'
import AnimatedLayout from './AnimatedLayout'

function Registration() {
    return (
        <AnimatedLayout>
            <div>Registration</div>
            <NavLink
                className='bg-blue-400'
                to='/'
            >
                Home
            </NavLink>
        </AnimatedLayout>
    )
}

export default Registration