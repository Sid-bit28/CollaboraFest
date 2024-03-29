import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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
        select: false,
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

// generate hash password
UserSchema.pre('save', async function () {
    // console.log(this.modifiedPaths());
    if (!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
    return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME,
    });
};

UserSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
};

export default mongoose.model('User', UserSchema);
