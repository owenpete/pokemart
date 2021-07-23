interface Product{
  productId: string;
  price: number;
}

interface Quantity{
  productId: string;
  qty: number;
}

const getTotalValue = (products: [Product], quantities: [Quantity]) =>{
  const total = products.map((value: any, index: number)=>{
    return value.price * quantities[index].qty
  }).reduce((total: number, value: number)=>{
    return total+value;
  });
  return total;
}

export default getTotalValue;
