const formatItemText = (itemCount: number) =>{
  if(itemCount == 1){
    return 'item';
  }else{
    return 'items';
  }
}

export default formatItemText;
