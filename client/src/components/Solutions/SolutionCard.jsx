function SolutionCard({ solution }) {
  return (
    <div className="border p-3 my-2 rounded">
      <p>{solution.text}</p> {/* ✅ changed from description to text */}
      <small>By: {solution.user?.username || 'Anonymous'}</small>
    </div>
  );
}
