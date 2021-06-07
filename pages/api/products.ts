import connectStore from '../../utils/connectStore';
import Product from '../../schemas/Product';
import mongoose from 'mongoose';

export default async function(req: any, res: any){
  const db = await connectStore();
  const data = await db.model('product', Product).find({});
  res.json({data: data});
}
