import { readFile } from 'fs/promises';

import dotenv from 'dotenv';
dotenv.config();

import connectDB from './db/connect.js';
import Event from './models/Event.js';

const start = async () => {
    try {
        await connectDB(process.env.DB);
        await Event.deleteMany();
        const jsonProduct = JSON.parse(
            await readFile(new URL('./mock-data.json', import.meta.url))
        );
        await Event.create(jsonProduct);
        console.log('success');
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(0);
    }
};

start();
