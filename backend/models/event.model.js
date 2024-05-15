import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Event title is required'],
        minlength: [5, 'Title must be at least 5 characters'],
        maxlength: [100, 'Title cannot exceed 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Event description is required'],
        minlength: [10, 'Description must be at least 10 characters'],
        maxlength: [500, 'Description cannot exceed 500 characters']
    },
    date: {
        type: Date,
        required: [true, 'Event date is required'],
        min: [new Date(), 'Event date cannot be in the past']
    },
    organizer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'An organizer is required']
    },
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
    ],
});

const Event = mongoose.model("Event", eventSchema);
export default Event;
