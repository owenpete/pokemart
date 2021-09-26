import { useState, useEffect } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import router from 'next/router';
import Navbar from '../../components/Navbar';
import SubNav from '../../components/SubNav';
import ProductCard from '../../components/ProductCard';
import PageSelector from '../../components/PageSelector';

import { FiChevronDown }from 'react-icons/fi';

import localInstance from '../../services/api/localInstance';

interface Props{
  products: any;
  totalResults: any;
  resPerPage: number;
  page: number;
  query: any;
}

export async function getServerSideProps({query}){
  // setting query params
  query={
    ...query,
    // if there is no query set query to null
    q: query.q || null,
    // if page is undefined set it to the first page
    page: query.page || 1
  }

  const products = await localInstance.get('/products/search', {
    params: {
      skip: 8*(query.page-1),
      limit: 8,
      ...query
    }
  });

  const productListData = await products.data;
  return {
    props: {
      products: productListData.data,
      totalResults: productListData.totalResults,
      resPerPage: productListData.query.limit,
      page: productListData.query.page,
      query: {
        ...query,
      }
    },
  }
}

const getPageCount = (itemCount: number, resPerPage: number) =>{
  return Math.ceil(itemCount/resPerPage);
}

export default function Store(props: Props){
  const filterCategories = [
    {
      name:'Featured',
      filter: ''
    },
    {
      name:'Price: Low to High',
      filter: 'price-asc'
    },
    {
      name:'Price: High to Low',
      filter: 'price-desc'
    },
    {
      name:'A-Z',
      filter: 'a-z'
    },
    {
      name:'Z-A',
      filter: 'z-a'
    },
  ];

  const [pageNumber, setPageNumber] = useState<number>(props.page);
  const [resPerPage, setResPerPage] = useState<any>(props.resPerPage);
  const [filter, setFilter] = useState<any>(props.query.f || filterCategories[0].name);
  useEffect(()=>{
    if(props.query.f){
      try{
        setFilter(filterCategories[filterCategories.findIndex(value=>props.query.f==value.filter)].name)
      }catch(err: any){
        setFilter(filterCategories[0].name);
      }
    }else{
      setFilter(filterCategories[0].name);
    }
  }, [props.query.f]);

  const handleFilter = (filter: string) =>{
    router.push({
      href: '/store',
      query: {
        ...props.query,
        page: 1,
        f: filterCategories[filterCategories.findIndex(value=>filter==value.name)].filter
      }
    });
  }

  return (
    <div className='store'>
      <Head>
        <title>Store</title>
        <link rel="icon" href="/ballLogo.png" />
      </Head>
      <Navbar />
      <SubNav />
      {props.totalResults>0?
      <>
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
                  onChange={(e)=>{handleFilter(e.target.value)}}
                  value={filter}
                >
                  {
                    //populating filters
                    filterCategories.map((value)=>{
                      return (
                        <option value={value.name} key={Math.random()}>{value.name}</option>
                      );
                    })
                  }
                </select>
            </div>
          </div>
        </div>
        <ul className='store__main'>
          {
            //populating page with products
            props.products.map((value: any)=>{
              return (
                <ProductCard
                  img={value.images[0]}
                  name={value.name}
                  description={value.description}
                  price={value.price}
                  rating={value.rating}
                  href={value.productId}
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
      </>
      :
      <span
        className='store__no-res'
      >
        No results for "<b>{props.query.q}</b>"
      </span>
      }
    </div>
  );
}
