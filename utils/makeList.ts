
const makeList = (list: {listItems: any}, listData: [{}]) =>{
  const listArray = Object.values(list);
  for(let i = 0; i < listArray.length; i++){
    listArray[i].listItems=[listData[i]];
  }
  return listArray;
}


export default makeList;
