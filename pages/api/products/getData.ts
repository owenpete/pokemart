import connectStore from "../../../server/connectStore";
import ProductSchema from "../../../schemas/ProductSchema";

export default async function (req: any, res: any) {
  const db = await connectStore();

  const { searchField } = req.query;
  let query: any = {};

  query = Object.assign(query, JSON.parse(searchField));

  const product = db.model("Product", ProductSchema);
  let data: any;

  data = await product.find(JSON.parse(searchField));

  res.status(200).json({
    data: data,
  });
}
