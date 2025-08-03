// ProblemForm.jsx
import { useState } from 'react';
import API from '../../utils/api'; // ✅ Correct import

function ProblemForm({ onSuccess }) {
  const [form, setForm] = useState({ title: '', description: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/problems', form); // ✅ Use API instead of axios
      console.log('Problem submitted:', res.data);
      onSuccess?.(); // refresh list if callback passed
    } catch (err) {
      console.error('Problem submission failed:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-gray-800 p-4 rounded text-white">
      <input
        type="text"
        name="title"
        placeholder="Problem Title"
        value={form.title}
        onChange={handleChange}
        className="w-full p-2 rounded bg-gray-700"
      />
      <textarea
        name="description"
        placeholder="Problem Description"
        value={form.description}
        onChange={handleChange}
        className="w-full p-2 rounded bg-gray-700"
      />
      <button type="submit" className="bg-blue-600 px-4 py-2 rounded">Submit</button>
    </form>
  );
}

export default ProblemForm;
