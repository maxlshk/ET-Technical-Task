import { Link } from 'react-router-dom';
import EventCard from './EventCard';

function EventsList({ events }) {

    return (
        <div className='w-full h-full grid grid-cols-4 gap-4 p-5 overflow-y-auto custom-scrollbar'>
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