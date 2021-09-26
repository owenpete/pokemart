import connectStore from "../../../services/connectStore";
import ProductSchema from "../../../schemas/ProductSchema";

// fetches all product data matching the query params
export default async function (req: any, res: any) {
  const db = await connectStore();

  const { skip, limit, searchFields, q, f } = req.query;

  let query: any = {};

  if(q&&!searchFields){
    query.name=q;
  }else if(searchFields){
    query = Object.assign(query, JSON.parse(searchFields));
  }

  const product = db.model("Product", ProductSchema);
  let data: any;
  let totalResults: any;

  if(f){
    switch(f){
      case 'price-asc':
        data = await product
          .find(query)
          .sort('price')
          .skip(parseInt(skip))
          .limit(parseInt(limit));
        totalResults = await product.find(query).countDocuments();
        break;
      case 'price-desc':
        data = await product
          .find(query)
          .sort('-price')
          .skip(parseInt(skip))
          .limit(parseInt(limit));
        totalResults = await product.find(query).countDocuments();
        break;
      case 'a-z':
        data = await product
          .find(query)
          .sort('name')
          .skip(parseInt(skip))
          .limit(parseInt(limit));
        totalResults = await product.find(query).countDocuments();
        break;
      case 'z-a':
        data = await product
          .find(query)
          .sort('-name')
          .skip(parseInt(skip))
          .limit(parseInt(limit));
        totalResults = await product.find(query).countDocuments();
        break;
      default:
        data = await product
          .find(query)
          .skip(parseInt(skip))
          .limit(parseInt(limit));

        totalResults = await product.find(query).countDocuments();
        break;
    }
  }else{
    data = await product
      .find(query)
      .skip(parseInt(skip))
      .limit(parseInt(limit));

    totalResults = await product.find(query).countDocuments();
  }

  res.status(200).json({
    data: data,
    totalResults: totalResults,
    query: { ...req.query },
  });
}
