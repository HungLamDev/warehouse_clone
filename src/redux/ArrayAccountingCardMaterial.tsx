import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface ArrayAccoutingCardState {
    items: any[]
}
const initialState: ArrayAccoutingCardState = {
    items: []
}
const ArrayAccoutingCardState = createSlice({
    name: 'ArrayAccoutingCardState',
    initialState,
    reducers: {
        copyArrayAccountingCardMaterial(state, action: PayloadAction<any[]>) {
            state.items = action.payload;
        },
        clearAccountingCardMaterial(state) {
    }
}
})
export const { copyArrayAccountingCardMaterial , clearAccountingCardMaterial } = ArrayAccoutingCardState.actions
export default ArrayAccoutingCardState.reducer