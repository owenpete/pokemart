import connectGeneral from '../../../services/connectGeneral';
import Slide from '../../../schemas/SlideSchema';

//fetches home page carousel images from database
export default async function(req: any, res: any){
  const db = await connectGeneral();
  const data = await db.model('slides', Slide).find({});
  res.json({data: data});
}
