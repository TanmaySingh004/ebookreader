const Task = require('../models/Task');
const getTasks = async (
    req,
    res) => {
    try {
    const tasks = await Task.find({ userId: req.user.id });
    res.json(tasks);
    } catch (error) {
    res.status(500).json({ message: error.message });
    }
};

const addTask = async (
req,
res) => {
const { genre, title, description, publish_date } = req.body;
try {
const task = await Task.create({ userId: req.user.id,
    genre, 
    title, 
    description, 
    publish_date, 
    image: req.file ? `/uploads/${req.file.filename}` : null, });
res.status(201).json(task);
} catch (error) {
res.status(500).json({ message: error.message });
}
};

const updateTask = async (
req,
res) => {
const { genre, title, description, publish_date } = req.body;
try {
const task = await Task.findById(req.params.id);
if (!task) return res.status(404).json({ message: 'Task not found' });
task.genre=genre || task.genre;
task.title = title || task.title;
task.description = description || task.description;
task.publish_date = publish_date || task.publish_date;
if (req.file) {task.image = `/uploads/${req.file.filename}`; }
const updatedTask = await task.save();
res.json(updatedTask);
} catch (error) {
res.status(500).json({ message: error.message });
}
};

const deleteTask = async (
req,
res) => {
try {
const task = await Task.findById(req.params.id);
if (!task) return res.status(404).json({ message: 'Task not found' });
await task.remove();
res.json({ message: 'Task deleted' });
} catch (error) {
res.status(500).json({ message: error.message });
}
};
module.exports = { getTasks, addTask, updateTask, deleteTask };