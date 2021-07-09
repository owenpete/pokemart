import connectStore from "../../../services/connectStore";
import ProductSchema from "../../../schemas/ProductSchema";
import { getCart } from "../../../utils/cart";

const sortData = (products, ids: any) =>{
  //sorts data in order of items in cart
  return(Object.values(ids).map((value: any)=>{
    for(let i = 0; i < products.length; i++){
      if(products[i].id == value.id){
        return(
          products[i]
        )
      }
    }
  }));
}

export default async function (req: any, res: any) {
  //product ids from localStorage
  if(req.query.ids){
    const ids = JSON.parse(req.query.ids);
    try {
      const db = await connectStore();
      const product = db.model("Product", ProductSchema);
      //finding products in database that match localStorage ids
      const data = await product
        .where("id")
        .in(Object.values(ids).map((value: any) => value.id));
      const sortedData = sortData(data, ids);
      res.status(200).json({ data: sortedData});
    } catch (err: any) {
      console.log(err);
      res.status(500).json({ err: err });
    }
  }else{
    res.status(200).json({data: null});
  }
}
