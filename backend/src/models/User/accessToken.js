import mongoose from 'mongoose';
import database from '../../database';

const tokenSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    accessToken: { type: String, unique: true }

}, { timestamps: false });

tokenSchema.index({createdAt:1},{expireAfterSeconds:60*60*24*365});

const accessToken = database.User.model('AccessToken', tokenSchema, 'AccessTokens');

export default accessToken;