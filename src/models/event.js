const mongoose = require('mongoose');
const { Schema } = mongoose;

const EventSchema = new Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    site: { type: String, required: true },
    address: { type: String, required: true },
    startDate: { type: Date },
    endDate: { type: Date },
    type: { type: String, required: true }
});

module.exports = mongoose.model('Event', EventSchema);