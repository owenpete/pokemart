const getQuantity = (id: string, items: [{id: string, q: number}]) =>{
  for(let i = 0; i < items.length; i++){
    if(id == items[i].id){
      return(items[i].q)
    }
  }
}

export default getQuantity;
