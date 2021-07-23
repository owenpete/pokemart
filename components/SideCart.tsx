import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

import { getCart }from '../utils/cartOps';
import updateCartState from '../utils/toggleCart';
import axios from 'axios';

import { FiX } from 'react-icons/fi';

interface Props{
  cartData: any;
  isToggled: boolean;
  setToggle: any;
  cartRef: any;
}

const SideCart = (props: Props) =>{
  return(
    <div className='side-cart' ref={props.cartRef}>
      <FiX
        className='side-cart__close-icon'
        onClick={()=>updateCartState(props.isToggled, props.setToggle, props.cartRef)}
      />
      <h1>Cart</h1>
      <div className='side-cart__products'>
        {
        }
      </div>
    </div>
  );
}

export default SideCart;
