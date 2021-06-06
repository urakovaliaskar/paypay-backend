exports.seed = function (knex) {
	return knex('assigns')
		.del()
		.then(function () {
			return knex('assigns').insert([
				{
					assigner_id: 1,
					assignee_id: 2,
					review_id: 1,
					created_at: new Date().toISOString(),
					updated_at: new Date().toISOString(),
				},
			]);
		});
};
