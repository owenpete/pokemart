import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getOrders, verifyOrderExists } from '../../utils/orderOps';
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
    await verifyOrderExists();
    const orders = getOrders();
    if(orders){
      const orderIds = Object.values(orders).map((value: any)=>value.orderId);
      const orderData = await localInstance.get('/orders/getOrders', {
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
          <h1 className='orders__header'>Recent Orders:</h1>
          <table className='orders__table'>
            <tr className='orders__table-header-container orders__table-row'>
              <th>Order Id</th>
              <th>Items</th>
              <th>Total</th>
              <th>Order Date</th>
            </tr>
            {
              orderData.map((value: any)=>{
                return (
                  <tr className='orders__table-element orders__table-row'>
                    <td className='orders__table-order-id'>
                      <Link
                        href={`/orders/${value._id}`}
                      >
                        <a className='orders__table-order-link'>{value._id}</a>
                      </Link>
                    </td>
                    <td className='orders__table-item-count'>
                      {value.order.length} {value.order.length==1?'item':'items'}
                    </td>
                    <td className='orders__table-total'>
                      ${value.total}
                    </td>
                    <td className='orders__table-order-date'>
                      {new Date(value.orderDate).toLocaleDateString()}
                    </td>
                  </tr>
                )
              })
            }
          </table>
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
