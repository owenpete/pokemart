import connectGeneral from '../../../utils/connectGeneral';
import Slide from '../../../schemas/Slide';

export default async function(req: any, res: any){
  const db = await connectGeneral();
  const data = await db.model('slides', Slide).find({});
  res.json({data: data});
}
