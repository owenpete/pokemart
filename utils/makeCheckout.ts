import localInstance from '../services/api/localInstance';
import sortIdSync from '../utils/sortIdSync';

interface Order{
  orderDate:any;
  order: string;
  qty: number;
  tax: number;
  shipping: number;
  subtotal: string;
  total: string;
}

const getIndexOfProductId = (productId: string, productDataCollection: [{productId: string}]) =>{
  for(let i = 0; i < productDataCollection.length; i++){
    if(productId == productDataCollection[i].productId){
      return i;
    }
  }
}

const makeCheckout = (checkoutItems: Order[], checkoutIds: {}[]) =>{
  const sortedData = sortIdSync('productId', checkoutItems, checkoutIds.map((value: any)=>value.productId));
  const mergedData = sortedData.map((value: any, index: number)=>{
    return {
      ...value,
      ...checkoutIds[index]
    }
  });
  return mergedData;
}

export default makeCheckout;
