import React, { useState, useEffect } from 'react';
import { useLoaderData, useNavigate, useLocation } from 'react-router-dom';
import { Suspense } from 'react';
import { json, defer, Await } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import EventsList from '../components/EventsList';
import AnimatedLayout from './AnimatedLayout';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const options = [
    'Title',
    'Date',
    'Organizer',
]
function HomePage() {
    const { events } = useLoaderData();
    const navigate = useNavigate();
    const location = useLocation();

    const query = new URLSearchParams(location.search);
    const currentPage = parseInt(query.get("page") || "1", 10);
    const currentSort = query.get("sort") || "title";
    const currentOrder = query.get("order") || "asc";

    const [page, setPage] = useState(currentPage);
    const [sort, setSort] = useState(currentSort);

    const handlePageChange = (event, value) => {
        setPage(value);
        navigate(`/?sort=${currentSort}&order=${currentOrder}&page=${value}`);
    };

    const onSort = (option) => {
        const sort = option.value.toLowerCase();
        setSort(sort);
        navigate(`/?sort=${sort}&order=${currentOrder}&page=${page}`);
    }

    return (

        <div className='flex flex-1 flex-col justify-between px-8 py-4'>
            <div className='flex justify-between items-center'>
                <span className='font-bold text-3xl'>Events</span>
                <Dropdown
                    options={options}
                    onChange={onSort}
                    value={`Sort by ${sort}`}
                />
            </div>
            <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
                <Await resolve={events}>
                    {(loadedEvents) => (
                        <>
                            <AnimatedLayout>
                                <EventsList events={loadedEvents.data} />
                            </AnimatedLayout>
                            <Pagination
                                className='flex justify-center'
                                count={loadedEvents.totalPages}
                                page={page}
                                onChange={handlePageChange}
                            />
                        </>
                    )}
                </Await>
            </Suspense>
        </div>

    );
}

export default HomePage;


async function loadEvents(sort = 'title', order = 'asc', page = 1) {
    const response = await fetch(`http://localhost:5000/events?sort=${sort}&order=${order}&page=${page}`);

    if (!response.ok) {
        throw json(
            { message: 'Could not fetch events.' },
            {
                status: 500,
            }
        );
    } else {
        const resData = await response.json();
        console.log(resData);
        return resData;
    }
}

export function loader({ request }) {
    const url = new URL(request.url);
    const sortBy = url.searchParams.get("sort") || "title";
    const sortOrder = url.searchParams.get("order") || "asc";
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    return defer({
        events: loadEvents(sortBy, sortOrder, page),
    });
}