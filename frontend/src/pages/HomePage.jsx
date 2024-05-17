import React, { useState, useEffect } from 'react';
import { useLoaderData, useNavigate, useLocation } from 'react-router-dom';
import { Suspense } from 'react';
import { json, defer, Await } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import EventsList from '../components/EventsList';
import AnimatedLayout from './AnimatedLayout';

function HomePage() {
    const { events } = useLoaderData();
    const navigate = useNavigate();
    const location = useLocation();

    const query = new URLSearchParams(location.search);
    const currentPage = parseInt(query.get("page") || "1", 10);

    const [page, setPage] = useState(currentPage);

    useEffect(() => {
        setPage(currentPage);
    }, [currentPage]);

    const handlePageChange = (event, value) => {
        setPage(value);
        navigate(`/?page=${value}`);
    };

    return (

        <div className='flex flex-1 flex-col justify-between p-8'>
            <div className='flex font-bold text-3xl'>Events</div>
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


async function loadEvents(page = 1) {
    const response = await fetch(`http://localhost:5000/events?page=${page}`);

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
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    return defer({
        events: loadEvents(page),
    });
}