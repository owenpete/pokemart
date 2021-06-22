import "../styles/globals.scss";
import "../styles/index.scss";
import "../styles/navbar.scss";
import "../styles/imageCarousel.scss";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../styles/subnav.scss";
import Router from "next/router";
import NProgress from "nprogress";
import "../styles/nprogress.scss";
import '../styles/store.scss';
import '../styles/productCard.scss';
import '../styles/pageSelector.scss';
import '../styles/product.scss';

NProgress.configure({ showSpinner: false });
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
