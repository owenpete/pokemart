import { useEffect, useState } from 'react';
import { getLists, addToList, moveListItem } from '../utils/listOps';
import toggleDimmer from '../utils/toggleDimmer';

import Image from 'next/image';
import Loading from '../components/Loading';

import { FiX } from 'react-icons/fi';

interface Props{
  isEnabled: boolean;
  setIsEnabled: (arg: boolean)=>void;
  product: any;
  mode: 'add' | 'move';
  currentListId?: string;
  refetchData: any;
}

const ListSelect = (props: Props) =>{
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [lists, setLists] = useState<any[]>();
  useEffect(()=>{
    setIsLoaded(false);
    toggleDimmer(props.isEnabled);
    const listArray = Object.values(getLists());
    setLists(listArray);
    setIsLoaded(true);
  }, [props.isEnabled]);

  return (
    <>
    {props.isEnabled && isLoaded?
      <div className='list-select__container'>
        <div className='list-select'>
          <div className='list-select__header'>
            <span className='list-select__header-text'>Lists</span>
            <FiX
              className='list-select__close'
              onClick={(e: any)=>props.setIsEnabled(false)}
            />
          </div>
          <ul className='list-select__list'>
            {lists.map((value: any, index: number)=>{
              return (
                <li
                  className='list-select__element'
                  key={index}
                  onClick={(e: any)=>{
                    if(props.mode=='add'){
                      addToList(value.listId, props.product.productId)
                    }else{
                      moveListItem(props.product.productId, props.currentListId, value.listId);
                      props.refetchData();
                    }
                      props.setIsEnabled(false);
                  }}
                >
                  <span>
                    {value.listName}
                  </span>
                  <span>
                    {value.listItems.length} {value.listItems.length==1?'item':'items'}
                  </span>
                </li>
              )
            })
            }
          </ul>
        </div>
      </div>
      :
      !isLoaded && props.isEnabled?
        <Loading />
      :
      <>
      </>
    }
  </>
  );
}

export default ListSelect;
