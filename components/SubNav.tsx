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
          <Link href='/store?f=best-selling'>
            <a>Best Sellers</a>
          </Link>
        </li>
        <li className='subnav__item'>
          <Link href='/store?f=on-sale'>
            <a>On Sale</a>
          </Link>
        </li>
      </ul>
    </div>
  );
}
