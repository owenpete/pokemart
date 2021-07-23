import connectStore from "../../../services/connectStore";
import ProductSchema from "../../../schemas/ProductSchema";

// fetches product from database via "id"
export default async function (req: any, res: any) {
  const db = await connectStore();

  const { searchField } = req.query;
  let query: any = {};

  query = Object.assign(query, JSON.parse(searchField));

  const product = db.model("Product", ProductSchema);
  const data = await product.find(query);

  res.status(200).json({
    data: data,
  });
}
