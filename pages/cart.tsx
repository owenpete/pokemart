import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import SubNav from '../components/SubNav';

import { getCart } from '../utils/cart';
import localInstance from '../services/api/localInstance';

import axios from 'axios';

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
      <div className='cart__list'>
        {cart&&
          cart.map((value: any, index: number)=>{
            return(
              <ul className='cart__product' key={Math.random()}>
                <Image
                  src={value.images[0]}
                  height={150}
                  width={150}
                  quality={100}
                />
                <div className='cart-product__info'>
                  <Link
                    href={`/products/${value.id}`}
                  >
                    <a>
                      <span className='product__element product__name'>{value.name}</span>
                    </a>
                  </Link>
                  <span className='product__element product__price'>${value.price}</span>
                  <span className='product__element product__quantity'>{cartIds[index].q}</span>
                </div>
              </ul>
              )
            })
          }
        </div>
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
