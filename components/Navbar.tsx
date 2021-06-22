import { useRef, useState, useEffect } from 'react';
import router from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { FiMenu, FiShoppingCart, FiChevronDown } from 'react-icons/fi';
import { AiOutlineSearch } from 'react-icons/ai';

export default function Navbar(){
  const categories = ['All', 'Health & Wellness', 'Food & Drink', 'Tech', 'Sports & Outdoors', 'On Sale', 'Under 1000$'];
  const [dropdown, setDropdown] = useState<any>(categories[0]);
  const [search, setSearch] = useState<string>("");

  const handleSearch = (event: any) =>{
    if(event.key == 'Enter' && search != ''){
      router.push({
        pathname: '/store',
        query: {
          q: search
        }
      });
    }
  }

  return (
    <div className='nav'>
      <div className='nav--left'>
          <FiMenu className='nav__icon nav__menu-icon'/>
        <Link href='/'>
          <a><img className='nav__icon nav__logo' src='/logo.png' /></a>
        </Link>
      </div>
      <div className='nav--center'>
        <div className='nav__select'>
          <input className='nav__dropdown-button' value={dropdown} type='button' />
          <FiChevronDown className='nav__dropdown-arrow' />
          <select
            name='catagories'
            className='nav__dropdown'
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
        <input
          className='nav__search'
          type='text'
          placeholder='Search'
          onChange={(e)=>setSearch(e.target.value)}
          onKeyDown={(e)=>handleSearch(e)}
          onFocus={(e)=>e.target.placeholder=''}
          onBlur={(e)=>e.target.placeholder='Search'}
        />
        <Link
          href={{
            pathname: '/store',
            query: {
              q: search
            }
          }}
        >
          <a style={
              {
                display: 'flex',
                alignItems: 'center'
              }
            }>
            <AiOutlineSearch
              className='nav__search-icon'
            />
          </a>
      </Link>
      </div>
      <div className='nav--right'>
        <Link href='/lists'>
          <a className='nav__icon nav__lists'>Lists</a>
        </Link>
        <Link href='/orders'>
          <a className='nav__orders nav__icon'>Orders</a>
        </Link>
        <Link href='/cart'>
          <a><FiShoppingCart className='nav__icon nav__cart-icon'/></a>
        </Link>
      </div>
    </div>
  );
}
