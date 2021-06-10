import mongoose from 'mongoose';
import ProductSchema from '../schemas/ProductSchema';

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
