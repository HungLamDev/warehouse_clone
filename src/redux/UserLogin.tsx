import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserLogin {

    user: any [];
}
const initialState: UserLogin = {
    user: []
}
const UserLogin = createSlice({
    name: 'UserLogin',
    initialState: initialState,
    reducers: { 
        addUser: (state, action: PayloadAction<any[]>) => {
            state.user = action.payload;
        },
        clearUser: (state) => {
            state.user = [];
        }   
}
    
})

export const { addUser, clearUser } = UserLogin.actions;
export default UserLogin.reducer