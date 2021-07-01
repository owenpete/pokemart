export const getCart = () =>{
  try {
    const cart = window.localStorage.getItem('cart');
    return JSON.parse(cart);
  }catch(err: any){
    console.log('errrrrr', err)
  }
}

export const addCart = (productId: string) =>{
  try{
    const cart: any[] = getCart() || [];
    window.localStorage.setItem('cart', JSON.stringify([...cart, productId]));
    window.dispatchEvent( new Event('storage') );
  }catch(err: any){
    console.log(err)
  }
}

export const removeCart = (productId: string) =>{
  try{
    const cart: any[] = getCart();
    window.localStorage.setItem('cart', JSON.stringify([...cart].splice(cart.indexOf(productId), 1)));
    window.dispatchEvent( new Event('storage') );
  }catch(err: any){
    console.log(err)
  }
}

export const clearCart = () =>{
  try{
    window.localStorage.removeItem('cart');
    window.dispatchEvent( new Event('storage') );
  }catch(err: any){
    console.log(err);
  }
}
