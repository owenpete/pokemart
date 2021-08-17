interface Order{
  qty: number;
}

const getCheckoutSize = (order: Order[]) =>{
  const quantity = order.map((value: any)=>{
    return value.qty;
  }).reduce((total: number, currentValue: number)=>{
    return total+=currentValue;
  });
  return quantity;
}

export default getCheckoutSize;
