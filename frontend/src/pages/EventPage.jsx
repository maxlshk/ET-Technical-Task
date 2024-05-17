import React from 'react'
import AnimatedLayout from './AnimatedLayout'
import {
    useLoaderData,
    json,
    defer,
    Await,
    NavLink,
} from 'react-router-dom';
import { Suspense } from 'react'
import UsersList from '../components/UsersList'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import SearchInput from '../components/SearchInput'

function EventPage() {
    const { event, participants } = useLoaderData();

    return (
        <div className='flex flex-1 flex-col px-8 py-4'>
            <div className='flex justify-between items-center'>
                <NavLink to='/' className='inline-flex items-center gap-x-3 text-black'>
                    <FontAwesomeIcon icon={faChevronLeft} />
                    <span className='text-2xl'>Back to Events</span>
                </NavLink>
                <SearchInput />
                <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
                    <Await resolve={event}>
                        {(event) => <span className='font-bold text-2xl'>{event.title} Participants</span>}
                    </Await>
                </Suspense>
            </div>
            <AnimatedLayout>
                <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
                    <Await resolve={participants}>
                        {(loadedParticipants) => <UsersList users={loadedParticipants} />}
                    </Await>
                </Suspense>
            </AnimatedLayout>
        </div>
    )
}

export default EventPage

async function loadParticipants(id, search) {
    console.log(`http://localhost:5000/events/${id}/participants?search=${search}`);
    const response = await fetch(`http://localhost:5000/events/${id}/participants?search=${search}`);

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
    const url = new URL(request.url);
    const id = params.id;
    const search = url.searchParams.get("search") || "";

    return defer({
        event: await loadEvent(id),
        participants: await loadParticipants(id, search),
    });
}