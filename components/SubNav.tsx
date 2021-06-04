import { useState } from 'react';
import Link from 'next/link';

export default function SubNav(){
  return (
    <div className='subnav'>
      <ul className='subnav__list'>
        <li className='subnav__item'>
          <Link href='/store'>
            <a>Shop</a>
          </Link>
        </li>
        <li className='subnav__item'>
          <Link href='store'>
            <a>On Sale</a>
          </Link>
        </li>
      </ul>
    </div>
  );
}
