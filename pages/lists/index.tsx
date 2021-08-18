import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import ListSelect from '../../components/ListSelect';
import Navbar from '../../components/Navbar';
import SubNav from '../../components/SubNav';
import Loading from '../../components/Loading';
import CreateList from '../../components/CreateList';
import ListItem from '../../components/ListItem';
import VerifyDelete from '../../components/lists/VerifyDelete';
import { FiTrash } from 'react-icons/fi';
import localInstance from '../../services/api/localInstance';
import sortIdSync from '../../utils/sortIdSync';
import { getLists, clearList, removeList } from '../../utils/listOps';
import formatItemText from '../../utils/formatItemText';
import makeList from '../../utils/makeList';

interface Props{
  listId: string;
}

const Lists = (props: Props)=>{
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isCreatingList, setIsCreatingList] = useState<boolean>(false);
  const [lists, setLists] = useState<any>(null);
  const [currentListIndex, setCurrentListIndex] = useState<any>(0);
  const [currentListData, setCurrentListData] = useState<any>(null);
  const [listSelectIsEnabled, setListSelectIsEnabled] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const [verifyDeleteIsEnabled, setVerifyDeleteIsEnabled] = useState<boolean>(false);
  const [listToRemove, setListToRemove] = useState<any>(undefined);

  const fetchData = () =>{
    setIsLoaded(false);
    setLists(undefined);
    (async() =>{
      const list: any = getLists();
      const listArray: any[] = list? Object.values(list) : [];
      // if list path doesn't exist, re-route to /lists
      if(!list[router.query?.slug?.toString()] && router.asPath!='/lists'){
        router.push('/lists')
        return;
      }
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
          const sortedData: any = sortIdSync('productId', listRes.data, listItemIds);
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
    fetchData();
  }, [props.listId])

  return (
    <div className='lists'>
      {lists&&isLoaded&&
        <>
          <ListSelect
            isEnabled={listSelectIsEnabled}
            setIsEnabled={setListSelectIsEnabled}
            product={selectedItem}
            mode={'move'}
            currentListId={currentListData.listId}
            refetchData={fetchData}
          />
          <VerifyDelete
            listToRemove={listToRemove}
            isEnabled={verifyDeleteIsEnabled}
            setIsEnabled={setVerifyDeleteIsEnabled}
            refetchData={fetchData}
          />
        </>
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
                    <li className='lists__list-element'>
                      <Link
                        href={`/lists/${value.listId}`}
                        key={index}
                      >
                        <a className='list-element__info'>
                          <span className='list-element__list-name'>{value.listName}</span>
                          <span className='list-element__total-items'>{value.listItems.length} {formatItemText(value.listItems.length)}</span>
                        </a>
                      </Link>
                      {!value.default&&
                        <div
                          className='list-element__remove-list-container'
                          onClick={()=>{
                            // if list has items in it show user a prompt, otherwise delete without showing prompt
                            if(value.listItems.length>0){
                              setListToRemove(value);
                              setVerifyDeleteIsEnabled(true);
                            }else{
                              removeList(value.listId);
                              fetchData();
                            }
                          }}
                        >
                          <FiTrash className='list-element__remove-list-icon'/>
                        </div>
                      }
                    </li>
              )
            })
            }
          </ul>
          <div className='list__contents'>
          <div className='list__header-container'>
            <h1 className='list__header'>
              {currentListData.listName} ({currentListData.listItems.length})
            </h1>
            <div className='list__header-action-container'>
              <input
                className='list__header-create-order list__header-action'
                type='button'
                value='Create Order'
                onClick={()=>{
                  router.push(`/checkout/list/${currentListData.listId}`)
                }}
              />
              <input
                className='list__header-clear-list list__header-action'
                type='button'
                value='Clear List'
                onClick={()=>{
                  clearList(currentListData.listId);
                  fetchData();
                }}
              />
            </div>
          </div>
            {currentListData.listItems.length!=0?
              currentListData.listItems.map((value: any, index: number)=>{
                  return(
                    <ListItem
                      itemData={value}
                      currentListId={currentListData.listId}
                      listSelectIsEnabled={listSelectIsEnabled}
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
          refetchData={fetchData}
        />
      }
      {!isLoaded&&
        <Loading />
      }
    </div>
  );
}

export default Lists;
