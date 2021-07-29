import connectStore from "../../../services/connectStore";
import ProductSchema from "../../../schemas/ProductSchema";
import sortIdSync from '../../../utils/sortIdSync';

//fetches all products matching givin ids
export default async function (req: any, res: any) {
  const productIds: any[] = JSON.parse(req.query.productIds);
  if(productIds){
    try {
      const db = await connectStore();
      const product = db.model("Product", ProductSchema);
      const productData =
        await product
        .where("productId")
        .in(productIds);
      const sortedData = sortIdSync(productData, productIds);
      res.status(200).json(sortedData);
    } catch (err: any) {
      console.log(err);
      res.status(500).json({ err: err });
    }
  }else{
    res.status(200).json(null);
  }
}
