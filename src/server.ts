import app from "./app";
import config from './config';

// server listening 
app.listen(config.APP_PORT, () => console.log(`Server listening on port ${config.APP_PORT} - env: ${process.env.NODE_ENV}`));


export { app };