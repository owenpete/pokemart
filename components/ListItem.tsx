import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import ReactStars from 'react-rating-stars-component';

interface Props{
  itemData: any;
}

const listItem = (props: Props) =>{
  return (
    <div className='list-item'>
      <div className='list-item__image-container'>
        <Image
          src={props.itemData.images[0]}
          height={120}
          width={120}
          quality={100}
        />
      </div>
      <div className='list-item__info'>
        <Link href={`/products/${props.itemData.productId}`}>
          <a>
            <span className='list-item__name'>{props.itemData.name}</span>
          </a>
        </Link>
        <ReactStars
          className='list-item__rating'
          value={props.itemData.rating}
          count={5}
          isHalf={true}
          edit={false}
          size={28}
        />
        <span className='list-item__price'>${props.itemData.price}</span>
      </div>
    </div>
  );
}

export default listItem;
