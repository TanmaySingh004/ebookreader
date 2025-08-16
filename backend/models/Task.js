
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    genre: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    completed: { type: Boolean, default: false },
    publish_date: { type: Date },
});

module.exports = mongoose.model('Task', taskSchema);
