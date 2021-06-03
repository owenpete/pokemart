import '../styles/globals.scss';
import '../styles/index.scss';
import '../styles/navbar.scss';
import '../styles/imageCarousel.scss';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
