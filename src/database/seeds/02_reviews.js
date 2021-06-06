exports.seed = function (knex) {
	return knex('reviews')
		.del()
		.then(function () {
			return knex('reviews').insert([
				{
					description: 'very good employee',
					author_id: 1,
					employee_id: 2,
					created_at: new Date().toISOString(),
					updated_at: new Date().toISOString(),
				},
			]);
		});
};
