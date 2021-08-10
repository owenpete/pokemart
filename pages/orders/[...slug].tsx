import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';

import Navbar from '../../components/Navbar';
import SubNav from '../../components/SubNav';

import localInstance from '../../services/api/localInstance';

interface Props{
  orderData: any;
  orderPlaced: boolean;
}

const copyId = str => {
  const el = document.createElement('textarea');
  el.value = str;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};

export async function getServerSideProps({ query }){
  const orderId = query.slug[0];
  const orderPlaced = query.slug[1]=='complete';
  let cart: any = null;
  let orders: any = null;
  try{
    orders = await localInstance.get('/orders/getOrderData', {
      params: {
        orderId: orderId
      }
    });
  }catch(err){
    console.log(err);
  }
  return {
    props: {
      //might be an issue later
      orderData: orders.data[0],
      orderPlaced: orderPlaced
    }
  }
}

export default function Order(props: Props){
  return (
    <div className='orders'>
      <Head>
        <title>Order: {props.orderData._id}</title>
        <link rel="icon" href="/ballLogo.png" />
      </Head>
      <Navbar />
      {props.orderPlaced&&
        <h1 className='order__success-header'>
          Thank you!<br/>
          Your order has been placed!
        </h1>
      }
      <div className='orders__summary'>
        <ul className='orders__product-list'>
        <h1 className='orders__id'>Order Id:<br/>
          <span onClick={(e: any)=>{
            copyId(e.target.innerHTML)
          }}> {props.orderData._id}</span>
        </h1>
          {
            props.orderData.order.map((value)=>{
              return (
                <li className='orders__product'>
                  <div style={{minWidth: '80px'}}>
                    <Image
                      src={value.images[0]}
                      height={80}
                      width={80}
                      layout='fixed'
                    />
                  </div>
                  <div className='order-product__info'>
                    <span style={{marginRight: 'auto'}}>{value.name}<br/>
                      ${value.price}
                    </span>
                    <span style={{float: 'right', marginRight: '1rem'}}>x {value.qty}</span>
                  </div>
                </li>
              )
            })
          }
        </ul>
      </div>
    </div>
  );
}

