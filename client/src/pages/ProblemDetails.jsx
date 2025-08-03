import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../utils/api';
import SolutionForm from '../components/Solutions/SolutionForm';

function ProblemDetails() {
  const { problemId } = useParams();
  const [problem, setProblem] = useState(null);
  const [solutions, setSolutions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProblemAndSolutions();
  }, [problemId]);

  const fetchProblemAndSolutions = async () => {
    try {
      const problemRes = await API.get(`/problems/${problemId}`);
      setProblem(problemRes.data);
      const solRes = await API.get(`/solutions/problem/${problemId}`);
      setSolutions(solRes.data);
    } catch (err) {
      console.error('Error loading data', err);
    } finally {
      setLoading(false);
    }
  };

  const handleNewSolution = (newSolution) => {
    setSolutions((prev) => [newSolution, ...prev]);
  };

  if (loading) return <div className="text-white p-6">Loading...</div>;
  if (!problem) return <div className="text-white p-6">Problem not found</div>;

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-2">{problem.title}</h1>
      <p className="text-gray-300 mb-6">{problem.description}</p>

      <SolutionForm problemId={problemId} onNewSolution={handleNewSolution} />

      <h2 className="text-2xl font-semibold mt-8 mb-4">Solutions</h2>
      {solutions.length === 0 ? (
        <p>No solutions yet. Be the first to submit!</p>
      ) : (
        <div className="space-y-4">
          {solutions.map((solution) => (
            <div key={solution._id} className="bg-gray-800 p-4 rounded">
              <p>{solution.text}</p>
              <p className="text-sm text-gray-400 mt-2">By: {solution.user?.username || 'Anonymous'}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProblemDetails;
