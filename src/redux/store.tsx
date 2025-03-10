import { configureStore } from "@reduxjs/toolkit"
import ArrayRowDowns from "./ArrayRowDowns";
import ArrayRowUps from "./ArrayRowUp";
import ArrayRowDowntoUp from './ArrayRowDowntoUps';
import ArrayDeleteAndPrint from './ArrayDeleteAndPrint'
import MaterialTable from './array'
import FOC from './FOC'
import ArrayChemistry from './ArrayChemistry';
import UserLogin from "./UserLogin";
import ArrayAccountingCardMaterial from './ArrayAccountingCardMaterial';
import MaterialTableChecked from './MaterialTableChecked';
const store = configureStore({
    reducer: {
        UserLogin,
        ArrayRowUps,
        ArrayRowDowns,
        ArrayRowDowntoUp,
        ArrayDeleteAndPrint,
        MaterialTable,
        FOC,
        ArrayChemistry,
        ArrayAccountingCardMaterial,
        MaterialTableChecked,

    },
});

export default store;