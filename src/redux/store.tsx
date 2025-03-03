import {configureStore} from  "@reduxjs/toolkit"
import UserLogin from "./UserLogin";
const store = configureStore({
    reducer: {
        UserLogin
    },
});

export default store;