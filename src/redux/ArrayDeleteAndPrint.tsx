import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import moment from 'moment';
interface ArrayDeleteAndPrintState {
    items: any[]
}
const intialState: ArrayDeleteAndPrintState = {
    items: []
};
const ArrayDeleteAndPrint = createSlice({
    name: 'ArrayDeleteAndPrint',
    initialState: intialState,
    reducers: {
        coppyValuesArrayDeleteAndPrint: (state, action: PayloadAction<any>) => {
            state.items = action.payload
        },
        removeItemByBarcodeArrayDeleteAndPrint: (state, action: PayloadAction<any>) => {
            const barcodeToRemove = action.payload;
            state.items = state.items.filter((item: any) => item.barcode !== barcodeToRemove);
        },
        clearArrayDeleteAndPrint: (state) => {
            state.items = []
        },changeItemsByBarcodeArrayDeleteAndPrint: (state, action: PayloadAction<any>) => {
            const { barcode, modifyDate } = action.payload;
            barcode.forEach((item: any) => {
                
                const itemIndex = state.items.findIndex((i: any) => i.barcode === item.barcode);
                if (itemIndex !== -1) {
                    state.items[itemIndex].ngay  = moment(modifyDate).format("DD/MM/YYYY");
                }
            })
        }
    }
    })

    export const { coppyValuesArrayDeleteAndPrint ,removeItemByBarcodeArrayDeleteAndPrint , clearArrayDeleteAndPrint ,changeItemsByBarcodeArrayDeleteAndPrint } = ArrayDeleteAndPrint.actions
    export default ArrayDeleteAndPrint.reducer