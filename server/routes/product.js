import express from 'express';

import Product from '../models/Product';
import { getToken, isAuth, isAdmin } from '../utils';

import data from '../data';

const router = express.Router();

router.get('/', async (req, res) => {
	const products = await Product.find({});

	res.send(products);
});

router.post('/', isAuth, isAdmin, async (req, res) => {
	const product = new Product({
		name: req.body.name,
		price: req.body.price,
		image: req.body.image,
		brand: req.body.brand,
		category: req.body.category,
		stock_count: req.body.stock_count,
		description: req.body.description,
	});

	try {
		const newProduct = await product.save();

		if (newProduct) {
			res
				.status(201)
				.send({ message: 'New product created', data: newProduct });
		} else {
			res.status(500).send({ message: 'Product could not be created.' });
		}
	} catch (err) {
		res.status(500).send({ message: err.message });
	}
});

router.put('/:id', isAuth, isAdmin, async (req, res) => {
	try {
		let product = await Product.findById(req.params.id);

		if (product) {
			product.name = req.body.name;
			product.price = req.body.price;
			product.image = req.body.image;
			product.brand = req.body.brand;
			product.category = req.body.category;
			product.stock_count = req.body.stock_count;
			product.description = req.body.description;

			await product.save();

			res.status(200).send({ message: 'Product updated', data: product });
		} else {
			res.status(404).send({ message: 'Product does not exist' });
		}
	} catch (err) {
		res.status(500).send({ message: err.message });
	}
});

router.delete('/:id', isAuth, isAdmin, async (req, res) => {
	const product = await Product.findById(req.params.id);

	if (product) {
		await product.remove();

		return res.send({ message: 'Product deleted' });
	}

	return res.status(404).send({ message: 'Product not found' });
});

router.get('/:id', async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);

		if (product) {
			res.status(200).send(product);
		} else {
			res.status(404).send({ messages: 'Product not found.' });
		}
	} catch (err) {
		res.status(500).send({ message: 'Server Error' });
	}
});

export default router;
