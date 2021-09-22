import mongoose from 'mongoose';
import config from '../config';

export default class Database {
    public async connect(): Promise<void> {
        try {
            await mongoose.connect(config.MONGO_URI,
                {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                } as any);
            console.log("Successfully connected to database");
        } catch (error) {
            console.log("database connection failed. exiting now...");
            console.error(error);
            process.exit(1);
        }
    }
}