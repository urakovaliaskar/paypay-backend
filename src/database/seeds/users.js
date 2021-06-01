const now = new Date().toISOString;
exports.seed = knex => {
	return knex('users')
		.del()
		.then(() => {
			return knex('users').insert([
				{
					id: 1,
					email: 'admin@paypay.com',
					firstname: 'Admin',
					lastname: 'Adminson',
					role: 'admin',
					password:
						'$2b$12$HX/s/IaaVDx6X73xV8Q0mO1fBn4QaBUSl6tWuokjlEm79YoBZmzYu', //admin
					created_at: new Date().toISOString(),
					updated_at: new Date().toISOString(),
				},
				{
					id: 2,
					email: 'user@paypay.com',
					firstname: 'User',
					lastname: 'Userson',
					role: 'user',
					password:
						'$2b$12$qpuxyUwDpfmLfkuYYSuqhOmQd055fitr4oxZWxU13GCa0lY0RNcH.', //user
					created_at: new Date().toISOString(),
					updated_at: new Date().toISOString(),
				},
			]);
		});
};
