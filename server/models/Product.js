import { Schema, model } from 'mongoose';

const productSchema = new Schema({
	name: { type: String, required: true },
	image: { type: String, required: true },
	brand: { type: String, required: true },
	price: { type: Number, default: 0 },
	category: { type: String, required: true },
	stock_count: { type: Number, default: 0 },
	description: { type: String },
	rating: { type: Number, default: 0 },
	review_count: { type: Number, default: 0 },
});

const productModel = model('Product', productSchema);

export default productModel;
