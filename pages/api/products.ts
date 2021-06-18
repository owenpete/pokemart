import connectStore from "../../utils/connectStore";
import ProductSchema from "../../schemas/ProductSchema";

export default async function (req: any, res: any) {
  const db = await connectStore();

  const { skip, limit, q } = req.query;

  let query: any = {};

  if(q){
    query.price=q;
    console.log(query)
  }

  const product = db.model("Product", ProductSchema);

  const data = await product
    .find({price: 100})
    .skip(parseInt(skip))
    .limit(parseInt(limit));

  const totalResults = await product.find({price: 100}).countDocuments();

  res.status(200).json({
    data: data,
    totalResults: totalResults,
    query: { ...req.query },
  });
}
