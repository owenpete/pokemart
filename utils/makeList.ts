
const makeList = (list: {listItems: any}, listData: [{}]) =>{
  const finalList = {...list, listItems: [...listData]};
  return finalList;
}


export default makeList;
