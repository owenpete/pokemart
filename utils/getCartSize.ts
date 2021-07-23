interface Cart{
  id: string;
  q: number;
}

// maps through cart and adds up the total quantity of items
const getCartSize = (cart: Cart) =>{
  const total = Object.values(cart).map((value: any)=>{
    return(value.qty);
  }).reduce((total: number, value: number)=>total+=value);
  return total;
}

export default getCartSize;
