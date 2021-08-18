import Checkout from '../[slug]';

export async function getServerSideProps({ query }){
  return {
    props: {
      listId: query.slug
    }
  }
}

const ListCheckout = (props: any) =>{
  return (
    <Checkout
      checkoutMethod='list'
      listId={props.listId}
    />
  );
}

export default ListCheckout;
