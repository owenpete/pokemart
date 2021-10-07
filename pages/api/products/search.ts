import connectStore from "../../../services/connectStore";
import ProductSchema from "../../../schemas/ProductSchema";

interface SearchData{
  data: any;
  totalResults: number;
}

export default async function (req: any, res: any) {
  const db = await connectStore();
  const { q, f, skip, limit } = req.query;
  const searchModel = db.model('product', ProductSchema);
  let data:  any;
  let totalResults: number;

  const defaultSearch: any = async() =>{
    const data: any = await searchModel.find({
    })
    .sort('-nos')
    .skip(parseInt(skip))
    .limit(parseInt(limit));
    const totalResults: number = await searchModel.find({
    })
    .countDocuments();
    return {
      data: data,
      totalResults: totalResults
    }
  }

  if(q != null && q != undefined && q != ""){
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

      case 'best-selling':
        data = await searchModel
          .find(q)
          .sort('-nos')
          .skip(parseInt(skip))
          .limit(parseInt(limit));
        totalResults = await searchModel.find(q).countDocuments();
        break;
      case 'on-sale':
        data = await searchModel
          .find({
            sale: true
          })
          .sort('-nos')
          .skip(parseInt(skip))
          .limit(parseInt(limit));
        totalResults = await searchModel.find({sale: true}).countDocuments();
        break;

      default:
        const searchRes = await defaultSearch();
        data = searchRes.data;
        totalResults = searchRes.totalResults;
        break;
    }
  }else{
    const searchRes = await defaultSearch();
    data = searchRes.data;
    totalResults = searchRes.totalResults;
  }

  res.status(200).json({
    data: data,
    totalResults: totalResults,
    query: {...req.query}
  });
}
