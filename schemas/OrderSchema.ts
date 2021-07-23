import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  orderDate: {
    type: Date,
    expires: 3600*24*7,
    default: Date.now
  },
  order: [{
    productId: {
      type: String,
      required: true
    },
    qty: {
      type: Number,
      required: true
    }
  }],
  tax: {
    type: Number,
    required: true
  },
  shipping: {
    type: Number,
    required: true
  },
  subtotal: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
});

export default OrderSchema;
