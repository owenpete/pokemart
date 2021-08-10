import connectStore from '../../../services/connectStore';
import orderSchema from '../../../schemas/OrderSchema';

//posts new orders to the database
export default async function(req: any, res: any){
  console.log('running')
  const { method, body }= req;
  const db = await connectStore();
  const order = db.model('Order', orderSchema);
  try{
    switch(method){
      case 'POST':
        const orderData = await order.create({
          order: [
            ...JSON.parse(body.order)
          ],
          tax: body.tax,
          shipping: body.shipping,
          subtotal: body.subtotal,
          total: body.subtotal+body.shipping+body.tax,
        });
        console.log('pushed')
        res.status(200).json(orderData._id);
    }
  }catch(err: any){
    console.log(err);
    res.status(500).json({err: err});
  }
}
