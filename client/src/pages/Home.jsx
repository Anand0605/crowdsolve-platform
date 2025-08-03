import { useEffect, useState } from 'react';
import API from '../utils/api';
import ProblemCard from '../components/Problems/ProblemCard';
import ProblemForm from '../components/Problems/ProblemForm';

function Home() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProblems();
  }, []);

  const fetchProblems = async () => {
    try {
      const res = await API.get('/problems');
      setProblems(res.data);
    } catch (err) {
      console.error('Error fetching problems:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleNewProblem = (newProblem) => {
    setProblems(prev => [newProblem, ...prev]); // Add new at top
  };

  return (
    <div className="p-6 min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">CrowdSolve Platform</h1>

      {/* Problem submission form */}
      <ProblemForm onProblemPosted={handleNewProblem} />

      <h2 className="text-2xl font-semibold mb-4">All Problems</h2>

      {loading ? (
        <p>Loading problems...</p>
      ) : problems.length === 0 ? (
        <p>No problems found.</p>
      ) : (
        <div className="space-y-4">
          {problems.map((problem) => (
            <ProblemCard key={problem._id} problem={problem} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
