import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import Navbar from '../../components/Navbar';
import SubNav from '../../components/SubNav';
import Loading from '../../components/Loading';

import { getCart } from '../../utils/cart';
import getCartSize from '../../utils/getCartSize';
import getQuantity from '../../utils/getQuantity';
import getTotalValue from '../../utils/getTotalValue';
import getProductById from '../../utils/getProductById';
import localInstance from '../../services/api/localInstance';
import { taxRate, shipping } from '../../constants/econRates';

interface Props{
  ticket: any;
  cart: any;
}

export async function getServerSideProps({ query }){
  const { slug } = query;
  let params: {product: any, qty: number} = {};
  if(slug == 'bin'){
    const res = await localInstance.get('http://localhost:3000/api/products/getData',{
      params: {
        searchField:
          {id: slug.id}
      }
    });
    const product = await res.data.data[0];
    params = {
      product,
      qty: query.qty
    }
    }
  return {
    props: {
      ticket: {slug: slug, ...params},
    }
  }
}

export default function Checkout(props: Props){
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  //database info of items in cart
  const [cart, setCart] = useState<any>();
  //id and quantity of items in localStorage cart
  const [cartIds, setCartIds] = useState<any>();
  useEffect(()=>{
    setIsLoaded(false);
    setCart(undefined);
    (async() =>{
      const ids: any = getCart();
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
  }, [])

  return(
    <div className='checkout'>
      <Navbar />
      <SubNav />
        {isLoaded&&cart&&
          <div className='checkout__container'>
            <div className='checkout__summary'>
              <ul className='summary__list'>
                {props.ticket.slug=='cart'&&
                  cart.map((value: any)=>{
                    return(
                      <>
                        <div className='summary__total'>
                          <span>Subtotal ({getCartSize(cartIds)} items):
                            <span style={{fontWeight: 'bold'}}>
                              ${getTotalValue(cart, cartIds)}
                            </span>
                          </span>
                        </div>
                        <li className='summary__item'>
                          <Image
                            src={value.images[0]}
                            height={80}
                            width={80}
                          />
                          <div className='summary__info'>
                            <span>{value.name}</span>
                            <span>${value.price}</span>
                            <span>Qty: <span className='summary__quantity'>{getQuantity(value.id, cartIds)}</span></span>
                          </div>
                        </li>
                      </>
                    )
                  })
                }
                {props.ticket.slug=='bin'&&
                  <>
                    <div className='summary__total'>
                      <span>Subtotal ({props.ticket.qty}) items):
                        <span style={{fontWeight: 'bold'}}>
                          ${props.ticket.product.price*props.ticket.qty}
                        </span>
                      </span>
                    </div>
                    <li className='summary__item'>
                      <Image
                        src={props.ticket.product.images[0]}
                        height={80}
                        width={80}
                      />
                      <div className='summary__info'>
                        <span>{props.ticket.product.name}</span>
                        <span>${props.ticket.product.price}</span>
                        <span>Qty: <span className='summary__quantity'>{props.ticket.qty}</span></span>
                      </div>
                    </li>
                  </>
                }
              </ul>
            </div>
            <div className='summary__confirm'>
              <span>Subtotal ({props.ticket.qty || getCartSize(cartIds)} items)
                <span className='summary__price'>
                  ${props.ticket.product?.price*props.ticket.qty || getTotalValue(cart, cartIds)}
                </span>
              </span>
              <span>Est. Shipping <span className='summary__price'>${shipping}</span></span>
              <span>Tax <span className='summary__price'>
                ${Math.round(props.ticket.product?.price*props.ticket.qty*taxRate || getTotalValue(cart, cartIds)*taxRate)}
                </span>
              </span>
              <span>Total
                <span className='summary__price'>
                  ${props.ticket.product?.price*props.ticket.qty + props.ticket.product?.price*props.ticket.qty*taxRate+shipping || getTotalValue(cart, cartIds)+getTotalValue(cart, cartIds)*taxRate+shipping}
                </span>
              </span>
              <input
                className='summary__checkout-button'
                type='button'
                value='Checkout'
              />
            </div>
        </div>
        }
      {isLoaded&&!cart&&
        <div className='checkout__summary--empty'>
          <span>No items in cart.</span>
          <Link
            href='/store'
          >
            <a>
              <input
                className='summary__button--empty'
                type='button'
                value='Return to Store'
              />
            </a>
          </Link>
        </div>
      }
      {!isLoaded&&
        <Loading />
      }
    </div>
  );
}
