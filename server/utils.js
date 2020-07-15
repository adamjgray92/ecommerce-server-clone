import jwt from 'jsonwebtoken';

import config from './config';

export const getToken = (user) => {
	return jwt.sign(
		{
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		},
		config.JWT_SECRET_KEY,
		{
			expiresIn: '48h',
		}
	);
};

export const isAuth = (req, res, next) => {
	const token = req.headers.authorization;

	if (token) {
		const onlyToken = token.slice(7, toke.length);

		jwt.verify(onlyToken, config.JWT_SECRET_KEY, (err, decode) => {
			if (err) {
				return res.status(401).send({ message: 'Invalid authorization' });
			}

			req.user = decode;

			return next();
		});
	} else {
		return res.status(401).send({ message: 'Authorization token not set.' });
	}
};

export const isAdmin = (req, res, next) => {
	if (req.user && req.user.isAdmin) {
		return next();
	}

	return res
		.status(401)
		.send({ message: 'Not authorized to access this resource' });
};
