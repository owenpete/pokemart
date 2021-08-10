import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

import Navbar from '../../components/Navbar';
import SubNav from '../../components/SubNav';
import Loading from '../../components/Loading';

import { getCart, clearCart } from '../../utils/cartOps';
import { addOrder } from '../../utils/orderOps';
import getCartSize from '../../utils/getCartSize';
import getQuantity from '../../utils/getQuantity';
import getTotalValue from '../../utils/getTotalValue';
import localInstance from '../../services/api/localInstance';
import { taxRate, shipping } from '../../constants/econRates';

interface Props{
  ticket: any;
  cart: any;
}

export async function getServerSideProps({ query }){
  const checkoutMethod = query.slug;
  let ticketParams: {product: any, qty: number} = {product: null, qty: null};
  if(checkoutMethod == 'bin'){
    const res = await localInstance.get('/products/getOne',{
      params: {
        searchField: { productId: query.productId }
      }
    });
    const product = await res.data.data[0];
    ticketParams = {
        product,
        qty: parseInt(query.qty)
      }
    }
  return {
    props: {
      ticket: {
        checkoutMethod: checkoutMethod,
        ...ticketParams
      }
    }
  }
}

export default function Checkout(props: Props){
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  //database info of items in cart/bin order
  const [orderItems, setOrderItems] = useState<any>();
  //id and quantity of items in localStorage cart/bin order
  const [orderIds, setOrderIds] = useState<any>();
  const [isProcessingOrder, setIsProcessingOrder] = useState<boolean>(false);
  useEffect(()=>{
    setIsLoaded(false);
    setOrderItems(undefined);
    if(props.ticket.checkoutMethod=='cart'){
      (async() =>{
        const productIds: any = getCart();
        const data = await localInstance.get('/products/getMany', {
          params: {
            productIds: JSON.stringify(Object.values(productIds).map((value: any)=>value.productId))
          }
        });
      if(data.data){
        setOrderItems(data.data);
        setOrderIds(Object.values(productIds));
      }
      setIsLoaded(true);
      })();
    }else if(props.ticket.checkoutMethod=='bin'){
      setOrderItems(props.ticket.product);
      setIsLoaded(true);
    }
  }, [])

  return(
    <div className='checkout'>
      <Navbar />
      <SubNav />
      {isLoaded&&!orderItems&&
        <div className='checkout__summary--empty'>
          <span>No items in cart.</span>
          <Link
            href='/store'
          >
            <input
              className='summary__button--empty'
              type='button'
              value='Return to Store'
            />
          </Link>
        </div>
      }
      {isLoaded&&orderItems&&
        <div className='checkout__container'>
          <div className='checkout__summary'>
            <ul className='summary__list'>
              <div className='summary__total'>
                <span>Subtotal ({props.ticket.checkoutMethod=='cart'?getCartSize(orderIds) : props.ticket.qty} items):
                  <span style={{fontWeight: 'bold'}}>
                    ${props.ticket.checkoutMethod=='cart'?getTotalValue(orderItems, orderIds) : props.ticket.qty*props.ticket.product.price}
                  </span>
                </span>
              </div>
              {props.ticket.checkoutMethod=='cart'&&
                orderItems.map((value: any)=>{
                  return(
                    <>
                      <li className='summary__item'>
                        <Image
                          src={value.images[0]}
                          height={80}
                          width={80}
                        />
                        <div className='summary__info'>
                          <span>{value.name}</span>
                          <span>${value.price}</span>
                          <span>Qty: <span className='summary__quantity'>{getQuantity(value.productId, orderIds)}</span></span>
                        </div>
                      </li>
                    </>
                  )
                })
              }
              {props.ticket.checkoutMethod=='bin'&&
                <>
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
            <span>Subtotal ({props.ticket.qty || getCartSize(orderIds)} items)
              <span className='summary__price'>
                ${props.ticket.product?.price*props.ticket.qty || getTotalValue(orderItems, orderIds)}
              </span>
            </span>
            <span>Est. Shipping <span className='summary__price'>${shipping}</span></span>
            <span>Tax <span className='summary__price'>
              ${Math.round(props.ticket.product?.price*props.ticket.qty*taxRate || getTotalValue(orderItems, orderIds)*taxRate)}
              </span>
            </span>
            <span>Total
              <span className='summary__price'>
                ${props.ticket.product?.price*props.ticket.qty + props.ticket.product?.price*props.ticket.qty*taxRate+shipping || getTotalValue(orderItems, orderIds)+getTotalValue(orderItems, orderIds)*taxRate+shipping}
              </span>
            </span>
            <div className='checkout-button__container'>
              <input
                className='summary__checkout-button'
                type='button'
                value={!isProcessingOrder? 'Checkout' : ''}
                onClick={async(e: any)=>{
                  e.target.disabled=true;
                  setIsProcessingOrder(true);
                  if(props.ticket.checkoutMethod=='cart'){
                    try{
                      //creates new order in database and returns the _id
                      const orderId = await localInstance.post('/orders/processOrder', {
                        order: JSON.stringify(orderIds),
                        tax: taxRate*getTotalValue(orderItems, orderIds),
                        shipping: shipping,
                        subtotal: getTotalValue(orderItems, orderIds),
                      });
                      await router.push(`/orders/${orderId.data}/complete`);
                      clearCart();
                      addOrder(orderId.data);
                    }catch(err){
                      console.error(err)
                    }
                  }else if(props.ticket.checkoutMethod=='bin'){
                    try{
                      //creates new order in database and returns the _id
                      const orderId = await localInstance.post('/orders/processOrder', {
                        order: JSON.stringify([{...props.ticket.product, qty: props.ticket.qty}]),
                        tax: taxRate*(props.ticket.product.price*props.ticket.qty),
                        shipping: shipping,
                        subtotal: (props.ticket.product.price*props.ticket.qty)+(taxRate*(props.ticket.product.price*props.ticket.qty))+shipping,
                      });
                      await router.push(`/orders/${orderId.data}/complete`);
                      addOrder(orderId.data);
                    }catch(err){
                      console.error(err)
                    }
                  }
                }}
              />
              {isProcessingOrder&&
                <div className='checkout-button__loading'>
                  <Image
                    src='/ballLogo.png'
                    height={45}
                    width={45}
                  />
                </div>
              }
            </div>
          </div>
      </div>
      }
      {!isLoaded&&
        <Loading />
      }
    </div>
  );
}
