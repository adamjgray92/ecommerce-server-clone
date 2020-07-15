import express from 'express';

import User from '../models/User';
import { getToken } from '../utils';

const router = express.Router();

router.post('/signin', async (req, res) => {
	try {
		const user = await User.findOne({
			email: req.body.email,
			password: req.body.password,
		});

		if (user) {
			const { _id, name, email, isAdmin } = user;

			res.send({
				_id,
				name,
				email,
				isAdmin,
				token: getToken(user),
			});
		} else {
			res.status(401).send({ message: 'Invalid email or password' });
		}
	} catch (err) {
		res.send({ message: err.message });
	}
});

router.post('/register', async (req, res) => {
	try {
		const user = await User.findOne({
			email: req.body.email,
		});

		if (!user) {
			const newUser = new User({
				name: req.body.name,
				email: req.body.email,
				password: req.body.password,
			});

			const savedUser = await newUser.save();

			res.status(201).send({
				_id: savedUser._id,
				name: savedUser.name,
				email: savedUser.email,
				isAdmin: savedUser.isAdmin,
				token: getToken(savedUser),
			});
		} else {
			res.status(422).send({ message: 'Account already exists' });
		}
	} catch (err) {
		res.send({ message: err.message });
	}
});

router.get('/createadmin', async (req, res) => {
	try {
		const user = new User({
			name: 'Adam Gray',
			email: 'adamjamesgray.1992@gmail.com',
			password: 'password1',
			isAdmin: true,
		});

		const newUser = await user.save();

		res.send(newUser);
	} catch (err) {
		res.send({ message: err.message });
	}
});

export default router;
