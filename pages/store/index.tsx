import { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '../../components/Navbar';

export default function Store(){
  return (
    <div className='store'>
      <Navbar />
      <div style={{height:600, width:600, backgroundColor:'green', margin:150}}></div>
    </div>
  );
}
