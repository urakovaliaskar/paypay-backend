import express from 'express';
import authenticate from '../middlewares/authenticate';
import admin from '../middlewares/admin';
import {
	getReview,
	getReviews,
	createReview,
	updateReview,
	deleteReview,
} from '../controllers/Reviews';

let review = express.Router();

review.get('/', authenticate, getReviews);
review.get('/:id', authenticate, getReview);
review.post('/', [authenticate, admin], createReview);
review.put('/:id', [authenticate, admin], updateReview);
review.delete('/:id', [authenticate, admin], deleteReview);

export default review;
