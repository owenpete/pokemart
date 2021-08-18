import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import makeCheckout from '../../utils/makeCheckout';
import getCheckoutSize from '../../utils/getCheckoutSize';
import getTotalCheckoutValue from '../../utils/getTotalCheckoutValue';

import Navbar from '../../components/Navbar';
import SubNav from '../../components/SubNav';
import Loading from '../../components/Loading';

import { getCart, clearCart } from '../../utils/cartOps';
import { getListById } from '../../utils/listOps';
import { addOrder } from '../../utils/orderOps';
import localInstance from '../../services/api/localInstance';
import { taxRate, shipping } from '../../constants/econRates';

interface Props{
  checkoutMethod: string;
  binItem?: any;
  listId?: string;
}

interface BinItem{
  product: any;
  qty: number;
}

const getTax = (order: any) =>{
  return getTotalCheckoutValue(order)+getTotalCheckoutValue(order)*taxRate;
}

const getTotal = (order: any) =>{
  return getTotalCheckoutValue(order)+getTax(order)+shipping;
}

const prepareDbOrder = (order: {}[]) =>{
  const extractedData = order.map((value: any)=>{
    return {
      productId: value.productId,
      qty: value.qty
    }
  });
  return [
    ...extractedData
  ]
}

export async function getServerSideProps({ query }){
  const checkoutMethod = query.slug;
  let binItemData: BinItem = null;
  if(checkoutMethod == 'bin'){
    const res = await localInstance.get('/products/getOne',{
      params: {
        searchField: {
          productId: query.productId
        }
      }
    });
    const productData = await res.data.data[0];
    binItemData = {
      ...productData,
      qty: parseInt(query.qty)
    }
  }
  return {
    props: {
      checkoutMethod: checkoutMethod,
      binItem: binItemData
    }
  }
}

export default function Checkout(props: Props){
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [order, setOrder] = useState<any>(undefined);
  const [isProcessingOrder, setIsProcessingOrder] = useState<boolean>(false);

  const fetchCheckoutData = async() =>{
    if(props.checkoutMethod=='cart'){
      const productIds: any[] = getCart();
      const cartRes = await localInstance.get('/products/getMany', {
        params: {
          productIds: JSON.stringify(Object.values(productIds).map((value: any)=>value.productId))
        }
      });
      const cartData = cartRes.data;
      if(cartData){
        const finishedOrder = makeCheckout(cartData, Object.values(productIds), 'productId');
        setOrder([...finishedOrder]);
      }
    }else if(props.checkoutMethod=='bin'){
      setOrder([props.binItem]);
    }else if(props.checkoutMethod=='list'){
      const list = getListById(props.listId);
      const listItems: any[] = list.listItems;
      const orderRes = await localInstance.get('/products/getMany', {
        params: {
          productIds: JSON.stringify(Object.values(listItems).map((value: any)=>value.productId))
        }
      });
      const orderData = orderRes.data;
      if(orderData){
        const finishedOrder = makeCheckout(orderData, Object.values(listItems), 'productId');
        setOrder([...finishedOrder]);
      }
    }
    setIsLoaded(true);
  }

  useEffect(()=>{
    setIsLoaded(false);
    setOrder(undefined);
    fetchCheckoutData();
  }, []);

  return(
    <div className='checkout'>
      <Navbar />
      <SubNav />
      {isLoaded&&!order&&
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
      {isLoaded&&order&&
        <div className='checkout__container'>
          <div className='checkout__summary'>
            <ul className='summary__list'>
              <div className='summary__total'>
                <span>Subtotal ({getCheckoutSize(order)} items):
                  <span style={{fontWeight: 'bold'}}>
                    ${getTotalCheckoutValue(order)}
                  </span>
                </span>
              </div>
              {(props.checkoutMethod=="cart" || props.checkoutMethod=="list")&&
                order.map((value: any)=>{
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
                          <span>Qty: <span className='summary__quantity'>{value.qty}</span></span>
                        </div>
                      </li>
                    </>
                  )
                })
              }
              {props.checkoutMethod=='bin'&&
                <>
                  <li className='summary__item'>
                    <Image
                      src={order[0].images[0]}
                      height={80}
                      width={80}
                    />
                    <div className='summary__info'>
                      <span>{order[0].name}</span>
                      <span>${order[0].price}</span>
                      <span>Qty: <span className='summary__quantity'>{order[0].qty}</span></span>
                    </div>
                  </li>
                </>
              }
            </ul>
          </div>
          <div className='summary__confirm'>
            <span>Subtotal ({getCheckoutSize(order)} items)
              <span className='summary__price'>
                ${getTotalCheckoutValue(order)}
              </span>
            </span>
            <span>Est. Shipping <span className='summary__price'>${shipping}</span></span>
            <span>Tax <span className='summary__price'>
              ${Math.round(getTax(order))}
              </span>
            </span>
            <span>Total
              <span className='summary__price'>
                ${getTotal(order)}
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
                  try{
                    //creates new order in database and returns the _id
                    const orderId = await localInstance.post('/orders/processOrder', {
                      order: JSON.stringify(prepareDbOrder(order)),
                      tax: getTax(order),
                      shipping: shipping,
                      subtotal: getTotalCheckoutValue(order),
                    });
                    await router.push(`/orders/${orderId.data}/complete`);
                    if(props.checkoutMethod=='cart'){
                      clearCart();
                    }
                    addOrder(orderId.data);
                  }catch(err){
                    console.error(err)
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
