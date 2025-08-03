function SolutionCard({ solution }) {
  return (
    <div className="border p-3 my-2 rounded">
      <p>{solution.description}</p>
      <small>By: {solution.user?.username || 'Unknown'}</small>
    </div>
  );
}

export default SolutionCard;
