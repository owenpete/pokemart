import { nanoid }from 'nanoid';
const listStorageName = 'lists';

export const initList = () =>{
  const lists: any = getLists();
  const hasLists = lists!=null;
  let listObject: any = undefined;
  if(!hasLists){
    const newListId = nanoid();
    listObject = {
      [newListId]: {
        listName: "Wish List",
        listId: newListId,
        listItems: [],
        default: true
      }
    }
  }else{
    const listArray: any = Object.values(lists);
    let defaultListIndex: number = -1;
    // check for list marked with the 'default' tag
    for(let i = 0; i < listArray.length; i++){
      if(listArray[i]?.default == true){
        defaultListIndex=i;
      }
    }
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

export const addToList = (listId: string, product: any) =>{
  const lists: any = getLists();
  const listArray: any = Object.values(lists);
  let defaultListIndex: number;
  for(let i = 0; i < listArray.length; i++){
    if(listArray[i]?.default == true){
      defaultListIndex=i;
    }
  }
}
