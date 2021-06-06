import express from 'express';
import authenticate from '../middlewares/authenticate';
import { createFeedback } from '../controllers/Feedbacks';

let feedback = express.Router();

feedback.post('/', authenticate, createFeedback);

export default feedback;
