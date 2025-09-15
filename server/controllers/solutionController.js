const Solution = require('../models/Solution');

const createSolution = async (req, res) => {
  const { text } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;
  try {
     console.log("REQ.BODY:", req.body);       // 👈 debug ke liye
    console.log("REQ.FILE:", req.file); 
    const solution = await Solution.create({
      problem: req.params.problemId,
      user: req.user.id,
      text,
      image
    });
    res.json(solution);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const upvoteSolution = async (req, res) => {
  try {
    const solution = await Solution.findByIdAndUpdate(
      req.params.solutionId,
      { $inc: { upvotes: 1 } },
      { new: true }
    );
    res.json(solution);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const commentOnSolution = async (req, res) => {
  const { comment } = req.body;
  try {
    const solution = await Solution.findByIdAndUpdate(
      req.params.solutionId,
      { $push: { comments: { user: req.user.id, comment } } },
      { new: true }
    );
    res.json(solution);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getSolutionsForProblem = async (req, res) => {
  try {
    const solutions = await Solution.find({ problem: req.params.problemId })
      .populate('user', 'username'); // ✅ This line is the fix
    res.json(solutions);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


module.exports = {
  createSolution,
  upvoteSolution,
  commentOnSolution,
  getSolutionsForProblem
};
