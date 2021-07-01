import { useState, useEffect, useRef } from "react";
import Image from 'next/image';
import { Carousel } from 'react-responsive-carousel';

interface Props{
  slides: any
}

const slideNames = ['health', 'food', 'tech', 'outdoor', 'sale'];

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
        {
          slideNames.map((value: any, index: number)=>{
            return(
              <div className='carousel__element' key={Math.random()*new Date().getSeconds()}>
                <div className='carousel__image-container'>
                  <Image
                    src={props.slides[findByName(props.slides, value)].url}
                    height={550}
                    width={1920}
                    layout='fixed'
                    quality={100}
                    priority
                  />
                  <input className={`carousel__button ${value}-button`} value={props.slides[findByName(props.slides, value)].buttonText} type='button' />
                </div>
              </div>
            );
          })
        }
      </Carousel>
    </div>
  );
}
