import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/router";
import localInstance from '../services/api/localInstance';
import { maxProductLimit } from '../constants/maxProductLimit';

import Navbar from "../components/Navbar";
import SubNav from "../components/SubNav";
import SideNav from '../components/SideNav';
import ImageCarousel from "../components/ImageCarousel";
import ReactStars from "react-rating-stars-component";

interface Props {
  slides: any;
  products: any;
}

export async function getServerSideProps(context: any) {
  let slides: any = [];
  let products: any = [];
  const slide = await localInstance.get(`/home/getCarouselSlides`);
  slides = await slide.data.data;
  const data = await localInstance.get("/products", {
    params: {
      limit: 15,
    },
  });
  products = await data.data.data;
  return {
    props: {
      slides: slides,
      products: products,
    },
  };
}

export default function Home(props: Props) {
  useEffect(()=>{
  });
  //this funcion toggles the state of the sideCart component
  return (
    <div className="index">
      <Head>
        <title>Home | Pokémart</title>
        <link rel="icon" href="/ballLogo.png" />
      </Head>
      <Navbar/>
      <SubNav />
      <ImageCarousel slides={props.slides} />
      <div className="index__store-header">
        <Link href="/store">
          <a className="store-header__link">
            <span>Store</span>
          </a>
        </Link>
      </div>
      <div className="index__product-section">
        <div className="product-section__grid">
          {props.products.map((value: any) => {
            return (
              <div
                className="product-section__product"
                key={value._id}
              >
                <div
                  style={{
                    position: "relative",
                    width: 150,
                    height: 150,
                  }}
                >
                  <Link href={`/products/${value.productId}`}>
                    <a>
                      <Image
                        src={value.images[0]}
                        layout="fill"
                        objectFit="contain"
                        priority
                      />
                    </a>
                  </Link>
                </div>
                <div className="product-section__info-container">
                  <ReactStars
                    classNames="info__element"
                    value={value.rating}
                    count={5}
                    isHalf={true}
                    edit={false}
                    size={28}
                  />
                  <Link href={`/products/${value.productId}`}>
                    <a className="info__name info__element">{value.name}</a>
                  </Link>
                  <span className="info__price info__element">
                    ${value.price}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <Link href="/store">
          <a>
            <input
              className="index__more-products-button"
              type="button"
              value="View more products"
            />
          </a>
        </Link>
      </div>
      <div className="footer"></div>
    </div>
  );
}
