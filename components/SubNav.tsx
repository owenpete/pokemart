import { useState } from 'react';
import Link from 'next/link';

export default function SubNav(){
  return (
    <div className='subnav'>
      <ul className='subnav__list'>
        <li className='subnav__item'>
          <Link href='/store'>
            <a>Shop All</a>
          </Link>
        </li>
        <li className='subnav__item'>
          <Link href='/store'>
            <a>Best Sellers</a>
          </Link>
        </li>
        <li className='subnav__item'>
          <Link href='/store'>
            <a>On Sale</a>
          </Link>
        </li>
        <li className='subnav__item'>
          <Link href='/store'>
            <a>Sports And Outdoors</a>
          </Link>
        </li>
        <li className='subnav__item'>
          <Link href='/store'>
            <a>Health And Wellness</a>
          </Link>
        </li>
        <li className='subnav__item'>
          <Link href='/store'>
            <a>Tech</a>
          </Link>
        </li>
      </ul>
    </div>
  );
}
