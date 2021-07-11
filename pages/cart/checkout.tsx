import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import Navbar from '../../components/Navbar';
import SubNav from '../../components/SubNav';

export default function Checkout(){
  return(
    <div className='checkout'>
      <Navbar />
      <SubNav />
    </div>
  );
}
