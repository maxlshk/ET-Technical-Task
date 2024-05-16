import React from 'react'
import { Suspense } from 'react';
import { useLoaderData, json, defer, Await } from 'react-router-dom';
import EventsList from '../components/EventsList';
import AnimatedLayout from './AnimatedLayout';

function HomePage() {
    const { events } = useLoaderData();

    return (
        <AnimatedLayout>
            <div className='p-8'>
                <div className='font-bold text-3xl'>Events</div>
                <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
                    <Await resolve={events}>
                        {(loadedEvents) => <EventsList events={loadedEvents} />}
                    </Await>
                </Suspense>
            </div>
        </AnimatedLayout>
    )
}

export default HomePage

async function loadEvents() {
    const response = await fetch('http://localhost:5000/events');

    if (!response.ok) {
        throw json(
            { message: 'Could not fetch events.' },
            {
                status: 500,
            }
        );
    } else {
        const resData = await response.json();
        console.log(resData.data);
        return resData.data;
    }
}

export function loader() {
    return defer({
        events: loadEvents(),
    });
}