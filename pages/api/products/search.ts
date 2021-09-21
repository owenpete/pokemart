import connectStore from "../../../services/connectStore";
import ProductSchema from "../../../schemas/ProductSchema";

export default async function (req: any, res: any) {
  const db = await connectStore();
  const { q, f, skip, limit } = req.query;
  const searchModel = db.model('product', ProductSchema);
  let data:  any;
  let totalResults: number;
  if(q != null){
    data = await searchModel.find({
      $text: {
        $search: q,
        $caseSensitive: false
      }
    })
    .sort({ score: { $meta: 'textScore' } })
    .skip(parseInt(skip))
    .limit(parseInt(limit));
    totalResults = await searchModel.find({
      $text: {
        $search: q,
        $caseSensitive: false
      }
    })
    .countDocuments();
  }else if(f){
    switch(f){
      case 'price-asc':
        data = await searchModel
          .find(q)
          .sort('price')
          .skip(parseInt(skip))
          .limit(parseInt(limit));
        totalResults = await searchModel.find(q).countDocuments();
        break;
      case 'price-desc':
        data = await searchModel
          .find(q)
          .sort('-price')
          .skip(parseInt(skip))
          .limit(parseInt(limit));
        totalResults = await searchModel.find(q).countDocuments();
        break;
      case 'a-z':
        data = await searchModel
          .find(q)
          .sort('name')
          .skip(parseInt(skip))
          .limit(parseInt(limit));
        totalResults = await searchModel.find(q).countDocuments();
        break;
      case 'z-a':
        data = await searchModel
          .find(q)
          .sort('-name')
          .skip(parseInt(skip))
          .limit(parseInt(limit));
        totalResults = await searchModel.find(q).countDocuments();
        break;
      default:
        data = await searchModel
          .find(q)
          .skip(parseInt(skip))
          .limit(parseInt(limit));
        totalResults = await searchModel.find(q).countDocuments();
        break;
    }
  }else{
    data = await searchModel.find({
    })
    .sort({nos: 'asc'})
    .skip(parseInt(skip))
    .limit(parseInt(limit));
    totalResults = await searchModel.find({
    })
    .countDocuments();
  }

  res.status(200).json({
    data: data,
    totalResults: totalResults,
    query: {...req.query}
  });
}
