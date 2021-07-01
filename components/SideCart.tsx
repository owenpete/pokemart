import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

import { FiX } from 'react-icons/fi';

import toggleCart from '../utils/toggleCart';

interface Props{
  isToggled: boolean;
  setToggle: any;
  cartRef: any;
}

const SideCart = (props: Props) =>{
  return(
    <div className='side-cart' ref={props.cartRef}>
      <FiX
        onClick={()=>toggleCart(props.isToggled, props.setToggle, props.cartRef)}
      />
    </div>
  );
}

export default SideCart;
