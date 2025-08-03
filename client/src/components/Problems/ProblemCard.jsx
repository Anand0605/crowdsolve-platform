import { Link } from 'react-router-dom';

function ProblemCard({ problem }) {
  console.log("Problem data:", problem); // Debug

  return (
    <div className="border border-gray-700 p-4 rounded shadow bg-gray-800">
      <h2 className="text-lg font-semibold text-white">{problem.title}</h2>
      <p className="text-gray-300">{problem.description}</p>
      {problem._id ? (
        <Link
          to={`/problem/${problem._id}`}
          className="text-blue-500 hover:underline mt-2 inline-block"
        >
          View Solutions
        </Link>
      ) : (
        <p className="text-red-500">Invalid Problem ID</p>
      )}
    </div>
  );
}

export default ProblemCard;
