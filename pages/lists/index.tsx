import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../../components/Navbar';
import SubNav from '../../components/SubNav';
import Loading from '../../components/Loading';
import CreateList from '../../components/CreateList';
import ListItem from '../../components/ListItem';
import localInstance from '../../services/api/localInstance';
import sortIdSync from '../../utils/sortIdSync';
import { getLists } from '../../utils/listOps';
import makeList from '../../utils/makeList';
import { BiDotsHorizontal } from 'react-icons/bi';

export default function Lists(){
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [lists, setLists] = useState<any>(null);
  const [isCreatingList, setIsCreatingList] = useState<boolean>(false);
  const [rerender, setRerender] = useState<boolean>(false);

  useEffect(()=>{
    if(isCreatingList){
      document.getElementById('dimmer').style.backgroundColor='hsla(0, 0%, 0%, 35%)';
    }else{
      document.getElementById('dimmer').style.backgroundColor=null;
      setRerender(!rerender);
    }
  }, [isCreatingList])

  useEffect(()=>{
    setIsLoaded(false);
    setLists(undefined);
    (async() =>{
      const list: any = getLists();
      if(list){
        //const formattedList: any = Object.values(list).map((value: any)=>{return value.listItems[0]? value : {...value, listItems: [{productId: 'missingno'}]}});
        //try{
          //const listRes: any = await localInstance.get('/products/getMany',{
            //params: {
              //productIds: JSON.stringify(formattedList.map((value: any)=>value.listItems[0].productId))
            //}
          //});
          //const sortedData = sortIdSync(listRes.data, formattedList.map((value: any)=>value.listItems[0].productId));
          //const finalList = makeList(list, sortedData);
          //setLists(finalList);
          setLists(Object.values(list))
        //}catch(err: any){
          //console.log(err)
        //}
      }
      setIsLoaded(true);
    })();
  }, [rerender])

  return (
    <div className='lists'>
      <Navbar />
      <SubNav />
      {lists&&isLoaded&&
        <div className='list__component'>
          <ul className='lists__list'>
            <button
              className='lists__create-new-list'
              onClick={()=>setIsCreatingList(true)}
            >
              Create new list +
            </button>
            {lists.map((value: any, index: number)=>{
              return (
                <Link
                  href={`lists/${value.listId}`}
                >
                  <li className='lists__list-element'>
                      <a>
                        {value.listName}
                      </a>
                    <span className='list-element__total-items'>{8} items</span>
                  </li>
                </Link>
              )
            })
            }
          </ul>
          <div className='list__contents'>
            {[...Array(8)].map((value: any)=>{
              return(
                <ListItem
                  itemData={{}}
                />
              )
            })
            }
          </div>
        </div>
      }
      {!lists&&isLoaded&&
        <div className='lists__empty-container'>
          <span className='lists__empty-text'>You have no lists.</span>
          <input
            className='lists__empty-create-button'
            type='button'
            value="Create a list"
            onClick={()=>setIsCreatingList(true)}
          />
        </div>
      }
      {isCreatingList&&isLoaded&&
        <CreateList
            isCreatingList={isCreatingList}
            setIsCreatingList={setIsCreatingList}
        />
      }
      {!isLoaded&&
        <Loading />
      }
    </div>
  );
}

                  //<div className='list-element__image-container'>
                    //<span className='list-element__item-number'>+{23487248} more</span>
                    //<Image
                      //src={value.listItems[0].images[0]}
                      //height={50}
                      //width={50}
                      //className='list-element__image'
                    ///>
                  //</div>
