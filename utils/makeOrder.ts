import localInstance from '../services/api/localInstance';

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

const makeOrder = async(orderData: Order[], orderIds: string[]) =>{
  const orderItemCollections: any[] = orderData.map((value: any)=>value.order);
  const orderProductIds =
    orderItemCollections.map((value: any)=>{
      return value.map((value: any)=>{
        return value.productId;
      });
    });
  // all productIds in all orders combined
  const productIds: string[] = [].concat.apply([], orderProductIds);
  // remove all duplicates and return an array of unique ids
  const uniqueProductIds: string[] = [...productIds.filter((value: any, index: number)=>productIds.indexOf(value)==index)];
  const productApiResponse: any = await localInstance.get('/products/getMany',{
    params: {
      productIds: JSON.stringify(uniqueProductIds)
    }
  });
  const productData: any = productApiResponse.data;
  const newOrderArray = orderItemCollections.map((value: any)=>{
    return value.map((value: any)=>{
      return productData[getIndexOfProductId(value.productId, productData)]
    });
  });
  const mergedOrder =
    [...orderData.map((orderDataValue: any, orderDataIndex: number)=>{
      return {
        ...orderDataValue,
        order:
          orderDataValue.order.map((value: any, index: number)=>{
            return {
              ...orderDataValue.order[index],
              ...newOrderArray[orderDataIndex][index]
            };
          })
      }
    })];
    return mergedOrder;
}

export default makeOrder;
