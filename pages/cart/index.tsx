import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../../components/Navbar';
import SubNav from '../../components/SubNav';
import CartProduct from '../../components/CartProduct';
import Loading from '../../components/Loading';

import { getCart } from '../../utils/cartOps';
import localInstance from '../../services/api/localInstance';
import getCartSize from '../../utils/getCartSize';
import getTotalValue from '../../utils/getTotalValue';
import axios from 'axios'

interface Props{
  cart: any;
}

export default function Cart(props: Props){
const [cart, setCart] = useState<any>();
const [cartIds, setCartIds] = useState<any>();
const [rerender, setRerender] = useState<boolean>(true);
const [isLoaded, setIsLoaded] = useState<boolean>(false);
useEffect(()=>{
  setIsLoaded(false);
  setCart(undefined);
  (async() =>{
    const ids = getCart();
    const data = await localInstance.get('products/getMany', {
      params: {
        productIds: ids
      }
    });
  if(data.data){
    setCart(data.data);
    setCartIds(Object.values(ids));
  }
  setIsLoaded(true);
  })();
}, [rerender])

return (
  <div className='cart'>
    <Head>
      <title>Your Cart | Pokemart</title>
      <link rel="icon" href="/ballLogo.png" />
    </Head>
    <Navbar />
    <SubNav />
    {isLoaded&&cart&&
    <>
      <div className='cart__summary-bar'>
        <span className='summary-bar__subtotal'>
          Subtotal ({getCartSize(cartIds)} items): <span className='subtotal__total'>${getTotalValue(cart, cartIds)}</span>
        </span>
        <Link
          href='/checkout/cart'
        >
          <button
            className='summary-bar__checkout'
            type='button'
          >
            Proceed to checkout &#8594;
          </button>
        </Link>
      </div>
      <ul className='cart__list'>
        {
          cart.map((value: any, index: number)=>{
            return(
              <CartProduct
                image={value.images[0]}
                name={value.name}
                price={value.price}
                quantity={cartIds[index].qty}
                productId={cartIds[index].productId}
                rerender={setRerender}
                value={rerender}
                key={value._id}
              />
              )
            })
          }
        </ul>
      </>
      }
      {isLoaded&&!cart&&
        <div>
          <div className='cart__empty'>
            <span>
              No items in cart
            </span>
            <Link
              href='/store'
            >
              <a>
                <input
                  type='button'
                  value='Shop now'
                 />
              </a>
            </Link>
          </div>
        </div>
      }
      {!isLoaded&&
        <Loading />
      }
    </div>
  );
}
