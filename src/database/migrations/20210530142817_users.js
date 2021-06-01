exports.up = knex => {
	return knex.schema.createTable('users', t => {
		t.increments();
		t.string('email').unique().notNullable();
		t.string('password').notNullable();
		t.string('firstname').notNullable();
		t.string('lastname').notNullable();
		t.string('middlename');
		t.string('role').notNullable().defaultTo('user');
		t.datetime('created_at');
		t.datetime('updated_at');
	});
};

exports.down = knex => knex.schema.dropTable('users');
