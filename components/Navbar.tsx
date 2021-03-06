import { useRef, useState, useEffect, useContext } from 'react';
import toggleDimmer from '../utils/toggleDimmer';
import SideNavContext from '../contexts/SideNavContext';
import SideNav from '../components/SideNav';
import router from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { FiMenu, FiShoppingCart, FiChevronDown } from 'react-icons/fi';
import { AiOutlineSearch } from 'react-icons/ai';

import { getCart, addCart } from '../utils/cartOps';
import getCartSize from '../utils/getCartSize';

export default function Navbar(){
  const [sidebarIsOpen, setSidebarIsOpen] = useContext(SideNavContext);
  const categories = ['All', 'Health & Wellness', 'Food & Drink', 'Tech', 'Sports & Outdoors', 'On Sale', 'Under 1000$'];
  const [dropdown, setDropdown] = useState<any>(categories[0]);
  const [search, setSearch] = useState<string>("");
  const [cart, setCart] = useState<any>(null);

  useEffect(() => {
    setSidebarIsOpen(false);
    //pull cart data from storage and display the proper number next to the cart icon
    setCart(getCart());
    function checkUserData() {
      const item = getCart();
      setCart(item)
    }
    window.addEventListener("storage", checkUserData)
    return () => {
      window.removeEventListener("storage", checkUserData)
    }
  }, []);

  const handleSearch = (event: any) =>{
    if(event.key == 'Enter' && search != ''){
      router.push({
        pathname: '/store',
        query: {
          q: search,
        }
      });
    }
  }
  const sidebarRef = useRef<any>();
  const toggleSidebar = () =>{
    if(sidebarIsOpen){
      sidebarRef.current.style.width='500px'
      toggleDimmer(sidebarIsOpen);
    }else{
      sidebarRef.current.style.width='0px'
      toggleDimmer(sidebarIsOpen);
    }
  }
  useEffect(()=>{
    toggleSidebar();
  }, [sidebarIsOpen]);

  return (
    <div className='nav'>
      <SideNav
        isToggled={sidebarIsOpen}
        setToggle={setSidebarIsOpen}
        sidebarRef={sidebarRef}
      />
      <div className='nav--left'>
        <FiMenu
          className='nav__icon nav__menu-icon'
          onClick={(e: any)=>{
            setSidebarIsOpen(!sidebarIsOpen);
          }}
        />
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
            onChange={(e)=>{setDropdown(e.target.value)}}
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
          value={search}
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
          <a
            className='nav__icon-container'
          >
            {cart&&
              <span className='nav__cart-size'>
                {
                  getCartSize(cart)
                }
              </span>
            }
            <FiShoppingCart
              className='nav__icon nav__cart-icon'
            />
          </a>
        </Link>
      </div>
    </div>
  );
}
