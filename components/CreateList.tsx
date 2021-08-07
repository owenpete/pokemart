import { useEffect, useState, useRef } from 'react';
import toggleDimmer from '../utils/toggleDimmer';
import { createList } from '../utils/listOps';
import { FiX } from 'react-icons/fi';

interface Props{
  isCreatingList: boolean;
  setIsCreatingList: any;
}

const CreateList = (props: Props) =>{
  const [listName, setListName] = useState<string>('');
  const inputRef = useRef<any>();

  const submitList = (listName: string) =>{
    if(listName!=''){
      createList(listName); props.setIsCreatingList(false)
    }
  }

  useEffect(()=>{
    toggleDimmer(props.isCreatingList);
    inputRef.current.focus();
  });

  return(
    <div className='create-list'>
      <div className='create-list__exit'>
        <FiX onClick={()=>props.setIsCreatingList(false)}/>
      </div>
      <div className='create-list__form'>
        <span>List name:</span>
        <input
          className='create-list__name-input'
          ref={inputRef}
          type='text'
          onKeyDown={(e: any)=>{e.code=='Enter' && submitList(listName)}}
          onChange={(e: any)=>{setListName(e.target.value)}}
        />
        <input
          className='create-list__create-button'
          type='button'
          value='Create list'
          onClick={(e: any)=>{submitList(listName)}}
        />
      </div>
    </div>
  )
}

export default CreateList;
