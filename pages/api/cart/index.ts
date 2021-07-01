import connectStore from '../../../server/connectStore';
import ProductSchema from '../../../schemas/ProductSchema';
import { getCart } from '../../../utils/cart';

export default async function(req: any, res: any){
  const { cart } = req.query;
  try{
    const db = await connectStore();
    res.json({res: true});
  }catch(err: any){
    console.log(err)
  }
}
