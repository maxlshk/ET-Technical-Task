import React from 'react'
import AnimatedLayout from './AnimatedLayout'
import {
    useLoaderData,
    json,
    redirect,
    defer,
    Await,
    NavLink,
} from 'react-router-dom';
import { Suspense } from 'react'
import UsersList from '../components/UsersList'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

function EventPage() {
    const { event, participants } = useLoaderData();

    return (
        <AnimatedLayout>
            <div className='p-8'>
                <div className='flex justify-between'>
                    <NavLink to='/' className='inline-flex items-center gap-x-3 text-black'>
                        <FontAwesomeIcon icon={faChevronLeft} />
                        <span className='text-2xl'>Back to Events</span>
                    </NavLink>
                    <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
                        <Await resolve={event}>
                            {(event) => <span className='font-bold text-3xl'>{event.title} Event Participants</span>}
                        </Await>
                    </Suspense>
                </div>
                <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
                    <Await resolve={participants}>
                        {(loadedParticipants) => <UsersList users={loadedParticipants} />}
                    </Await>
                </Suspense>
            </div>
        </AnimatedLayout>
    )
}

export default EventPage

async function loadParticipants(id) {
    const response = await fetch(`http://localhost:5000/events/${id}/participants`);

    if (!response.ok) {
        throw json(
            { message: 'Could not fetch participants.' },
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

async function loadEvent(id) {
    const response = await fetch(`http://localhost:5000/events/${id}`);

    if (!response.ok) {
        throw json(
            { message: 'Could not fetch participants.' },
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

export async function loader({ request, params }) {
    const id = params.id;

    return defer({
        event: await loadEvent(id),
        participants: await loadParticipants(id),
    });
}