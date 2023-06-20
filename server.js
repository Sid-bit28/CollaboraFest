// Always import with .js in module type imports.
import express from 'express';
const app = express();
import dotenv from 'dotenv';
dotenv.config();

// Remove try catch from every controller and throws error to the error-handler middleware
import 'express-async-errors';

// track the logging and request
import morgan from 'morgan';

// Database and authentication
import connectDB from './db/connect.js';

// Routers
import authRouter from './routes/authRoutes.js';
import eventsRouter from './routes/eventsRoutes.js';

// Middleware
import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';
import authenticateUser from './middleware/auth.js';

// only for development purpose
if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'));
}

// JSON middleware to access JSON data.
app.use(express.json());

// Dummy Route
app.get('/', (req, res) => {
    res.json({ msg: 'Welcome User' });
});

app.get('/api/v1', (req, res) => {
    res.json({ msg: 'API' });
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/events', authenticateUser, eventsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
const port = process.env.PORT || 5000;

const start = async () => {
    try {
        await connectDB(process.env.DB);
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();
