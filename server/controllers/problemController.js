const Problem = require('../models/Problem');

exports.createProblem = async (req, res) => {
  const { location, description } = req.body;
  const image = req.file?.filename;
  try {
    const problem = await Problem.create({
      user: req.user.id,
      location,
      image,
      description
    });
    res.json(problem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllProblems = async (req, res) => {
  const problems = await Problem.find().populate('user', 'username');
  res.json(problems);
};

exports.getProblemById = async (req, res) => {
  const problem = await Problem.findById(req.params.id);
  res.json(problem);
};

exports.deleteProblem = async (req, res) => {
  await Problem.findByIdAndDelete(req.params.id);
  res.json({ message: 'Problem deleted' });
};