interface Item{
  productId: string;
  qty: number;
}
// loops through an array of item-quantity pairs and returns the item quantity matching the itemId passed to the function
const getQuantity = (productId: string, items: [Item]) =>{
  for(let i = 0; i < items.length; i++){
    if(productId == items[i].productId){
      return(items[i].qty)
    }
  }
}

export default getQuantity;
