import { useState, useEffect } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import Navbar from '../../components/Navbar';
import SubNav from '../../components/SubNav';
import ProductCard from '../../components/ProductCard';

import { FiChevronDown  }from 'react-icons/fi';

import axios from 'axios';

interface Props{
  products: any
}

export async function getServerSideProps(){
  const response = await axios.get('http://localhost:3000/api/products');
  const data = await response.data.data;
  return {
    props: {
      products: data
    }
  }
}

export default function Store(props: Props){
  useEffect(()=>{
    console.log(props.products)
  });
  const categories = ['Featured', 'Price: Low to High', 'Price High to Low', 'A-Z'];
  const [dropdown, setDropdown] = useState<any>(categories[0]);
  return (
    <div className='store'>
      <Head>
        <title>Store</title>
        <link rel="icon" href="/ballLogo.png" />
      </Head>
      <Navbar />
      <SubNav />
      <div className='store__resbar'>
        <span className='resbar__result-number'>Showing 1-{props.products.length} of {props.products.length} results</span>
          <div className='resbar__filter-container'>
            <div className='resbar__filter'>
              <input className='resbar__dropdown-button' value={`Sort by: ${dropdown}`} type='button' />
              <FiChevronDown className='resbar__dropdown-arrow' />
              <select
                name='catagories'
                className='resbar__dropdown'
                onChange={(e)=>{console.log(e); setDropdown(e.target.value)}}
                value={dropdown}
              >
                {
                  categories.map((value)=>{
                    return (
                      <option value={value} key={Math.random()}>{value}</option>
                    );
                  })
                }
              </select>
          </div>
        </div>
      </div>
      <div className='store__main'>
        {
          props.products.map((value: any)=>{
            return (
              <ProductCard
                img={value.images[0]}
                name={value.name}
                description={value.description}
                price={value.price}
                rating={value.rating}
              />
            )
          })
        }
      </div>
    </div>
  );
}
