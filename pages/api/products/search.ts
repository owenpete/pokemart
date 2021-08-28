import connectStore from "../../../services/connectStore";
import ProductSchema from "../../../schemas/ProductSchema";

export default async function (req: any, res: any) {
  const db = await connectStore();
  const { q, skip, limit } = req.query;
  const searchModel = db.model('product', ProductSchema);
  const data = await searchModel.find({
    $text: {
      $search: q,
      $caseSensitive: false
    }
  })
  .sort({ score: { $meta: 'textScore' } })
  .skip(parseInt(skip))
  .limit(parseInt(limit));
  const totalResults = await searchModel.find({
    $text: {
      $search: q,
      $caseSensitive: false
    }
  })
  .countDocuments();
  res.status(200).json({
    data: data,
    totalResults: totalResults,
    query: {...req.query}
  });
}
