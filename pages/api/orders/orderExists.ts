import connectStore from '../../../services/connectStore';
import OrderSchema from '../../../schemas/OrderSchema';

// finds and returns order data with the matching _id
export default async function(req: any, res: any){
  const orderId: any[] = JSON.parse(req.query.orderId);
  try{
    const db = await connectStore();
    const order = db.model('Order', OrderSchema);
    const exists = await order.exists({_id: orderId});
    res.status(200).json(exists);
  }catch(err: any){
    res.status(500).json({err: "ERROR"});
  }
}
