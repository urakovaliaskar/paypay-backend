const BaseModel = require('./BaseModel');

class Feedback extends BaseModel {
	static get tableName() {
		return 'feedbacks';
	}

	static get relationMappings() {
		const User = require('./User');
		const Review = require('./Review');
		return {
			review: {
				relation: BaseModel.BelongsToOneRelation,
				modelClass: Review,
				join: {
					from: 'feedbacks.review_id',
					to: 'reviews.id',
				},
			},
			author: {
				relation: BaseModel.HasOneRelation,
				modelClass: User,
				join: {
					from: 'feedbacks.author_id',
					to: 'users.id',
				},
			},
		};
	}
}

module.exports = Feedback;
