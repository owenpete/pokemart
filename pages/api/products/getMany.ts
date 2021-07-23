import connectStore from "../../../services/connectStore";
import ProductSchema from "../../../schemas/ProductSchema";
import sortIdSync from '../../../utils/sortIdSync';

//fetches all products matching givin ids
export default async function (req: any, res: any) {
  //product ids from localStorage
  if(req.query.productIds){
    try {
      const db = await connectStore();
      const product = db.model("Product", ProductSchema);
      //finding products in database that match localStorage ids
      const cartProductData = JSON.parse(req.query.productIds);
      const productIds = Object.values(cartProductData).map((value: any) => value.productId);
      const productData =
        await product
        .where("productId")
        .in(productIds);
      const sortedData = sortIdSync(productData, cartProductData);
      res.status(200).json( sortedData );
    } catch (err: any) {
      console.log(err);
      res.status(500).json({ err: err });
    }
  }else{
    res.status(200).json(null);
  }
}
