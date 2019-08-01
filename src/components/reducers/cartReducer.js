import { ADD_TO_CART,REMOVE_ITEM,SUB_QUANTITY,ADD_QUANTITY,ADD_SHIPPING,ADD_ITEMS,SEARCH_ITEMS,SORT_ITEMS } from '../actions/action-types/cart-actions'
import data from '../books.json'

const initState = {
    items:data,
    addedItems:[],
    total: 0,
    direction:1

}
const cartReducer= (state = initState,action)=>{
    // add books using fetch when component will mount
    if (action.type === ADD_ITEMS){
          return {
             ...state,
            items:action.items
          }
     } 
    
     // sort items by ratings

     if (action.type === SORT_ITEMS){
         let dir  = -1*state.direction
         //console.log(state.items.slice(0,10));
         let sortedItems = Sort(JSON.parse(JSON.stringify(state.items)),dir);
         //console.log(sortedItems===state.items);
         //console.log(dir)
         return {
            ...state,
            items: sortedItems,
            direction:dir
         }
     }

     // search Book 
     if(action.type === SEARCH_ITEMS){
         let new_items = serach(state,action.pattern);
         console.log(new_items)
         return{
             ...state,
             items:new_items
         }
     }

    //add books into cart
    if(action.type === ADD_TO_CART){
          let addedItem = state.items.find(item=> item.bookID === action.id)
          //check if the action id exists in the addedItems
         let existed_item= state.addedItems.find(item=> action.id === item.bookID)
         if(existed_item)
         {
            addedItem.quantity += 1 
             return{
                ...state,
                 total: state.total + addedItem.price 
                  }
        }
         else{
            addedItem.quantity = 1;
            //calculating the total
            let newTotal = state.total + addedItem.price 
            
            return{
                ...state,
                addedItems: [...state.addedItems, addedItem],
                total : newTotal
            }
            
        }
    }
    if(action.type === REMOVE_ITEM){
        let itemToRemove= state.addedItems.find(item=> action.id === item.bookID)
        let new_items = state.addedItems.filter(item=> action.id !== item.bookID)
        
        //calculating the total
        let newTotal = state.total - (itemToRemove.price * itemToRemove.quantity )
        console.log(itemToRemove)
        return{
            ...state,
            addedItems: new_items,
            total: newTotal
        }
    }
    //INSIDE CART COMPONENT
    if(action.type=== ADD_QUANTITY){
        let addedItem = state.items.find(item=> item.bookID === action.id)
          addedItem.quantity += 1 
          let newTotal = state.total + addedItem.price
          return{
              ...state,
              total: newTotal
          }
    }
    if(action.type=== SUB_QUANTITY){  
        let addedItem = state.items.find(item=> item.bookID === action.id) 
        //if the quantity == 0 then it should be removed
        if(addedItem.quantity === 1){
            let new_items = state.addedItems.filter(item=>item.bookID !== action.id)
            let newTotal = state.total - addedItem.price
            return{
                ...state,
                addedItems: new_items,
                total: newTotal
            }
        }
        else {
            addedItem.quantity -= 1
            let newTotal = state.total - addedItem.price
            return{
                ...state,
                total: newTotal
            }
        }
        
    }

    if(action.type=== ADD_SHIPPING){
          return{
              ...state,
              total: state.total
          }
    }

    if(action.type==='SUB_SHIPPING'){
        return{
            ...state,
            total: state.total
        }
  }

    
  else{
    return state
    }
    
}

function Sort(items,dir){
   return items.sort(sortby('average_rating',dir));
   
}

function sortby(property,dir){
    return function(a,b){
                  return (a[property]-b[property])*dir;
    }
}


function serach(state,keywords){
          keywords = keywords.toLowerCase();
          let result = data.filter((item)=>{
                  return item.title.toLowerCase().indexOf(keywords)>-1;
          })
         console.log(keywords);
         return result;
        
}

export default cartReducer
