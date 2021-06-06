import Review from '../models/Review';
import User from '../models/User';
import Assign from '../models/Assign';
import user from '../routes/review';

export const createReview = async (req, res) => {
	try {
		const { description, author_id, employee_id, assignees } = req.body;

		const review = await Review.transaction(async trx => {
			const review = await Review.query(trx).insert({
				description,
				author_id,
				employee_id,
			});

			let reviewWithAssignees = null;

			const assigneesParams = assignees.map(assignee => ({
				assignee_id: assignee,
				assigner_id: author_id,
				review_id: review.id,
			}));
			if (assignees && assignees.length > 0) {
				reviewWithAssignees = await review
					.$relatedQuery('assignees', trx)
					.insert(assigneesParams);
			}
			return reviewWithAssignees;
		});

		res.status(201).json({
			message: 'Review created successfuly!',
			review,
		});
	} catch (error) {
		res.status(400).json({
			message: error,
		});
	}
};

export const getReviews = async (req, res) => {
	try {
		let page = 0;
		let size = 10;
		const { user } = req;
		if (req.query.page) page = req.query.page;
		if (req.query.size) size = req.query.size;
		const { reviews, total } = await Review.transaction(async trx => {
			if (user.role !== 'admin') {
				const { results, total } = await Review.query(trx)
					.page(page, size)
					.orderBy('created_at', 'desc')
					.withGraphFetched(
						'[assignees.[assigner, assignee], employee, author, feedbacks.[author]]'
					)
					.whereExists(
						Review.relatedQuery('assignees').where('assignee_id', user.id)
					);
				return {
					reviews: results,
					total,
				};
			} else {
				const { results, total } = await Review.query(trx)
					.page(page, size)
					.orderBy('created_at', 'desc')
					.withGraphFetched(
						'[assignees.[assigner, assignee], employee, author, feedbacks.[author]]'
					);
				return {
					reviews: results,
					total,
				};
			}
		});

		res.json({
			reviews,
			total,
		});
	} catch (error) {
		res.status(403).json({
			message: 'Request failed! Please check the request',
		});
	}
};

export const getReview = async (req, res) => {
	const id = parseInt(req.params.id);
	if (!isNaN(id)) {
		try {
			const review = await Review.query()
				.findById(id)
				.withGraphFetched(
					'[assignees.[assigner, assignee], employee, author, feedbacks.[author]]'
				);
			if (review) {
				res.json({
					review,
				});
			} else {
				res.json({
					message: 'Review does not exist!',
				});
			}
		} catch (error) {
			res.status(403).json({
				message: 'Request failed! Please check the request',
			});
		}
	} else {
		res.json({
			message: 'Id must be a number!',
		});
	}
};

export const updateReview = async (req, res) => {
	try {
		const { id, description, author_id, employee_id, assignees } = req.body;
		const { user } = req;
		const data = {};
		if (description) data.description = description;

		if (!isNaN(id)) {
			if (Object.keys(data).length) {
				const review = await Review.transaction(async trx => {
					const review = await Review.query(trx)
						.withGraphFetched(
							'[assignees.[assigner, assignee], employee, author, feedbacks.[author]]'
						)
						.patchAndFetchById(id, data);

					let assigneesResult = null;

					const assigneesParams = assignees.map(assignee => {
						const newAssignees = {
							assignee_id: assignee,
							assigner_id: user.id,
							review_id: review.id,
						};

						const assign = review.assignees.find(
							el => el.assignee_id === assignee
						);
						if (assign) newAssignees.id = assign.id;
						return newAssignees;
					});
					if (assignees && assignees.length > 0) {
						assigneesResult = await Assign.query(trx).upsertGraph(
							assigneesParams
						);
						const assigneeToDelete = review.assignees.find(
							el => !assignees.includes(el.assignee_id)
						);
						review.assignees = assigneesResult;
						if (assigneeToDelete) {
							await Assign.query(trx)
								.deleteById(assigneeToDelete.id)
								.where('review_id', review.id);
						}
					}
					return review;
				});

				if (review) {
					res.json({
						message: 'Review was updated successfuly',
						review,
					});
				} else {
					res.status(404).json({
						message: 'Review does not exist',
					});
				}
			} else {
				res.status(400).json({
					message: 'Review update failed! Please check the request',
				});
			}
		} else {
			res.status(400).json({
				message: 'Id must be a number!',
			});
		}
	} catch (error) {
		res.status(404).json({
			message: error,
		});
	}
};

export const deleteReview = async (req, res) => {
	const id = parseInt(req.params.id);
	if (!isNaN(id)) {
		try {
			const review = await Review.query().deleteById(id);

			if (!review) {
				res.status(404).json({
					message: 'Review does not exist',
				});
			} else {
				res.json({
					message: 'Review was deleted successfuly',
				});
			}
		} catch (error) {
			res.status(400).json({
				message: 'Failed to delete review',
			});
		}
	} else {
		res.status(400).json({
			message: 'Id must be a number!',
		});
	}
};
