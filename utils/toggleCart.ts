const updateCartState = (isToggled: boolean, setToggle: any, cartRef: any) =>{
  if(isToggled){
    cartRef.current.style.transform='translateX(0)';
    document.getElementById('dimmer').style.pointerEvents="all";
    document.getElementById('dimmer').style.backgroundColor="hsla(0, 0%, 0%, 30%)";
  }else {
    cartRef.current.style.transform=null;
    document.getElementById('dimmer').style.pointerEvents=null;
    document.getElementById('dimmer').style.backgroundColor=null;
  }
  console.log(isToggled)
  setToggle(!isToggled);
}

export default updateCartState;
