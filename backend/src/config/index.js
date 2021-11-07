import dotenv from 'dotenv';

dotenv.config();

export const {
    PORT,
    DB_URL,
    DEBUG_MODE,
    JWT_SECRET,
    REFRESH_SECRET,
    APP_URL,
    TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN,
    HASH_SECRET,
    SMS_FROM_NUMBER,
    EMAIL_USERNAME,
    EMAIL_PASSWORD,
    AWS_S3_ACCESS_KEY,
    AWS_S3_SECRET_KEY,
    AWS_S3_REGION,
    AWS_S3_BUCKET

} = process.env;