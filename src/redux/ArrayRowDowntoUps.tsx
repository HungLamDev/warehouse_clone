import { createSlice } from "@reduxjs/toolkit";
import { clearArrayRowDowns } from "./ArrayRowDowns";

interface ArrayRowDowntoUpsState {
    items: any[];
}

const initialState: ArrayRowDowntoUpsState = {
    items: [],
}
const ArrayRowDowntoUp = createSlice({
    name: 'ArrayRowDowntoUp',
    initialState,
    reducers: {
        addItemArrayRowDowntoUp: (state, action) => {
            state.items.push(action.payload);
        },
        copyValuesArrayRowDowntoUp: (state, action) => {
            state.items = [...action.payload];
        },
        clearArrayRowDowntoUp: (state)=> {
            state.items = [];
        }
    },
})  
export const  { addItemArrayRowDowntoUp , copyValuesArrayRowDowntoUp , clearArrayRowDowntoUp} = ArrayRowDowntoUp.actions
export default ArrayRowDowntoUp.reducer
