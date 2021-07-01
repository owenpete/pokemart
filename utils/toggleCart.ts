const toggleCart = (isToggled: boolean, setToggle: any, cartRef: any) =>{
    if(isToggled){
      cartRef.current.style.minWidth = 0;
      cartRef.current.style.width = 0;
    }else {
      cartRef.current.style.minWidth = null;
      cartRef.current.style.width = null;
    }
    setToggle(!isToggled);
}

export default toggleCart;
