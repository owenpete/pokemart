import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import SubNav from '../components/SubNav';
import CartProduct from '../components/CartProduct';

import { getCart } from '../utils/cart';
import localInstance from '../services/api/localInstance';

interface Props{
  cart: any;
}

export default function Cart(props: Props){
useEffect(()=>{
  (async() =>{
    const ids = getCart();
    const data = await localInstance.get('/cart', {
      params: {
        ids: ids
      }
    });
  setCart(data.data.data);
  setCartIds(Object.values(ids));
  setIsLoaded(true);
  })();
}, [])
const [isLoaded, setIsLoaded] = useState<boolean>(false);
const [cart, setCart] = useState<any>();
const [cartIds, setCartIds] = useState<any>();

return (
  <div className='cart'>
    <Navbar />
    <SubNav />
    {isLoaded&&
    <>
      <ul className='cart__list'>
        {cart&&
          cart.map((value: any, index: number)=>{
            return(
              <CartProduct
                image={value.images[0]}
                name={value.name}
                price={value.price}
                quantity={cartIds[index].q}
                productId={cartIds[index].id}
              />
              )
            })
          }
        </ul>
      </>
      }
      {!isLoaded&&
        <div className='cart__loading'>
          <Image
            src='/ballLogo.png'
            height={50}
            width={50}
          />
        </div>
      }
    </div>
  );
}
