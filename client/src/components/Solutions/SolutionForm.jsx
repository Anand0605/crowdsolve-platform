import { useState } from 'react';
import API from '../../utils/api';

function SolutionForm({ problemId, onNewSolution }) {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await API.post(`/solutions/${problemId}`, { text });
      setText('');
      if (onNewSolution) {
        onNewSolution(res.data); // ✅ this works now
      }
    } catch (err) {
      setError('Failed to submit solution.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submitHandler} className="mb-6">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full p-2 border rounded bg-gray-800 text-white"
        rows="4"
        placeholder="Write your solution here..."
        required
      />
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <button
        type="submit"
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Submit Solution'}
      </button>
    </form>
  );
}

export default SolutionForm;
