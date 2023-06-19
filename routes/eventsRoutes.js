import express from 'express';
const router = express.Router();

import {
    createEvent,
    getAllEvents,
    updateEvent,
    deleteEvent,
    showStats,
} from '../controllers/eventsController.js';

router.route('/').post(createEvent).get(getAllEvents);
router.route('/stats').get(showStats);
router.route('/:id').delete(deleteEvent).patch(updateEvent);

export default router;
