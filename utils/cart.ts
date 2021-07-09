import { maxProductLimit } from '../constants/maxProductLimit';

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
        cart[productId] = {...cart[productId], q: cart[productId].q+numberOfItems>=maxProductLimit? cart[productId].q=maxProductLimit: cart[productId].q += numberOfItems }
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
    let cart: any = getCart();
    delete cart[productId];
    if(cart=={}){
      window.localStorage.removeItem('cart');
    }else{
      window.localStorage.setItem('cart', JSON.stringify({...cart}));
    }
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
