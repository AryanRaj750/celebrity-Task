import mongoose from 'mongoose';
import database from '../../database';

const otpSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId
    },
    otp: { type: Number }
}, { timestamps: true });

otpSchema.index({createdAt:1},{expireAfterSeconds:60*10});

const otpToken = database.User.model('otpToken', otpSchema, 'otpTokens');

export default otpToken;