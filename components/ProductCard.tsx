import Image from 'next/image';
import Link from 'next/link';
import ReactStars from "react-rating-stars-component";

interface Props{
  img: string;
  name: string;
  description: string;
  price: number;
  rating: number;
}

export default function ProductCard(props: Props){
  return (
    <div className='product-card'>
      <div
        className='product__image-container'
      >
        <Link href='/store'>
          <a>
            <Image
              src={props.img}
              height={150}
              width={150}
              layout='fixed'
              quality={100}
            />
          </a>
        </Link>
      </div>
      <div className='product__info'>
        <Link href='/store'>
          <a>
            <div className='product__info-element product__name'>
              {props.name}
            </div>
          </a>
        </Link>
        <ReactStars
          classNames='product__info-element product__rating'
          value={props.rating}
          count={5}
          isHalf={true}
          edit={false}
          size={28}
        />
        <div className='product__info-element product__price'>
          {props.price}$
        </div>
      </div>
    </div>
  );
}
