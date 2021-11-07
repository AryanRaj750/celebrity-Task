import mongoose from 'mongoose';
import database from '../database/';

const userSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: { type: String, require: true },
    gender: { type: String, require: true },
    age: { type: String, require: true },
    profileImage: String,
    phoneNumber: String,
    surveys: []
}, { timestamps: true });

export default database.User.model('Coordinator', userSchema, 'Coordinators');