import React from 'react'

function UserCard({ name, email, organizer }) {
    return (
        <div className="flex flex-col max-w-sm p-6 bg-gray-100/70 backdrop-blur-md border border-gray-200 rounded-lg shadow">

            <h5 className="flex justify-between mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {name}
                {organizer && <span className='text-base text-gray-600'>organizer</span>}
            </h5>
            <p className="mb-3 font-normal text-gray-700 max-h-32 overflow-y-auto custom-scrollbar">
                {email}
            </p>
        </div>
    )
}

export default UserCard