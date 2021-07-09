import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';

import Navbar from '../../components/Navbar';
import SubNav from '../../components/SubNav';

import { FiChevronDown } from 'react-icons/fi';

import localInstance from '../../services/api/localInstance';
import { Carousel } from 'react-responsive-carousel';
import ReactStars from "react-rating-stars-component";
import { maxProductLimit } from '../../constants/maxProductLimit';

import { addCart } from '../../utils/cart';

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
  const res = await localInstance.get('http://localhost:3000/api/products/getData',{
    params: {
      searchField:
        {id: slug}
    }
  });
  const product = await res.data.data[0];
  return {
    props: {
      product
    }
  }
}

const Product = (props: Props) =>{
  const [dropdown, setDropdown] = useState(1);

  return (
    <div className='product'>
      <Head>
        <title>{props.product.name}</title>
        <link rel="icon" href="/ballLogo.png" />
      </Head>
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
            <input className='quantity__dropdown-button' value={dropdown} type='button' />
            <FiChevronDown className='quantity__dropdown-arrow' />
            <select
              name='catagories'
              className='quantity__dropdown'
              onChange={(e)=>{setDropdown(parseInt(e.target.value))}}
              value={dropdown}
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
            <input
              className='info__element info__add-to-cart-button'
              type='button'
              value='Add to cart'
              onClick={()=>{addCart(props.product.id, dropdown)}}
            />
            <input
              className='info__element info__buy-it-now-button'
              type='button'
              value='Buy it now'
            />
          </div>
        </div>
      </div>
    </div>
  );
}


export default Product;
