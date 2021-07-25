// import App from "next/app";
import type { AppProps /*, AppContext */ } from 'next/app';
import { useState, useEffect, useRef } from 'react';
import Router from "next/router";
import NProgress from "nprogress";
import SideNav from '../components/SideNav';
import SideNavContext from '../contexts/SideNavContext';

import '../styles/reset.scss';
import "../styles/globals.scss";
import "../styles/index.scss";
import "../styles/navbar.scss";
import "../styles/footer.scss";
import "../styles/imageCarousel.scss";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../styles/subnav.scss";
import "../styles/nprogress.scss";
import '../styles/store.scss';
import '../styles/productCard.scss';
import '../styles/pageSelector.scss';
import '../styles/product.scss';
import '../styles/loading.scss';
import '../styles/cart.scss';
import '../styles/cartProduct.scss';
import '../styles/checkout.scss';
import '../styles/orders.scss';
import '../styles/sideNav.scss';

NProgress.configure({ showSpinner: false });
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());


function MyApp({ Component, pageProps }: AppProps) {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const sidebarRef = useRef<any>();
  const toggleSidebar = () =>{
    if(sidebarIsOpen){
      sidebarRef.current.style.width=null
      document.getElementById('dimmer').style.backgroundColor='hsla(0, 0%, 0%, 35%)';
      document.getElementById('dimmer').style.pointerEvents='auto';
    }else{
      sidebarRef.current.style.width='0px'
      document.getElementById('dimmer').style.backgroundColor=null;
      document.getElementById('dimmer').style.pointerEvents=null;
    }
  }
  useEffect(()=>{
    toggleSidebar();
  }, [sidebarIsOpen]);
  return(
    <SideNavContext.Provider value={[sidebarIsOpen, setSidebarIsOpen]}>
      <div className='app'>
        <div id='dimmer'></div>
        <SideNav
          isToggled={sidebarIsOpen}
          setToggle={setSidebarIsOpen}
          sidebarRef={sidebarRef}
        />
        <Component {...pageProps} />
      </div>
    </SideNavContext.Provider>
  )
}

export default MyApp;
