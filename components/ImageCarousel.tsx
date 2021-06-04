import { useState, useEffect, useRef } from "react";
import Image from 'next/image';
import { Carousel } from 'react-responsive-carousel';

interface Props{
  slides: any
}

const findByName = (arr: any[], name: string) =>{
  for(let i = 0; i < arr.length; i++){
    if(arr[i].name==name){
      return i
    }
  }
  return -1;
}

export default function ImageCarousel(props: Props) {
  return (
    <div className="carousel">
      <Carousel
        autoPlay
        interval={8000}
        infiniteLoop
        stopOnHover
        emulateTouch
        swipeable
        useKeyboardArrows
        showThumbs={false}
        showStatus={false}
      >
        <div className='carousel__element'>
          <div className='carousel__image-container'>
            <Image
              src={props.slides[findByName(props.slides, 'health')].url}
              height={550}
              width={1920}
            />
            <input className='carousel__button health-button' value='Shop Health & Wellness'type='button' />
          </div>
        </div>
        <div className='carousel__element'>
          <div className='carousel__image-container'>
            <Image
              src={props.slides[findByName(props.slides, 'food')].url}
              height={550}
              width={1920}
            />
            <input className='carousel__button food-button' value='Shop Food & Drink'type='button' />
          </div>
        </div>
        <div className='carousel__element'>
          <div className='carousel__image-container'>
            <Image
              src={props.slides[findByName(props.slides, 'tech')].url}
              height={550}
              width={1920}
            />
            <input className='carousel__button tech-button' value='Shop Tech'type='button' />
          </div>
        </div>
        <div className='carousel__element'>
          <div className='carousel__image-container'>
            <Image
              src={props.slides[findByName(props.slides, 'outdoor')].url}
              height={550}
              width={1920}
            />
            <input className='carousel__button outdoor-button' value='Shop Sports & Outdoors'type='button' />
          </div>
        </div>
        <div className='carousel__element'>
          <div className='carousel__image-container'>
            <Image
              src={props.slides[findByName(props.slides, 'sale')].url}
              height={550}
              width={1920}
            />
            <input className='carousel__button sale-button' value='Shop Sales'type='button' />
          </div>
        </div>
      </Carousel>
    </div>
  );
}
