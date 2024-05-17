import EventCard from './EventCard';

function formatDate(dateString) {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');  // getMonth() is zero-based
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
}

function EventsList({ events }) {

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-6 overflow-y-auto custom-scrollbar'>
            {events.map((event) => (
                <EventCard
                    key={event._id}
                    to={event._id}
                    title={event.title}
                    date={formatDate(event.date)}
                    description={event.description}
                />
            ))}
        </div>
    );
}

export default EventsList;