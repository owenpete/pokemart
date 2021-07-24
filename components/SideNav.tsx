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
      <div className='sidenav__header'>
        <FiX
          className='sidenav__close'
          onClick={(e)=>{
            props.setToggle(!props.isToggled);
          }}
        />
      </div>
    </div>
  );
}

export default SideNav;
