interface Order{
  price: number;
  qty: number;
}

const getTotalCheckoutValue = (order: Order[]) =>{
  const total = order.map((value: any, index: number)=>{
    return value.price * value.qty
  }).reduce((total: number, value: number)=>{
    return total+value;
  });
  return total;
}

export default getTotalCheckoutValue;
