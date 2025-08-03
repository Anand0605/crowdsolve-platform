import { useState } from 'react';
import API from '../../utils/api';

function SolutionForm({ problemId }) {
  const [desc, setDesc] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post(`/solutions/${problemId}`, { description: desc });
      alert('Solution submitted!');
      setDesc('');
    } catch (err) {
      alert(err.response?.data?.message || 'Error submitting');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <textarea className="w-full border p-2" rows="4" value={desc} onChange={(e) => setDesc(e.target.value)} />
      <button type="submit" className="btn-primary mt-2">Submit Solution</button>
    </form>
  );
}

export default SolutionForm;
