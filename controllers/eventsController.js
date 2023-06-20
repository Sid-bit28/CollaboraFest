import Event from '../models/Event.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, UnAuthenticatedError } from '../errors/index.js';

// create new event 👇
const createEvent = async (req, res) => {
    const { title, description, intake, eventSkill } = req.body;
    if (!title || !description || !intake || !eventSkill) {
        throw new BadRequestError('Please provide all the values');
    }
    req.body.createdBy = req.user.userId;
    const event = await Event.create(req.body);
    res.status(StatusCodes.CREATED).json({ event });
};

// get all events 👇
const getAllEvents = async (req, res) => {
    res.send('get all events');
};
const updateEvent = async (req, res) => {
    res.send('update event');
};
const deleteEvent = async (req, res) => {
    res.send('delete event');
};
const showStats = async (req, res) => {
    res.send('show stats');
};

export { createEvent, getAllEvents, updateEvent, deleteEvent, showStats };
