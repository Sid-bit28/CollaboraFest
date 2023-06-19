import mongoose from 'mongoose';
import validator from 'validator';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name'],
        trim: true,
        minlength: [3, 'Name must be at least 3 characters'],
        maxlength: [20, 'Name must be less than 20 characters'],
    },
    email: {
        type: String,
        required: [true, 'Please provide email'],
        validate: {
            validator: validator.isEmail,
            message: 'Please provide valid email',
        },
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide name'],
        minlength: [6, 'password must be at least 6 characters'],
    },
    lastName: {
        type: String,
        trim: true,
        maxlength: [20, 'Lastname must be less than 20 characters'],
        default: 'lastName',
    },
    skill: {
        type: String,
        trim: true,
        maxlength: [20, 'Skill must be less than 20 characters'],
        default: 'MERN',
    },
});

export default mongoose.model('User', UserSchema);
