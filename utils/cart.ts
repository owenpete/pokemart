export const getCart = () =>{
  try {
    const cart = window.localStorage.getItem('cart');
    return JSON.parse(cart);
  }catch(err: any){
    console.log('errrrrr', err)
  }
}

export const addCart = (productId: string, numberOfItems: number, method: 'set' | 'add'='add') =>{
  try{
    let cart: any = getCart() || {};
    if(cart[productId]){
      if(method == 'set'){
        cart[productId] = {...cart[productId], q: cart[productId].q = numberOfItems }
      }else if(method == 'add'){
        cart[productId] = {...cart[productId], q: cart[productId].q+numberOfItems>=99? cart[productId].q=99 : cart[productId].q += numberOfItems }
      }
      window.localStorage.setItem('cart', JSON.stringify({...cart}));
    }else{
      cart[productId] = { id: productId, q: numberOfItems };
      window.localStorage.setItem('cart', JSON.stringify({...cart}));
    }
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
