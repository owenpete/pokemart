import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import Navbar from '../../components/Navbar';
import SubNav from '../../components/SubNav';
import ListSelect from '../../components/ListSelect';

import { FiChevronDown, FiList } from 'react-icons/fi';

import localInstance from '../../services/api/localInstance';
import { Carousel } from 'react-responsive-carousel';
import ReactStars from "react-rating-stars-component";
import { maxProductLimit } from '../../constants/maxProductLimit';

import { addCart } from '../../utils/cartOps';
import { addToList, getLists } from '../../utils/listOps';

interface Props{
  product: any;
}

const renderThumbs = (children: any[], imgArr: string[]) => {
    const images = imgArr.map((value: any)=>{
      return (
        <Image
          src={value}
          height={70}
          width={70}
          priority={true}
        />
      );
    });
    return(
      [
        ...images
      ]
    )
}

export async function getServerSideProps({query}){
  const { slug } = query;
  const res = await localInstance.get('/products/getOne',{
    params: {
      searchField:
        {productId: slug}
    }
  });
  const product = await res.data.data[0];
  return {
    props: {
      product
    }
  }
}

export default function Products(props: Props){
  const [quantity, setQuantity] = useState(1);
  const [listSelectIsEnabled, setListSelectIsEnabled] = useState<boolean>(false);

  return (
    <div className='product'>
      <Head>
        <title>{props.product.name}</title>
        <link rel="icon" href="/ballLogo.png" />
      </Head>
      <ListSelect
        isEnabled={listSelectIsEnabled}
        setIsEnabled={setListSelectIsEnabled}
        product={props.product}
        mode={'add'}
      />
      <Navbar />
      <SubNav />
      <div className='product__container'>
        <div className='product__carousel'>
          <Carousel
            autoPlay={false}
            infiniteLoop
            emulateTouch
            swipeable
            useKeyboardArrows
            showThumbs={props.product.images.map > 1}
            renderThumbs={(e)=>renderThumbs(e,props.product.images)}
            showStatus={props.product.images.map > 1}
            showArrows={props.product.images.map > 1}
            showIndicators={props.product.images.map > 1}
          >
            {
              props.product.images.map((value: any, index: number)=>{
                return(
                  <div className='carousel__image' key={Math.random()*new Date().getSeconds()}>
                    <div>
                      <Image
                        src={value}
                        height={600}
                        width={600}
                        layout='fixed'
                        priority={true}
                        quality={100}
                      />
                    </div>
                  </div>
                );
              })
            }
          </Carousel>
        </div>
        <div className='product__info'>
          <span className='info__element info__name'>{props.product.name}</span>
            <ReactStars
              classNames='info__element info__rating'
              value={props.product.rating}
              count={5}
              isHalf={true}
              edit={false}
              size={36}
            />
          <span className='info__element info__price'>${props.product.price}</span>
          <label className='info__element quantity__label'>Quantity: </label>
          <div className='info__quantity'>
            <input className='quantity__dropdown-button' value={quantity} type='button' />
            <FiChevronDown className='quantity__dropdown-arrow' />
            <select
              name='catagories'
              className='quantity__dropdown'
              onChange={(e)=>{setQuantity(parseInt(e.target.value))}}
              value={quantity}
            >
              {
                [...Array(maxProductLimit)].map((value, index: number)=>{
                  return (
                    <option value={index+1} key={Math.random()}>{index+1}</option>
                  );
                })
              }
            </select>
          </div>
          <div className='info__description'>
            <span>{props.product.description}</span>
          </div>
          <div className='info__buy-actions'>
            <div className='info__save-to-list'>
              <input
                className='info__element info__save-to-list-button'
                type='button'
                value='Save to List'
                onClick={()=>{addToList('default', props.product.productId)}}
              />
              <button
                className='info-element info__save-to-list-select-button'
                onClick={(e: any)=>{
                  setListSelectIsEnabled(true);
                }}
              >
                <FiList className='quantity__dropdown-arrow' />
              </button>
            </div>
            <input
              className='info__element info__add-to-cart-button'
              type='button'
              value='Add to cart'
              onClick={()=>{addCart(props.product.productId, quantity)}}
            />
            <Link
              href={{
                pathname: '/checkout/bin',
                query: {
                  productId: props.product.productId,
                  qty: quantity
                }
              }}
            >
              <a>
                <input
                  className='info__element info__buy-it-now-button'
                  type='button'
                  value='Buy it now'
                />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
