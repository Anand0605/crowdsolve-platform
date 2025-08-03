import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import API from '../utils/api';
import SolutionCard from '../components/Solutions/SolutionCard';
import SolutionForm from '../components/Solutions/SolutionForm';

function ProblemDetails() {
  const { problemId } = useParams();
  const [problem, setProblem] = useState(null);

  useEffect(() => {
    const fetchProblem = async () => {
      const res = await API.get(`/problems/${problemId}`);
      setProblem(res.data);
    };
    fetchProblem();
  }, [problemId]);

  return problem ? (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{problem.title}</h1>
      <p className="mb-4">{problem.description}</p>

      <h2 className="text-xl">Submit a Solution</h2>
      <SolutionForm problemId={problemId} />

      <h2 className="text-xl mt-6">Solutions</h2>
      {problem.solutions.map(sol => <SolutionCard key={sol._id} solution={sol} />)}
    </div>
  ) : <p>Loading...</p>;
}

export default ProblemDetails;
