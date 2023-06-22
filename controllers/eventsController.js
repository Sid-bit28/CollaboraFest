import Event from '../models/Event.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, NotFoundError } from '../errors/index.js';
import checkPermissions from '../utils/checkPermissions.js';

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
    const { eventSkill, sort, search } = req.query;
    const query = {
        createdBy: { $ne: req.user.userId },
        'pendingMembers.id': { $ne: req.user.userId },
        'rejectedMembers.id': { $ne: req.user.userId },
        'acceptedMembers.id': { $ne: req.user.userId },
    };

    // event skill sort 👇
    if (eventSkill) {
        query.eventSkill = { $regex: eventSkill, $options: 'i' };
    }

    // search title sort 👇
    if (search) {
        query.title = { $regex: search, $options: 'i' };
    }
    let result = Event.find(query);

    // sort 👇
    if (sort === 'latest') {
        result = result.sort('-createdAt');
    }
    if (sort === 'oldest') {
        result = result.sort('createdAt');
    }
    if (sort === 'a-z') {
        result = result.sort('title');
    }
    if (sort === 'z-a') {
        result = result.sort('-title');
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const skip = (page - 1) * limit;
    result = result.skip(skip).limit(limit);
    const events = await result;

    const totalEvents = await Event.countDocuments(query);
    const numOfPages = Math.ceil(totalEvents / limit);

    res.status(StatusCodes.OK).json({
        events,
        totalEvents,
        numOfPages,
    });
};

// update events 👇
const updateEvent = async (req, res) => {
    const { id: eventId } = req.params;
    const { title, description, intake, eventSkill } = req.body;
    if (!title || !description || !eventSkill || !intake) {
        throw new BadRequestError('Please provide all the values');
    }
    const event = await Event.findOne({ _id: eventId });
    if (!event) {
        throw new NotFoundError('Event not found');
    }

    // check for permissions 👇
    checkPermissions(req.user, event.createdBy);

    const updateEvent = await Event.findOneAndUpdate(
        { _id: eventId },
        req.body,
        {
            new: true,
            runValidators: true,
        }
    );
    res.status(StatusCodes.OK).json({ updateEvent });
};

// delete events 👇
const deleteEvent = async (req, res) => {
    const { id: eventId } = req.params;
    const event = await Event.findOne({ _id: eventId });
    if (!event) {
        throw new NotFoundError('Event not found');
    }

    // check for permissions 👇
    checkPermissions(req.user, event.createdBy);

    await event.deleteOne();
    res.status(StatusCodes.OK).json({ msg: 'Success event removed.' });
};

const getMyEvents = async (req, res) => {
    const { eventSkill, sort, search } = req.query;
    const query = {
        createdBy: req.user.userId,
    };

    // event skill sort 👇
    if (eventSkill) {
        query.eventSkill = { $regex: eventSkill, $options: 'i' };
    }

    // search title sort 👇
    if (search) {
        query.title = { $regex: search, $options: 'i' };
    }
    let result = Event.find(query);

    // sort 👇
    if (sort === 'latest') {
        result = result.sort('-createdAt');
    }
    if (sort === 'oldest') {
        result = result.sort('createdAt');
    }
    if (sort === 'a-z') {
        result = result.sort('title');
    }
    if (sort === 'z-a') {
        result = result.sort('-title');
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const skip = (page - 1) * limit;
    result = result.skip(skip).limit(limit);
    const events = await result;

    const totalEvents = await Event.countDocuments(query);
    const numOfPages = Math.ceil(totalEvents / limit);

    res.status(StatusCodes.OK).json({
        events,
        totalEvents,
        numOfPages,
    });
};

const pendingRequests = async (req, res) => {
    const { eventSkill, sort, search } = req.query;
    const query = {
        createdBy: req.user.userId,
        pendingMembers: { $exists: true, $ne: [] },
    };

    // event skill sort 👇
    if (eventSkill) {
        query.eventSkill = { $regex: eventSkill, $options: 'i' };
    }

    // search title sort 👇
    if (search) {
        query.title = { $regex: search, $options: 'i' };
    }
    let result = Event.find(query);

    // sort 👇
    if (sort === 'latest') {
        result = result.sort('-createdAt');
    }
    if (sort === 'oldest') {
        result = result.sort('createdAt');
    }
    if (sort === 'a-z') {
        result = result.sort('title');
    }
    if (sort === 'z-a') {
        result = result.sort('-title');
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const skip = (page - 1) * limit;
    result = result.skip(skip).limit(limit);
    const events = await result;

    const totalEvents = await Event.countDocuments(query);
    const numOfPages = Math.ceil(totalEvents / limit);

    res.status(StatusCodes.OK).json({
        events,
        totalEvents,
        numOfPages,
    });
};

const sendRequests = async (req, res) => {
    const { id, name, message } = req.body;
    const event = await Event.findOne({ _id: id });
    if (!event) {
        throw new NotFoundError('Event not found');
    }

    event.pendingMembers.push({
        id: req.user.userId,
        name,
        message,
    });

    event.save();

    res.status(StatusCodes.OK).json({ event });
};

const deletePendingRequests = async (req, res) => {
    const { _id, action, id } = req.body;
    const event = await Event.findOne({ _id });
    if (!event) {
        throw new NotFoundError('Event not found');
    }

    event.pendingMembers.splice(event.pendingMembers.indexOf(id), 1);
    if (action === 1) {
        // delete 👇
        event.rejectedMembers.push({ id: id });
    } else {
        // accept 👇
        event.acceptedMembers.push({ id: id });
    }

    event.save();

    res.status(StatusCodes.OK).json({ event });
};

export {
    createEvent,
    getAllEvents,
    updateEvent,
    deleteEvent,
    getMyEvents,
    pendingRequests,
    sendRequests,
    deletePendingRequests,
};
