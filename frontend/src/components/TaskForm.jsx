import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const TaskForm = ({ tasks, setTasks, editingTask, setEditingTask }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    genre:'', 
    title: '', 
    description: '', 
    publish_date: '',
    image: '',
    completed: false, });
  useEffect(() => {
    if (editingTask) {
      setFormData({
        genre: editingTask.genre,
        title: editingTask.title,
        description: editingTask.description,
        publish_date: editingTask.publish_date,
        image:'',
        completed: editingTask.completed || false,
      });
    } else {
      setFormData({genre:'', title: '', description: '', publish_date: '',image:'',completed: false, });
    }
  }, [editingTask]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    const data = new FormData();
    data.append('genre', formData.genre);
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('publish_date', formData.publish_date);
    data.append('completed', formData.completed);
    if (formData.image) {
      data.append('image', formData.image);
    }
    let response;
      if (editingTask) {
          response = await axiosInstance.put(`/api/tasks/${editingTask._id}`, data, {
          headers: { Authorization: `Bearer ${user.token}`,
                     'Content-Type': 'multipart/form-data'},
        });
        setTasks(tasks.map((task) => (task._id === response.data._id ? response.data : task)));
      } else {
        const response = await axiosInstance.post('/api/tasks', data, {
          headers: { Authorization: `Bearer ${user.token}`,
          'Content-Type': 'multipart/form-data'},
        });
        setTasks([...tasks, response.data]);
      }
      setEditingTask(null);
      setFormData({genre:'', title: '', description: '', publish_date: '',image:'', completed:false });
    } catch (error) {
      console.error(error);
      alert('Failed to save task.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded mb-6">
      <h1 className="text-2xl font-bold mb-4">{editingTask ? 'Edit Book' : 'Add Book'}</h1>
      <select
        value={formData.genre}
        onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      >
        <option value="">-- Select Genre --</option>
        <option value="Fiction">Fiction</option>
        <option value="Non-Fiction">Non-Fiction</option>
        <option value="Mystery">Mystery</option>
        <option value="Romance">Romance</option>
        <option value="Science Fiction">Science Fiction</option>
        <option value="Fantasy">Fantasy</option>
        <option value="Biography">Biography</option>
        <option value="History">History</option>
      </select>
      <input
        type="text"
        placeholder="Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      <input
        type="date"
        value={formData.publish_date}
        onChange={(e) => setFormData({ ...formData, publish_date: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      <input
        type="file"
        name='image'
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            setFormData({ ...formData, image: file });
          }
        }}
        className="w-full p-2 border rounded"
      />
      <button type="submit" className="w-full bg-black text-white p-2 rounded">
        {editingTask ? 'Update Book' : 'Add Book'}
      </button>
    </form>
  );
};

export default TaskForm;
