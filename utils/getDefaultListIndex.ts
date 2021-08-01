const getDefaultListIndex = (listArray: any[]) =>{
  let defaultListIndex: number = -1;
  for(let i = 0; i < listArray.length; i++){
    if(listArray[i]?.default == true){
      defaultListIndex=i;
    }
  }
  return defaultListIndex;
}

export default getDefaultListIndex;
