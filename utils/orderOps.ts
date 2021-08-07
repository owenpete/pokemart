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

