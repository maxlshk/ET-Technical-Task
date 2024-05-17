import express from 'express';
import Event from '../models/event.model.js';
import User from '../models/user.model.js';

const router = express.Router();

const schema = Event.schema.obj;

const sources = ['Social Media', 'Friends', 'Found Myself'];
function getRandomFutureDate() {
    const today = new Date();
    const nextYear = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate());

    const diffTime = nextYear.getTime() - today.getTime() + 1;
    const randomTime = today.getTime() + Math.random() * diffTime;

    return new Date(randomTime);
}

router.post('/createevents', async (request, response) => {

    try {
        const eventPromises = Array.from({ length: 80 }, (v, i) => {
            return Event.create({
                title: `Event ${i + 1}`,
                description: `Description of Event ${i + 1} Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, rerum vel consequuntur animi impedit possimus temporibus provident est in dolorum doloremque dolore reprehenderit ipsa voluptate laborum voluptas suscipit sit iste fuga quaerat.`,
                date: getRandomFutureDate(),
                organizer: `Organizer ${i + 1}`,
                participants: Array.from({ length: 10 }, (v, j) => ({
                    fullName: `User ${i * 10 + j + 1}`,
                    email: `user${i * 10 + j + 1}@gmail.com`,
                    dateOfBirth: new Date(new Date().getFullYear() - 18, new Date().getMonth(), new Date().getDate()),
                    referralSource: sources[j % 3]
                }))
            });
        });

        await Promise.all(eventPromises);

        return response.status(201).send({ message: 'Events created' });

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Create Event
router.post('/', async (request, response) => {
    try {
        const missingFields = [];
        const newEvent = {};

        for (const key in schema) {
            if (schema[key].required && !request.body[key]) {
                missingFields.push(key);
            }

            newEvent[key] = request.body[key] || schema[key].default;

            if (schema[key].type === Array && !request.body[key]) {
                newEvent[key] = [];
            }
        }

        if (missingFields.length > 0) {
            return response.status(400).send({
                message: `Missing required fields: ${missingFields.join(', ')}`,
            });
        }

        const event = await Event.create(newEvent);
        return response.status(201).send(event);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Get All Events
router.get('/', async (request, response) => {

    const page = request.query.page || 1;
    const eventsPerPage = 8;

    const sortField = request.query.sort || 'title';
    const sortOrder = request.query.order === 'desc' ? -1 : 1;

    try {
        const skip = (page - 1) * eventsPerPage;

        const sortOptions = {};
        sortOptions[sortField] = sortOrder;

        const [events, totalEvents] = await Promise.all([
            Event.find({})
                .sort(sortOptions)
                .skip(skip)
                .limit(eventsPerPage),
            Event.countDocuments({})
        ]);

        return response.status(200).json({
            totalPages: Math.ceil(totalEvents / eventsPerPage),
            currentPage: page,
            eventsPerPage: eventsPerPage,
            totalEvents: totalEvents,
            data: events,
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Get Event by ID
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const event = await Event.findById(id);

        return response.status(200).json(event);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//Get all Users in an Event
router.get('/:id/participants', async (request, response) => {
    try {
        const { id } = request.params;
        const searchQuery = request.query.search;

        const event = await Event.findById(id);
        if (!event) {
            return response.status(404).send({ message: 'Event not found' });
        }

        let participants = event.participants;
        if (searchQuery) {
            participants = participants.filter(participant =>
                participant.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                participant.email.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        return response.status(200).json(participants);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});


// Add User to Event
router.post('/:id/participants', async (request, response) => {
    try {
        const { id } = request.params;
        const userData = request.body;

        const event = await Event.findById(id);
        if (!event) {
            return response.status(404).send({ message: 'Event not found' });
        }

        const isAlreadyParticipant = event.participants.some(participant => participant.email === userData.email);
        if (isAlreadyParticipant) {
            return response.status(400).send({ message: 'User already participates in event' });
        }

        event.participants.push(userData);
        await event.save();

        return response.status(200).send(event);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});


export default router;