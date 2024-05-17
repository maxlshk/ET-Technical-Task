import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Full name is required'],
        minlength: [5, 'Name must be at least 5 characters'],
        maxlength: [40, 'Name cannot exceed 40 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        lowercase: true,
        trim: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    dateOfBirth: {
        type: Date,
        required: [true, 'Date of birth is required']
    },
    referralSource: {
        type: String,
        required: false
    }
});

export default userSchema;
