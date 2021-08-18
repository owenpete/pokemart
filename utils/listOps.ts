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
  const lists = getLists();
  return lists[listId];
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

export const removeList = (listId: string) =>{
  const lists: any = getLists();
  delete lists[listId];
  window.localStorage.setItem(listStorageName, JSON.stringify(lists));
}

export const clearList = (listId: string) =>{
  let lists: any = getLists();
  lists = {
    ...lists,
    [listId]: {
      ...lists[listId],
      listItems: []
    }
  }
  window.localStorage.setItem(listStorageName, JSON.stringify(lists));
}
export const addToList = (listId: string, productId: string) =>{
  const lists: any = getLists();
  const hasLists: boolean = lists!=null;
  let listObject: any = undefined;
  if(!hasLists){
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
          listItems: [...listArray[defaultListIndex].listItems, {productId: productId, qty: 1}]
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
          listItems: [...lists[listId].listItems, {productId: productId, qty: 1}]
        }
      }
    }
  }
  if(listObject){
    window.localStorage.setItem(listStorageName, JSON.stringify(listObject))
  }
}

export const removeListItem = (listId: string, itemId: string, willTriggerUpdate: boolean = true) =>{
  const lists = getLists();
  const newListObject = {
    ...lists,
    [listId]: {
      ...lists[listId],
      listItems: lists[listId].listItems.filter((value: any)=>{
        return value.productId!=itemId;
      })
    }
  }
  window.localStorage.setItem(listStorageName, JSON.stringify(newListObject));
  if(willTriggerUpdate){
    window.dispatchEvent( new Event('storage', {cancelable: true}) );
  }
}

export const moveListItem = (itemId: string, currentListId: string, newListId: string) =>{
  removeListItem(currentListId, itemId, false);
  addToList(newListId, itemId);
  window.dispatchEvent( new Event('storage', {cancelable: true}) );
}
