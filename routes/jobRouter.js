import { Router } from 'express';
import {
  getAllJobs,
  createJob,
  getJob,
  updateJob,
  deleteJob,
} from '../controllers/jobController.js';
import {
  validateIdParams,
  validateJobInput,
} from '../middleware/validationMiddleware.js';

const router = Router();

// router.get('/', getAllJobs);
// router.post('/', validateJobInput, createJob);

// router.get('/:id', validateIdParams, getJob);
// router.patch('/:id', validateIdParams, validateJobInput, updateJob);
// router.delete('/:id', validateIdParams, deleteJob);

router.route('/').get(getAllJobs).post(validateJobInput, createJob);

router
  .route('/:id')
  .get(validateIdParams, getJob)
  .patch(validateIdParams, validateJobInput, updateJob)
  .delete(validateIdParams, deleteJob);

export default router;
