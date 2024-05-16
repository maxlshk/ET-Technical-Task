import { Link } from 'react-router-dom';
import EventCard from './EventCard';

function EventsList({ events }) {

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-6 overflow-y-auto custom-scrollbar'>
            {events.map((event) => (
                <EventCard
                    key={event._id}
                    to={event._id}
                    title={event.title}
                    description={event.description}
                />
            ))}
        </div>
    );
}

export default EventsList;