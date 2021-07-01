import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import SubNav from '../components/SubNav';

import { getCart } from '../utils/cart';

import axios from 'axios';

interface Props{
}

export default function Cart(props: Props){
  useEffect(async()=>{
    const cart = getCart();
    let res;
    try{
      res = await axios.get({
        url: 'http://localhost:3000/api/cart',
      });
    }catch(err){
      console.log(err)
    }
    const data = await res;
    console.log(data);
  });
  return (
    <div className='cart'>
      <Navbar />
      <SubNav />
    </div>
  );
}
