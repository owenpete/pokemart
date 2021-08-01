import { nanoid }from 'nanoid';
import getDefaultListIndex from '../utils/getDefaultListIndex'
const listStorageName = 'lists';

export const initDefaultList = () =>{
  const lists: any = getLists();
  const hasLists = lists!=null;
  let listObject: any = undefined;
  if(hasLists){
    const listArray: any = Object.values(lists);
    // check for list marked with the 'default' tag
    const defaultListIndex: number = getDefaultListIndex(listArray);
    const hasDefaultList = defaultListIndex!=-1;
    if(!hasDefaultList){
      const newListId: string = nanoid();
      listObject = {
        ...lists,
        [newListId]: {
          listName: 'Wish List',
          listId: newListId,
          listItems: [],
          default: true
        }
      }
    }
  }else{
    const newListId = nanoid();
    listObject = {
      [newListId]: {
        listName: "Wish List",
        listId: newListId,
        listItems: [],
        default: true
      }
    }
  }
  const defaultListCreated = listObject!=undefined;
  if(defaultListCreated){
    window.localStorage.setItem(listStorageName, JSON.stringify(listObject))
  }
}

export const getLists = () =>{
  try{
    const lists = window.localStorage.getItem(listStorageName);
    return JSON.parse(lists);
  }catch(err: any){
    console.log('err', err);
  }
}

export const getListById = (listId: string) =>{

}

export const createList = (listName: string) =>{
  const newListId: string = nanoid();
  const lists: any = getLists();
  let listObject: any;
  listObject = {
    ...lists,
    [newListId]: {
      listName: listName,
      listId: newListId,
      listItems: []
    }
  }
  window.localStorage.setItem(listStorageName, JSON.stringify(listObject))
}

export const addToList = (listId: string, productId: string) =>{
  const lists: any = getLists();
  const hasLists: boolean = lists!=null;
  let defaultListIndex: number = -1;
  let listObject: any = undefined;
  if(!hasLists){
    // initialize a new default list
    initDefaultList();
  }
  const listArray: any = Object.values(lists);
  if(listId=='default'){
    const defaultListIndex: number = getDefaultListIndex(listArray);
    const hasProduct: boolean = listArray[defaultListIndex].listItems.find((value: any)=>value.productId==productId)!=undefined;
    if(!hasProduct){
      listObject = {
        ...lists,
        [listArray[defaultListIndex].listId]: {
          ...listArray[defaultListIndex],
          listItems: [...listArray[defaultListIndex].listItems, {productId: productId}]
        }
      }
    }
  }else{
    const hasProduct: boolean = lists[listId].listItems.find((value: any)=>value.productId==productId)!=undefined;
    if(!hasProduct){
      listObject = {
        ...lists,
        [listId]: {
          ...lists[listId],
          listItems: [...lists[listId].listItems, {productId: productId}]
        }
      }
    }
  }
  if(listObject){
    window.localStorage.setItem(listStorageName, JSON.stringify(listObject))
  }
}
