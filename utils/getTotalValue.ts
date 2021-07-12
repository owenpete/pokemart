// returns the total value of a set of items

const getTotalValue = (products: [{ id: string, price: number }], quantities: [{ id: string; q: number }]) =>{
  const total = products.map((value: any, index: number)=>{
    return value.price * quantities[index].q
  }).reduce((total: number, value: number)=>{
    return total+value;
  });
  return total;
}

export default getTotalValue;
