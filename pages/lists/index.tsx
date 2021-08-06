import { useEffect, useState } from 'react';
import Link from 'next/link';
import ListSelect from '../../components/ListSelect';
import Navbar from '../../components/Navbar';
import SubNav from '../../components/SubNav';
import Loading from '../../components/Loading';
import CreateList from '../../components/CreateList';
import ListItem from '../../components/ListItem';
import localInstance from '../../services/api/localInstance';
import sortIdSync from '../../utils/sortIdSync';
import { getLists } from '../../utils/listOps';
import makeList from '../../utils/makeList';
import toggleDimmer from '../../utils/toggleDimmer';

interface Props{
  listId: string;
}

const Lists = (props: Props)=>{
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isCreatingList, setIsCreatingList] = useState<boolean>(false);
  const [rerender, setRerender] = useState<boolean>(false);
  const [lists, setLists] = useState<any>(null);
  const [currentListIndex, setCurrentListIndex] = useState<any>(0);
  const [currentListData, setCurrentListData] = useState<any>(null);
  const [listSelectIsEnabled, setListSelectIsEnabled] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const fetchData = () =>{
    setIsLoaded(false);
    setLists(undefined);
    (async() =>{
      const list: any = getLists();
      const listArray: any[] = list? Object.values(list) : [];
      let localCurrentListIndex = currentListIndex;
      if(list && props.listId){
        const listIndex = Object.values(list).indexOf(list[props.listId]);
        localCurrentListIndex = listIndex;
      }
      // fetching list data
      if(list){
        let listItemIds: any[] = [];
        if(listArray[localCurrentListIndex]?.listItems){
          listItemIds=listArray[localCurrentListIndex].listItems.map((value: any)=>value.productId);
        }
        try{
          const listRes: any = await localInstance.get('/products/getMany',{
            params: {
              productIds: JSON.stringify(listItemIds)
            }
          });
          const sortedData: any = sortIdSync(listRes.data, listItemIds);
          const finalList = makeList(listArray[localCurrentListIndex], sortedData);
          // setting states
          setCurrentListIndex(localCurrentListIndex);
          setLists(listArray);
          setCurrentListData(finalList);
        }catch(err: any){
          console.log(err)
        }
      }
      setIsLoaded(true);
    })();
  }

  useEffect(()=>{
    toggleDimmer(isCreatingList);
    if(isCreatingList==false){
      setRerender(!rerender);
    }
  }, [isCreatingList])

  useEffect(()=>{
    fetchData();
  }, [rerender, props.listId])

  return (
    <div className='lists'>
      {lists&&isLoaded&&
        <ListSelect
          isEnabled={listSelectIsEnabled}
          setIsEnabled={setListSelectIsEnabled}
          product={selectedItem}
          mode={'move'}
          currentListId={currentListData.listId}
          refetchData={fetchData}
        />
      }
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
                  href={`/lists/${value.listId}`}
                  key={index}
                >
                    <li className='lists__list-element'>
                    <a>
                      <span className='list-element__list-name'>{value.listName}</span>
                    </a>
                      <span className='list-element__total-items'>{value.listItems.length} {value.listItems.length==1?'item':'items'}</span>
                    </li>
                </Link>
              )
            })
            }
          </ul>
          <div className='list__contents'>
            {currentListData.listItems.length!=0?
              currentListData.listItems.map((value: any, index: number)=>{
                  return(
                    <ListItem
                      itemData={value}
                      currentListId={currentListData.listId}
                      setListSelectIsEnabled={setListSelectIsEnabled}
                      setSelectedItem={setSelectedItem}
                      fetchData={fetchData}
                      key={index}
                    />
                  )
                })
                :
                  <span style={{margin: 'auto'}}>No items in "{currentListData.listName}"</span>
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

export default Lists;
