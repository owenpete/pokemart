import connectStore from '../../utils/connectStore';
import ProductSchema from '../../schemas/ProductSchema';
import mongoose from 'mongoose';

export default async function(req: any, res: any){
  const db = await connectStore();
  const data = await db.model('Product', ProductSchema).find({});
  res.json({data: data});
}
