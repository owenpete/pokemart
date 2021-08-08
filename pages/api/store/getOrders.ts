import connectStore from '../../../services/connectStore';
import OrderSchema from '../../../schemas/OrderSchema';
import ProductSchema from '../../../schemas/ProductSchema';

import sortIdSync from '../../../utils/sortIdSync';

// finds and returns order data with the matching _id
export default async function(req: any, res: any){
  const orderIds: any[] = JSON.parse(req.query.orderIds);
  try{
    const db = await connectStore();
    const order = db.model('Order', OrderSchema);
    const orderData =
      await order
      .where('_id')
      .in(orderIds);
    const sortedData = sortIdSync('_id', orderData, orderIds);
    res.status(200).json(sortedData);
  }catch(err: any){
    res.status(500).json({err: "ERROR"});
  }
}
