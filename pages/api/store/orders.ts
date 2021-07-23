import connectStore from '../../../services/connectStore';
import OrderSchema from '../../../schemas/OrderSchema';
import ProductSchema from '../../../schemas/ProductSchema';

import sortIdSync from '../../../utils/sortIdSync';

// finds and returns order data with the matching _id
export default async function(req: any, res: any){
  const { orderId } = req.query;
  try{
    const db = await connectStore();
    const orderModel = db.model('Order', OrderSchema);
    const productModel = db.model('Product', ProductSchema);

    // fetching order with matching id
    const orders = await orderModel.find({
      _id: orderId
    });
    // fetching each product in the order from the item's id
    const orderProducts = Object.values(orders[0].order);
    const orderProductIds = orderProducts.map((value: any)=>value.productId);
    const productData = [
      ...await productModel
      .where('productId')
      .in(orderProductIds)
    ];
    const sortedData = sortIdSync(productData, orderProducts);
    const mutatedOrderObject = orderProducts.map((value: any, index: number)=>{
      return {
        ...sortedData[index].toObject(),
        ...value.toObject()
      }
    });
    const mutatedOrder = orders.map((value: any)=>{
      return {
        ...value.toObject(),
        order:[
          ...mutatedOrderObject,
        ]
      }
    });
    res.status(200).json(mutatedOrder);
  }catch(err: any){
    res.status(500).json({err: "ERROR"});
  }
}
