import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import SubNav from '../components/SubNav';

import { getCart } from '../utils/cart';

import axios from 'axios';

interface Props{
  cart: any;
}

export default function Cart(props: Props){
  useEffect(()=>{
    (async() =>{
      const ids = getCart();
      const data = await axios.get('http://localhost:3000/api/cart', {
        params: {
          ids: ids
        }
      });
    setCart(data.data.data);
    setIsLoaded(true);
    console.log(JSON.parse(window.localStorage.getItem('cart')))
    })();
  }, [])
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [cart, setCart] = useState<any>();
  return (
    <div className='cart'>
      {isLoaded&&
      <>
        <Navbar />
        <SubNav />
        <div className='cart__list'>
          {cart&&
            cart.map((value: any)=>{
              return(
                <ul className='cart__element' key={Math.random()}>
                  {value.name}
                </ul>
              )
            })
          }
        </div>
      </>
      }
    </div>
  );
}
