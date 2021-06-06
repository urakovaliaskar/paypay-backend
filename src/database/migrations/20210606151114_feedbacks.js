exports.up = knex => {
	return knex.schema.createTable('feedbacks', t => {
		t.increments();
		t.integer('author_id')
			.references('id')
			.inTable('users')
			.notNullable()
			.onDelete('CASCADE');
		t.integer('review_id')
			.references('id')
			.inTable('reviews')
			.notNullable()
			.onDelete('CASCADE');
		t.string('description').notNullable();
		t.datetime('created_at');
		t.datetime('updated_at');
	});
};

exports.down = knex => knex.raw('DROP TABLE feedbacks CASCADE');
