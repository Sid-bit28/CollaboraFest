import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please provide title'],
            minlength: [3, 'Title must be at least 3 characters'],
            maxlength: [50, 'Title must be less than 50 characters'],
        },
        description: {
            type: String,
            required: [true, 'Please provide description'],
            minlength: [3, 'Description must be at least 3 characters'],
            maxlength: [200, 'Description must be less than 200 characters'],
        },
        intake: {
            type: Number,
            required: [true, 'Please provide a number'],
            min: 1,
        },
        eventSkill: {
            type: String,
            maxlength: [50, 'skill must be less than 50 characters'],
            default: 'MERN',
            required: true,
        },
        members: {
            type: Array,
            default: [],
        },
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: [true, 'Please provide user'],
        },
        creator: {
            type: String,
            default: '',
        },
    },
    { timestamps: true }
);

export default mongoose.model('Event', EventSchema);
