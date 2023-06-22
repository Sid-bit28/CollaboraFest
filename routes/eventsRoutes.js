import express from 'express';
const router = express.Router();

import {
    createEvent,
    getAllEvents,
    updateEvent,
    deleteEvent,
    getMyEvents,
} from '../controllers/eventsController.js';

router.route('/').post(createEvent).get(getAllEvents);
router.route('/my-events').get(getMyEvents);
router.route('/:id').delete(deleteEvent).patch(updateEvent);

export default router;
