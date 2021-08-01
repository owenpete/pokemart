import { useEffect, useState } from 'react';
import Lists from '../lists/index';

interface Props{
  query: string;
}

export async function getServerSideProps({ query }){
  return {
    props: {
      query: query.slug
    }
  }
}

const ListSlug = (props: Props) =>{
  return(
    <Lists listId={props.query}/>
  );
}

export default ListSlug;
