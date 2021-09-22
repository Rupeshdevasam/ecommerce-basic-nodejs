import express from 'express';
import { json, urlencoded } from 'body-parser';
import { notFoundMiddleware, errorMiddleware } from './middleware/errorhandling';
import Database from './config/database';
import cors from 'cors';
import routes from './routes';


class App {
    public app: express.Application;
    constructor() {
        this.app = express();
        this.config();
        new Database().connect();
    }

    private config(): void {
        this.app.use(cors());

        this.app.use(json());

        this.app.use(urlencoded({ extended: true }));

        this.app.use('/orders', routes);

        this.app.use(notFoundMiddleware);

        this.app.use(errorMiddleware);

    }
}

export default new App().app;