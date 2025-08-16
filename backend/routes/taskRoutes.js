const path = require('path');
const express = require('express');
const { getTasks, addTask, updateTask, deleteTask } = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');
const multer = require("multer");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage: storage });

router.get('/', protect, getTasks);
router.post('/', protect, upload.single('image'), addTask);
router.put('/:id', protect, upload.single('image'), updateTask);
router.delete('/:id', protect, deleteTask);

module.exports = router;
