const router = require('express').Router();
const multer = require('multer');
const upload = multer({ dest: 'server/uploads/' });
const { createProblem, getAllProblems, getProblemById, deleteProblem } = require('../controllers/problemController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, upload.single('image'), createProblem);
router.get('/', getAllProblems);
router.get('/:id', getProblemById);
router.delete('/:id', auth, deleteProblem);
module.exports = router;