import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { addCart, removeCart } from '../utils/cart';
import { maxProductLimit } from '../constants/maxProductLimit';

import { FiChevronDown } from 'react-icons/fi';

interface Props{
  image: string;
  name: string;
  price: number;
  quantity: number;
  productId: string;
}

const CartProduct = (props: Props) =>{
  const [quantity, setQuantity] = useState<number>();

  useEffect(()=>{
    setQuantity(props.quantity);
  },[]);

  return (
    <>
      <li className='cart-product'>
        <Image
          src={props.image}
          height={150}
          width={150}
          quality={100}
        />
        <div className='cart-product__info'>
          <Link
            href={`/products/${props.productId}`}
           >
            <a>
              <span className='cart-product__element cart-product__name'>{props.name}</span>
            </a>
          </Link>
          <span className='cart-product__element cart-product__price'>${props.price}</span>
          <div className='cart-product__element cart-product__quantity'>
            <input
              className='cart-product__quantity-button'
              type='button'
              value={quantity}
            />
            <FiChevronDown
              className='cart-product__quantity-arrow'
            />
            <select
              className='cart-product__quantity-select'
              onChange={(e)=>{
                setQuantity(parseInt(e.target.value));
                e.target.value=='0'?removeCart(props.productId) : addCart(props.productId, parseInt(e.target.value), 'set');
              }}
            >
              <option value={0}>0</option>
              {
                [...Array(maxProductLimit)].map((value: any, index: number)=>{
                  return (
                    <option selected={index==quantity} value={index+1}>
                      {index+1}
                    </option>
                  );
                })
              }
            </select>
          </div>
        </div>
      </li>
    </>
  );
}

export default CartProduct;
