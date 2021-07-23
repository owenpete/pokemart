//sorts and syncs product data in the order of which the ids appear
const sortIdSync = (productData: any, productIds: any) =>{
  const productMeta: any[] = Object.values(productIds);
  const sortedData = productMeta.map((value: any)=>{
    for(let i = 0; i < productData.length; i++){
      if(productData[i].productId == value.productId){
        return (
          productData[i]
        );
      }
    }
  });
  return sortedData;
}

export default sortIdSync;
