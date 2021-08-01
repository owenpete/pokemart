// import App from "next/app";
import type { AppProps /*, AppContext */ } from 'next/app';
import { useState, useEffect, useRef } from 'react';
import { initDefaultList } from '../utils/listOps';
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
import '../styles/lists.scss';
import '../styles/createList.scss';
import '../styles/listItem.scss';
import '../styles/listSelect.scss';

NProgress.configure({ showSpinner: false });
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());


function MyApp({ Component, pageProps }: AppProps) {
  useEffect(()=>{
    //create a default wish list if there isnt one already
    initDefaultList();
  });
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  return(
    <SideNavContext.Provider value={[sidebarIsOpen, setSidebarIsOpen]}>
      <div className='app'>
        <div id='dimmer'></div>
        <Component {...pageProps} />
      </div>
    </SideNavContext.Provider>
  )
}

export default MyApp;
