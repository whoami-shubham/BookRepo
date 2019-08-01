
import { ADD_TO_CART,REMOVE_ITEM,SUB_QUANTITY,ADD_QUANTITY,ADD_SHIPPING ,ADD_ITEMS,SORT_ITEMS,SEARCH_ITEMS} from './action-types/cart-actions'

//add new items in Books list
export const addToBooks= (items)=>{
    return{
        type: ADD_ITEMS,
        items
    }
}

// sort by parameter
export const sortBooks= ()=>{
    return{
        type: SORT_ITEMS
    }
}
// search by string
export const searchBooks= (pattern)=>{
    return{
        type: SEARCH_ITEMS,
        pattern
    }
}

//add cart action
export const addToCart= (id)=>{
    return{
        type: ADD_TO_CART,
        id
    }
}
//remove item action
export const removeItem=(id)=>{
    return{
        type: REMOVE_ITEM,
        id
    }
}
//subtract qt action
export const subtractQuantity=(id)=>{
    return{
        type: SUB_QUANTITY,
        id
    }
}
//add qt action
export const addQuantity=(id)=>{
    return{
        type: ADD_QUANTITY,
        id
    }
}
