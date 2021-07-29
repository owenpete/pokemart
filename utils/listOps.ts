import { nanoid }from 'nanoid';
const listStorageName = 'lists';

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

export const addToList = (listId: string, product: any) =>{

}
