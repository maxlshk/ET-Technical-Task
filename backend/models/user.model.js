import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Full name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
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

const User = mongoose.model('User', userSchema);
export default User;
