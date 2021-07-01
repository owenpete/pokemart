import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/router";

import Navbar from "../components/Navbar";
import SubNav from "../components/SubNav";
import ImageCarousel from "../components/ImageCarousel";
import SideCart from "../components/SideCart";
import axios from "axios";
import ReactStars from "react-rating-stars-component";

interface Props {
  slides: any;
  products: any;
}

export async function getStaticProps() {
  let slides: any = [];
  let products: any = [];
  try {
    const response = await axios.get(`http://localhost:3000/api/home/slides`);
    slides = await response.data.data;
  } catch (err: any) {
    console.log(err);
  }
  try {
    const response = await axios.get("http://localhost:3000/api/products", {
      params: {
        limit: 15,
      },
    });
    products = await response.data.data;
  } catch (err: any) {
    console.log(err);
  }
  return {
    props: {
      slides: slides,
      products: products,
    },
  };
}

export default function Home(props: Props) {
  const sideCartRef = useRef<any>();
  //this funcion toggles the state of the sideCart component
  return (
    <div className="index">
      <Head>
        <title>Pokémart</title>
        <link rel="icon" href="/ballLogo.png" />
      </Head>
      <Navbar
        sideCartRef={sideCartRef}
      />
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
          {props.products.slice(0, 15).map((value: any) => {
            return (
              <div
                className="product-section__product"
                key={Math.random() * new Date().getSeconds()}
              >
                <div
                  style={{
                    position: "relative",
                    width: 150,
                    height: 150,
                  }}
                >
                  <Link href="/store">
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
                  <Link href="/store">
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
      <SideCart
        isToggled={false}
        setToggle={()=>console.log('yo')}
      />
      <div className="footer"></div>
    </div>
  );
}
