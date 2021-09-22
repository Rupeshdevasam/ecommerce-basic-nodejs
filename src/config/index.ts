import dotenv from 'dotenv';

const envFound = dotenv.config({ path: `./.env.${process.env.NODE_ENV}` });
if (envFound.hasOwnProperty('error')) throw new Error("Couldn't find .env file");

export default {
    APP_PORT: process.env.APP_PORT,
    MONGO_URI: process.env.MONGO_URI
};
