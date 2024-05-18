import React from 'react'
import { useState } from 'react'
import { Form, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

function SearchInput() {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const searchValue = query.get('search') || '';
    const [search, setSearch] = useState(searchValue)
    function onSearchChange(e) {
        setSearch(e.target.value)
    }

    return (
        <Form method='get' className='my-2 w-1/5'>
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center px-3 pointer-events-none">
                    <FontAwesomeIcon icon={faMagnifyingGlass} className='text-gray-700' />
                </div>
                <input type="search" name="search" value={search} onChange={onSearchChange} id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-cyan-500 focus:border-cyan-500" placeholder="Search Event Participants" />
                <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-4 py-2">Search</button>
            </div>
        </Form>
    )
}

export default SearchInput