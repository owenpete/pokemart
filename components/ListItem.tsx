import { useEffect, useState } from 'react';
import toggleDimmer from '../utils/toggleDimmer';
import { addCart } from '../utils/cartOps';
import { removeListItem, moveListItem } from '../utils/listOps';
import Link from 'next/link';
import Image from 'next/image';
import ReactTooltip from 'react-tooltip';

import ReactStars from 'react-rating-stars-component';
import { FiShoppingCart, FiFolder, FiX } from 'react-icons/fi';

interface Props{
  itemData: any;
  currentListId: string;
  listSelectIsEnabled: boolean;
  setListSelectIsEnabled: (arg: boolean)=>void;
  setSelectedItem: any;
  fetchData: any;
}

const listItem = (props: Props) =>{
  useEffect(()=>{
    toggleDimmer(props.listSelectIsEnabled);
  });
  return (
    <div className='list-item'>
      <ReactTooltip
        className='tooltip list-item__tooltip'
        delayShow={800}
        effect='solid'
        place='bottom'
        textColor='black'
        backgroundColor='#7dcde8'
      />
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
      <div className='list-item__actions'>
        <button
          className='list-item__add-to-cart list-item__action-element'
          onClick={(e: any)=>addCart(props.itemData.productId, 1, 'add')}
          data-tip='Add to cart'
        >
          <FiShoppingCart />
        </button>
        <button
          className='list-item__move list-item__action-element'
          onClick={(e: any)=>{
            props.setSelectedItem(props.itemData);
            props.setListSelectIsEnabled(true);
          }}
          data-tip='Move item'
        >
          <FiFolder />
        </button>
        <button
          className='list-item__remove list-item__action-element'
          onClick={(e: any)=>{
            removeListItem(props.currentListId, props.itemData.productId);
            props.fetchData();
          }}
          data-tip='Remove item'
        >
          <FiX />
        </button>
      </div>
    </div>
  );
}

export default listItem;
