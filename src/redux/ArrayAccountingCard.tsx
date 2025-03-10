import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ArrayAccoutingCardState{
    items: any;
}
const initialState: ArrayAccoutingCardState = {
    items: {}
}
const ArrayAccoutingCardState = createSlice({
    name: 'ArrayAccoutingCardState',
    initialState,
    reducers: {
        copyArrayAccountingCard(state, action: PayloadAction<any>) {
            state.items = action.payload;
    }}

})

export const { copyArrayAccountingCard } = ArrayAccoutingCardState.actions
export default ArrayAccoutingCardState.reducer