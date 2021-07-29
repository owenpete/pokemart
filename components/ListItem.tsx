import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import ReactStars from 'react-rating-stars-component';

interface Props{
  itemData: {};
}

const listItem = (props: Props) =>{
  return (
    <div className='list-item'>
      <div className='list-item__image-container'>
        <Image
          src={'https://storage.googleapis.com/pkmproducts/pokeballs/pokeball/pokeball.jpg'}
          height={120}
          width={120}
          quality={100}
        />
      </div>
      <div className='list-item__info'>
        <span className='list-item__name'>Poke Ball</span>
        <ReactStars
          className='list-item__rating'
          value={5}
          count={5}
          isHalf={true}
          edit={false}
          size={28}
        />
        <span className='list-item__price'>$100</span>
      </div>
    </div>
  );
}

export default listItem;
