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
						'$2y$12$O2PoDq6j5ZJ3XhvlWR1BleJDaGD4nxRsFwqsWtyCG.2FpvYwj7kUu', //admin
				},
				{
					id: 2,
					email: 'user@paypay.com',
					firstname: 'User',
					lastname: 'Userson',
					role: 'user',
					password:
						'$2y$12$XVvb45pYiVelsj9Aw5f7zOn3q8wkh734BP0ZQUEhE5cvOes2t9p4.', //user
				},
			]);
		});
};
