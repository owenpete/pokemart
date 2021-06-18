import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';

interface Props{
  pageCount: number;
  pageNumber: number;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  query: any;
}

export default function PageSelector(props: Props){
  return (
    <div className='selector'>
      <ul className='selector__container'>
        <FiChevronsLeft className='selector__action'/>
        <FiChevronLeft className='selector__action'/>
        {
          [...Array(props.pageCount)].map((value: any, index: number)=>{
            return (
              <Link
              href={{
                pathname: '/store',
                query: {
                  ...props.query,
                  page: index+1
                }
                }}
                key={Math.random()}>
                <a>
                  <span className='selector__number' >{index+1}</span>
                </a>
              </Link>
            );
          })
        }
        <FiChevronRight className='selector__action'/>
        <FiChevronsRight className='selector__action'/>
      </ul>
    </div>
  );
}
