import List from './index';
import { useState, useEffect } from 'react';

interface Props{
  listId: string;
  number: any;
}

export async function getServerSideProps({ query }){
  return {
    props: {
      listId: query.slug,
    }
  }
}

const SlugList = (props: Props) =>{
  return (
    <List
      listId={props.listId}
    />
  );
}

export default SlugList;
