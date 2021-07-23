import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import SubNav from '../../components/SubNav';


const OrdersList = () =>{
  return (
    <div className='orders-list'>
      <Navbar />
      <SubNav />
    </div>
  );
}


export default OrdersList;
