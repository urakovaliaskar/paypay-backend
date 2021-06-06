const Password = require('objection-password')();
const BaseModel = require('./BaseModel');

class User extends Password(BaseModel) {
	static get tableName() {
		return 'users';
	}

	static get relationMappings() {
		const Review = require('./Review');
		return {
			reviews: {
				relation: BaseModel.HasManyRelation,
				modelClass: Review,
				join: {
					from: 'users.id',
					to: 'reviews.employee_id',
				},
			},
		};
	}

	$formatJson(json) {
		json = super.$formatJson(json);
		json.fullname = json.firstname + ' ' + json.lastname;
		delete json.password;
		delete json.middlename;
		return json;
	}
}

module.exports = User;
