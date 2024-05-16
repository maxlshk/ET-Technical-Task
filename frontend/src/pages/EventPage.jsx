import React from 'react'
import { NavLink } from 'react-router-dom'

function EventPage() {
    return (
        <><div>EventPage</div><NavLink
            className='bg-blue-400'
            to='..'
        >
            Home
        </NavLink></>
    )
}

export default EventPage