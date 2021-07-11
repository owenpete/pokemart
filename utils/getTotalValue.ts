// returns the total value of a set of items

const getTotalValue = (cart: any, quantities: { id: string; q: number }) =>{
  const total = cart.map((value: any, index: number)=>{
    return value.price * quantities[index].q
  }).reduce((total: number, value: number)=>{
    return total+value;
  });
  return total;
}

export default getTotalValue;
