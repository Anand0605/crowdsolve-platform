import { Link } from 'react-router-dom';

function ProblemCard({ problem }) {
  return (
    <div className="border p-4 rounded shadow">
      <h2 className="text-lg font-semibold">{problem.title}</h2>
      <p>{problem.description}</p>
      <Link to={`/problem/${problem._id}`} className="text-blue-600">View Solutions</Link>
    </div>
  );
}

export default ProblemCard;
