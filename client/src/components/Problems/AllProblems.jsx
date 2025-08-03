import { useEffect, useState } from 'react';
import API from '../../utils/api'; // axios instance
import ProblemCard from './ProblemCard';

function AllProblems() {
  const [problems, setProblems] = useState([]);

  const fetchProblems = async () => {
    try {
      const res = await API.get('/problems'); // 👈 all problems from backend
      setProblems(res.data);
    } catch (err) {
      console.error('Error fetching problems:', err);
    }
  };

  useEffect(() => {
    fetchProblems(); // 🔁 run on page load
  }, []);

  return (
    <div className="space-y-4">
      {problems.length === 0 ? (
        <p className="text-gray-400">No problems found.</p>
      ) : (
        problems.map((problem) => (
          <ProblemCard key={problem._id} problem={problem} />
        ))
      )}
    </div>
  );
}

export default AllProblems;
