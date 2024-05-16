import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faRightToBracket } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'

function EventCard({ to, title, description }) {
    return (
        <div className="flex flex-col max-w-sm p-6 bg-gray-100/70 backdrop-blur-md border border-gray-200 rounded-lg shadow">
            <NavLink to={to}>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {title}
                </h5>
            </NavLink>
            <p className="mb-3 font-normal text-gray-700 max-h-32 overflow-y-auto custom-scrollbar">
                {description}
            </p>
            <div className='flex justify-between mt-auto'>
                <NavLink
                    to={`${to}/registration`}
                    className="inline-flex gap-x-4 items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg
                hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                    Register
                    <FontAwesomeIcon icon={faRightToBracket} />
                </NavLink>
                <NavLink
                    to={to}
                    className="inline-flex gap-x-4 items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg
                hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                    View
                    <FontAwesomeIcon icon={faEye} />
                </NavLink>
            </div>
        </div>
    )
}

export default EventCard