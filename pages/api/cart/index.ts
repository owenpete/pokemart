import connectStore from '../../../server/connectStore';
import ProductSchema from '../../../schemas/ProductSchema';
import { getCart } from '../../../utils/cart';

export default async function(req: any, res: any){
  const { ids } = req.query;
  const cartIds = JSON.parse(ids);
  try{
    const db = await connectStore();
    const product = db.model("Product", ProductSchema);
    const data = await product.where('id').in(Object.values(cartIds).map((value: any)=>value.id));
    res.status(200).json({ data })
  }catch(err: any){
    console.log(err)
    res.status(500).json({err: err});
  }
}
