import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    carts:{},
    isCartLoading:false,
}

const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        setCart(state,action){
            const { cart } = action.payload
            state.carts = {...cart}
        },
        setIsCartLoading(state,action){
            const {isLoading} = action.payload
            state.isCartLoading = isLoading
        }
    }
})

export const { setCart,setIsCartLoading } = cartSlice.actions

export default cartSlice.reducer