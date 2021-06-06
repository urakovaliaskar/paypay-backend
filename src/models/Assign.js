const BaseModel = require('./BaseModel');

class Assign extends BaseModel {
	static get tableName() {
		return 'assigns';
	}

	static get relationMappings() {
		const Review = require('./Review');
		const User = require('./User');
		return {
			review: {
				relation: BaseModel.HasOneRelation,
				modelClass: Review,
				join: {
					from: 'assigns.review_id',
					to: 'reviews.id',
				},
			},
			assigner: {
				relation: BaseModel.HasOneRelation,
				modelClass: User,
				join: {
					from: 'assigns.assigner_id',
					to: 'users.id',
				},
			},
			assignee: {
				relation: BaseModel.HasOneRelation,
				modelClass: User,
				join: {
					from: 'assigns.assignee_id',
					to: 'users.id',
				},
			},
		};
	}
}

module.exports = Assign;
