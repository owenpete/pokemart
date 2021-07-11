//returns the total amount of items in cart

interface Cart{
  id: string;
  q: number;
}

const getCartSize = (cart: Cart) =>{
  const total = Object.values(cart).map((value: any)=>{return(value.q);}).reduce((total: number, value: number)=>total+=value);
  return total;
}

export default getCartSize;
