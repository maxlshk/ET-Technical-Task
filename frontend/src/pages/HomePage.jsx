import React, { useState } from 'react';
import { useLoaderData, useNavigate, useLocation } from 'react-router-dom';
import { Suspense } from 'react';
import { json, defer, Await } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import EventsList from '../components/EventsList';
import AnimatedLayout from './AnimatedLayout';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

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
        const sortValue = option.value.toLowerCase();
        if (sort === sortValue) {
            if (currentOrder === 'asc') {
                navigate(`/?sort=${sortValue}&order=desc&page=${page}`);
                return;
            }
            else {
                navigate(`/?sort=${sortValue}&order=asc&page=${page}`);
                return;
            }
        }
        setSort(sortValue);
        navigate(`/?sort=${sortValue}&order=${currentOrder}&page=${page}`);
    }

    return (

        <div className='flex flex-1 flex-col justify-between px-8 py-4'>
            <div className='flex justify-between items-center'>
                <span className='font-bold text-3xl'>Events</span>
                <Dropdown
                    options={options}
                    onChange={onSort}
                    value={`Sort by ${sort} (${currentOrder})`}
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
    const response = await fetch(`${API_BASE_URL}/events?sort=${sort}&order=${order}&page=${page}`);

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