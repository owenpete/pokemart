import localInstance from '../services/api/localInstance';
import sortIdSync from './sortIdSync';

const orderStorageName = 'orders';

export const getOrders = () =>{
  try{
    const orders = window.localStorage.getItem(orderStorageName);
    return JSON.parse(orders);
  }catch(err: any){
    console.log(err)
  }
}

export const addOrder = (orderId: string) =>{
  const orders = getOrders();
  const orderObject = {
    ...orders,
    [orderId]: {
      orderId: orderId
    }
  }
  window.localStorage.setItem(orderStorageName, JSON.stringify(orderObject));
}

export const removeOrder = (orderId: string) =>{
  try{
    let orders = getOrders();
    delete orders[orderId];
    if(!Object.values(orders).length){
      window.localStorage.removeItem(orderStorageName);
    }else{
      window.localStorage.setItem(orderStorageName, JSON.stringify({...orders}));
    }
  }catch(err: any){
    console.log(err)
  }
}

export const verifyOrderExists = async() =>{
  const orders = getOrders();
  const hasOrders = orders!=null;
  if(hasOrders){
    const orderIds = Object.values(orders).map((value: any)=>value.orderId);
    const orderEntries = Object.entries(orders);
    for(let i = 0; i < orderIds.length; i++){
      const orderExists = await localInstance.get('/store/orderExists', {
        params: {
          orderId: JSON.stringify(orderIds[i])
        }
      });
      if(!orderExists.data){
        removeOrder(orderIds[i]);
      }
    }
  }
}
