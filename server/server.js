import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

const app = express();

const PORT = process.env.PORT || 5000;

import config from './config';

import userRoutes from './routes/user';
import productRoutes from './routes/product';

dotenv.config();

const mongodbURL = config.MONGODB_URL;

mongoose
	.connect(mongodbURL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.catch((err) => console.error(err.reason));

app.use(bodyParser.json());

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
