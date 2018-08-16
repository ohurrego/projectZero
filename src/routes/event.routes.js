const express = require('express');
const router = express.Router();

const Event = require('../models/event');

router.get('/', async(req, res) => {
    const events = await Event.find();
    res.json(events);
});

router.get('/:id', async(req, res) => {
    const event = await Event.findById(req.params.id);
    res.json(event);
});

router.post('/', async(req, res) => {
    const { name, category, site, address, startDate, endDate, type } = req.body;
    const event = new Event({ name, category, site, address, startDate, endDate, type });
    await event.save();
    res.json({ status: 'Event Saved' });
});

router.put('/:id', async(req, res) => {
    const { name, category, site, address, startDate, endDate, type } = req.body;
    const newEvent = { name, category, site, address, startDate, endDate, type };
    await Event.findByIdAndUpdate(req.params.id, newEvent);
    res.json({ status: 'Event Updated' });
});

router.delete('/:id', async(req, res) => {
    await Event.findByIdAndRemove(req.params.id);
    res.json({ status: 'Event Deleted' });
});

module.exports = router;