const router = require('express').Router();
const solutionController = require('../controllers/solutionController');
const auth = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

// ✅ Image upload ke sath solution create karne wala route
router.post('/:problemId', auth, upload.single('image'), solutionController.createSolution);

// 👍 Upvote a solution
router.put('/:solutionId/upvote', auth, solutionController.upvoteSolution);

// 💬 Comment on a solution
router.post('/:solutionId/comment', auth, solutionController.commentOnSolution);

// 📥 Get all solutions for a specific problem
router.get('/problem/:problemId', solutionController.getSolutionsForProblem);

module.exports = router;
