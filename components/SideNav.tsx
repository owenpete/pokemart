import { useState, useEffect } from 'react';
import { getCart } from '../utils/cartOps';
import getCartSize from '../utils/getCartSize';
import Link from 'next/link';
import { FiX, FiAlertTriangle, FiHome, FiShoppingBag, FiShoppingCart, FiList, FiPackage, FiGithub } from 'react-icons/fi';

interface Props{
  isToggled: boolean;
  setToggle: any;
  sidebarRef: any;
}

const SideNav = (props: Props) =>{
  const [cart, setCart] = useState<any>(0);
  useEffect(()=>{
    let cartSize: number = getCart() || 0;
    setCart(cartSize);
    function checkUserData() {
      const item = getCart();
      setCart(item)
    }
    window.addEventListener("storage", checkUserData)
    return () => {
      window.removeEventListener("storage", checkUserData)
    }
  }, []);
  const sidenavListOptions = [
    {
      title: "Home",
      icon: <FiHome className="sidenav__list-icon list-icon__home" />,
      link: "/",
    },
    {
      title: "Store",
      icon: <FiShoppingBag className="sidenav__list-icon list-icon__store" />,
      link: "/store",
    },
    {
      title: `Cart (${cart ? getCartSize(cart) : 0})`,
      icon: <FiShoppingCart className="sidenav__list-icon list-icon__cart" />,
      link: "/cart",
    },
    {
      title: "Lists",
      icon: <FiList className="sidenav__list-icon list-icon__lists" />,
      link: "/lists",
    },
    {
      title: "Orders",
      icon: <FiPackage className="sidenav__list-icon list-icon__orders" />,
      link: "/orders",
    },
  ];
  return (
    <div
      className='sidenav'
      ref={props.sidebarRef}
    >
      <div className='sidenav__header'>
        <h1 className='sidenav__header-text'>Menu</h1>
        <FiX
          className='sidenav__close'
          onClick={(e)=>{
            props.setToggle(!props.isToggled);
          }}
        />
      </div>
      <ul className='sidenav__list'>
        {sidenavListOptions.map((value: any, index: any)=>{
            return (
              <Link
                href={value.link}
                key={index}
              >
                <li className='sidenav__list-element'>
                  <a>
                    {value.icon}{value.title}
                  </a>
                </li>
              </Link>
            )
          })
        }
      </ul>
      <div className='sidenav__footer'>
        <a
          className='sidenav__icon-container sidenav__github'
          target='_blank'
          href='https://github.com/owenpete/pokemart'
        >
          <FiGithub className='sidenav__icon'/>
          <span>Srouce code</span>
        </a>
        <Link
          href='/bug-report'
        >
          <a className='sidenav__icon-container sidenav__report'>
            <FiAlertTriangle className='sidenav__icon'/>
            <span>Report a bug</span>
          </a>
        </Link>
      </div>
    </div>
  );
}

export default SideNav;
