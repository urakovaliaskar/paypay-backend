exports.up = knex => {
	return knex.schema.createTable('reviews', t => {
		t.increments();
		t.string('description').notNullable();
		t.integer('author_id')
			.references('id')
			.inTable('users')
			.notNullable()
			.onDelete('CASCADE');
		t.integer('employee_id')
			.references('id')
			.inTable('users')
			.notNullable()
			.onDelete('CASCADE');
		t.datetime('created_at');
		t.datetime('updated_at');
	});
};

exports.down = knex => knex.raw('DROP TABLE reviews CASCADE');
