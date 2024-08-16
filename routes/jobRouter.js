import { Router } from 'express';
import {
  getAllJobs,
  createJob,
  getJob,
  updateJob,
  deleteJob,
} from '../controllers/jobController.js';
import { validateJobInput } from '../middleware/validationMiddleware.js';

const router = Router();

// router.get('/', getAllJobs);
// router.post('/', createJob);

// router.get('/:id', getJob);
// router.patch('/:id', updateJob);
// router.delete('/:id', deleteJob);

router.route('/').get(getAllJobs).post(validateJobInput, createJob);

router
  .route('/:id')
  .get(getJob)
  .patch(validateJobInput, updateJob)
  .delete(deleteJob);

export default router;
