import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  price:{
    type: Number,
    required: true
  },
  sale: {
    type: Boolean,
    default: false
  },
  images:{
    type: [String],
    required: true,
  },
  stock:{
    type: Number,
    default: 0,
  },
  rating: {
    type: Number,
    default: 0,
  },
  tags: {
    type: [String],
    required: true
  },
});

export default ProductSchema;
