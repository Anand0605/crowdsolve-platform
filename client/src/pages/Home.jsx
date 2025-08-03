import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../utils/api';

function ProblemDetails() {
  const { problemId } = useParams();
  const [solutions, setSolutions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get(`/problems/${problemId}/solutions`)
      .then(res => {
        console.log('Solutions:', res.data);
        setSolutions(res.data || []);
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, [problemId]);

  if (loading) return <p>Loading solutions...</p>;

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-4">Problem Solutions</h1>

      {solutions.length === 0 ? (
        <p>No solutions found.</p>
      ) : (
        <ul>
          {solutions.map((solution) => (
            <li key={solution._id} className="mb-4 p-4 bg-gray-800 rounded">
              <p>{solution.text}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProblemDetails;
