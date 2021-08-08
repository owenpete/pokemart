import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getOrders } from '../../utils/orderOps';
import makeOrder from '../../utils/makeOrder';
import localInstance from '../../services/api/localInstance';
import Navbar from '../../components/Navbar';
import SubNav from '../../components/SubNav';
import Loading from '../../components/Loading';

const OrdersList = () =>{
  const [orderData, setOrderData] = useState<any>(undefined);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const fetchOrderData = async() =>{
    setIsLoaded(false);
    setOrderData(undefined);
    const orders = getOrders();
    if(orders){
      const orderIds = Object.values(orders).map((value: any)=>value.orderId);
      const orderData = await localInstance.get('/store/getOrders', {
        params: {
          orderIds: JSON.stringify(orderIds)
        }
      });
      const finalOrder = await makeOrder(orderData.data, orderIds);
      setOrderData(finalOrder);
    }
    setIsLoaded(true);
  }

  useEffect(()=>{
    fetchOrderData();
  }, []);

  return (
    <div className='orders-list'>
      <Navbar />
      <SubNav />
      {orderData&&isLoaded&&
        <div className='orders__container'>
          <ul className='orders__list'>
          </ul>
        </div>
      }
      {!orderData&&isLoaded&&
        <div className='orders__empty-container'>
          <span className='orders__empty-text'>
            No recent orders.
          </span>
        </div>
      }
      {!isLoaded&&
        <Loading />
      }

    </div>
  );
}

export default OrdersList;
