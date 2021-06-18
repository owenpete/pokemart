import { useState, useEffect } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import Navbar from '../../components/Navbar';
import SubNav from '../../components/SubNav';
import ProductCard from '../../components/ProductCard';
import PageSelector from '../../components/PageSelector';

import { FiChevronDown }from 'react-icons/fi';

import axios from 'axios';

interface Props{
  products: any;
  totalResults: any;
  resPerPage: number;
  page: number;
  query: any;
}

export async function getServerSideProps({query}){
  const response = await axios.get('http://localhost:3000/api/products', {
    params: {
      //!
      skip: query.r*(query.page-1) || 8*(query.page-1),
      //!
      limit: query.r || 8,
      q: query.q || null,
      page: query.page || 1,
    }
  });
  const data = await response.data;
  return {
    props: {
      products: data.data,
      totalResults: data.totalResults,
      resPerPage: data.query.limit,
      page: data.query.page,
      query
    }
  }
}

const getPageCount = (itemCount: number, resPerPage: number) =>{
  return Math.ceil(itemCount/resPerPage);
}

export default function Store(props: Props){
  //!
  const resultOptions = [16, 32, 64, 128];

  const categories = ['Featured', 'Price: Low to High', 'Price High to Low', 'A-Z'];
  const [pageNumber, setPageNumber] = useState<number>(props.page);
  const [resPerPage, setResPerPage] = useState<any>(props.resPerPage || resultOptions[0]);
  const [filter, setFilter] = useState<any>(categories[0]);
  return (
    <div className='store'>
      <Head>
        <title>Store</title>
        <link rel="icon" href="/ballLogo.png" />
      </Head>
      <Navbar />
      <SubNav />
      <div className='store__resbar'>
        <div className='resbar__left'>
          <span className='resbar__result-number'>{(props.page-1)*resPerPage+1}-{resPerPage*props.page>props.totalResults?props.totalResults:resPerPage*props.page} of {props.totalResults} items</span>
        </div>
          <div className='resbar__right'>
            <div className='resbar__filter'>
              <input className='resbar__dropdown-button' value={`Sort by: ${filter}`} type='button' />
              <FiChevronDown className='resbar__dropdown-arrow' />
              <select
                name='catagories'
                className='resbar__dropdown'
                onChange={(e)=>{console.log(e); setFilter(e.target.value)}}
                value={filter}
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
      <ul className='store__main'>
        {
          props.products.map((value: any)=>{
            console.log(value)
            return (
              <ProductCard
                img={value.images[0]}
                name={value.name}
                description={value.description}
                price={value.price}
                rating={value.rating}
                key={Math.random()}
              />
            )
          })
        }
      </ul>
      <PageSelector
        pageCount={getPageCount(props.totalResults, resPerPage)}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        query={props.query}
      />
    </div>
  );
}
