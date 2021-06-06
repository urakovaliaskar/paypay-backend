exports.up = knex => {
	return knex.schema.createTable('assigns', t => {
		t.increments();
		t.integer('review_id')
			.references('id')
			.inTable('reviews')
			.notNullable()
			.onDelete('CASCADE');
		t.integer('assignee_id')
			.references('id')
			.inTable('users')
			.notNullable()
			.onDelete('CASCADE');
		t.integer('assigner_id')
			.references('id')
			.inTable('users')
			.notNullable()
			.onDelete('CASCADE');
		t.datetime('created_at');
		t.datetime('updated_at');
	});
};

exports.down = knex => knex.raw('DROP TABLE assigns CASCADE');
