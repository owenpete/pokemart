import { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';

interface Props{
  isToggled: boolean;
  setToggle: any;
  sidebarRef: any;
}

const SideNav = (props: Props) =>{

  return (
    <div
      className='sidenav'
      ref={props.sidebarRef}
    >
      <FiX
        className='sidenav__close'
        onClick={(e)=>{
          props.setToggle(!props.isToggled);
        }}
      />
    </div>
  );
}

export default SideNav;
