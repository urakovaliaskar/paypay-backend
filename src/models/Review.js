const BaseModel = require('./BaseModel');

class Review extends BaseModel {
	static get tableName() {
		return 'reviews';
	}

	async $beforeDelete(queryContext) {
		await super.$beforeDelete(queryContext);
		console.log({ queryContext });
	}

	static get relationMappings() {
		const User = require('./User');
		const Assign = require('./Assign');
		const Feedback = require('./Feedback');
		return {
			employee: {
				relation: BaseModel.HasOneRelation,
				modelClass: User,
				join: {
					from: 'reviews.employee_id',
					to: 'users.id',
				},
			},
			author: {
				relation: BaseModel.HasOneRelation,
				modelClass: User,
				join: {
					from: 'reviews.author_id',
					to: 'users.id',
				},
			},
			assignees: {
				relation: BaseModel.HasManyRelation,
				modelClass: Assign,
				join: {
					from: 'reviews.id',
					to: 'assigns.review_id',
				},
			},
			feedbacks: {
				relation: BaseModel.HasManyRelation,
				modelClass: Feedback,
				join: {
					from: 'reviews.id',
					to: 'feedbacks.review_id',
				},
			},
		};
	}
}

module.exports = Review;
