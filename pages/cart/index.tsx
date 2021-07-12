import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../../components/Navbar';
import SubNav from '../../components/SubNav';
import CartProduct from '../../components/CartProduct';
import Loading from '../../components/Loading';

import { getCart } from '../../utils/cart';
import localInstance from '../../services/api/localInstance';
import getCartSize from '../../utils/getCartSize';
import getTotalValue from '../../utils/getTotalValue';

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
    const data = await localInstance.get('/cart', {
      params: {
        ids: ids
      }
    });
  if(data.data.data){
    setCart(data.data.data);
    setCartIds(Object.values(ids));
  }
  setIsLoaded(true);
  })();
}, [rerender])

return (
  <div className='cart'>
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
                quantity={cartIds[index].q}
                productId={cartIds[index].id}
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
