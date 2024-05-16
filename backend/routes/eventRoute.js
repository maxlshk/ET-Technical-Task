import express from 'express';
import Event from '../models/event.model.js';
import User from '../models/user.model.js';

const router = express.Router();

const schema = Event.schema.obj;

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
    try {
        const events = await Event.find({});

        return response.status(200).json({
            count: events.length,
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

        const event = await Event.findById(id);

        if (!event) {
            return response.status(404).send({ message: 'Event not found' });
        }

        const participantsIds = event.participants;
        const organizerId = event.organizer;

        const participants = await Promise.all(
            participantsIds.map(participantId => User.findById(participantId))
        );

        const organizer = await User.findById(organizerId);
        participants.unshift(organizer);

        const validParticipants = participants.filter(user => user !== null);

        return response.status(200).json(validParticipants);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});


// Add User to Event
router.post('/:id/participants/:userId', async (request, response) => {
    try {
        const { id } = request.params;
        const { userId } = request.params;

        const event = await Event.findById(id);
        const user = await User.findById(userId);

        if (!event) {
            return response.status(404).send({ message: 'Event not found' });
        }

        if (!user) {
            return response.status(404).send({ message: 'User not found' });
        }

        if (event.participants.includes(userId) || event.organizer === userId) {
            return response.status(400).send({ message: 'User already participates in event' });
        }

        event.participants.push(userId);
        await event.save();

        return response.status(200).send(event);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;