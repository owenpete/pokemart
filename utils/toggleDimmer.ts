
const toggleDimmer = (isEnabled: boolean) =>{
    if(isEnabled){
      document.getElementById('dimmer').style.backgroundColor='hsla(0, 0%, 0%, 35%)';
      document.getElementById('dimmer').style.pointerEvents='auto';
    }else{
      document.getElementById('dimmer').style.backgroundColor=null;
      document.getElementById('dimmer').style.pointerEvents=null;
    }
}

export default toggleDimmer;
