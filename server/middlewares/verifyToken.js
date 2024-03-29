import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

export const verifyUserToken = function (req, res, next) {
	const token = req.header('token');
	if (!token || typeof token !== 'string') {
		return res.status(401).send('Access denied');
	}
	try {
		req.user = jwt.verify(token, process.env.TOKEN_SECRET);
		next();
	} catch (err) {
		console.log(err);
		res.status(400).send('Invalid token');
	}
};

export const verifyAdminToken = function (req, res, next) {
	try {
		const adminToken = req.header('admin');
		if (!adminToken || adminToken != process.env.ADMIN) {
			return res.status(401).send('Access denied');
		} else {
			next();
		}
	} catch (err) {
		console.log(err);
		res.status(400).send('Invalid token');
	}
};
