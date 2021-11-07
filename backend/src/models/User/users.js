import mongoose from 'mongoose';
import database from '../../database';

const userSchema = mongoose.Schema({
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    userType: {type: String, enum: ["coordinator", "respondent"]},
    emailVerified: { type: Boolean, default: false },
    accountStatus: { type: String,
        enum: ['active', 'deactive', 'delete'],
        default: 'active'
    }
}, { timestamps: true });

export default database.User.model('User', userSchema, 'Users');