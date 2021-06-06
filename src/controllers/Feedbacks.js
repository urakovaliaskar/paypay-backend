const Feedback = require('../models/Feedback');
const Assign = require('../models/Assign');

export const createFeedback = async (req, res) => {
	try {
		const { author_id, description, review_id } = req.body;

		console.log(req.body);

		const feedback = await Feedback.transaction(async trx => {
			const feedback = await Feedback.query(trx).insert({
				author_id,
				description,
				review_id,
			});

			if (feedback)
				await Assign.query(trx)
					.delete()
					.where({ assignee_id: author_id, review_id });
		});

		res.status(201).json({
			message: 'Feedback created successfuly!',
			feedback,
		});
	} catch (error) {
		res.status(400).json({
			message: 'Feedback creation failed! Please check the request',
		});
	}
};
