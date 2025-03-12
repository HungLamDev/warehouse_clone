
import { useEffect, useState } from "react";
import HorizontalStack from "../HorizontallStack"
import moment from "moment";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { MobileDatePicker, MobileDatePickerSlotsComponentsProps } from "@mui/x-date-pickers/MobileDatePicker";
import {currentDay} from "../../utils/date"
import Typography from '@mui/material/Typography';
const DatePickerField = ({ label, valueDate, onValueChange, readonly, customClass }: { label?: string, valueDate?: any, onValueChange?: string, readonly?: boolean, customClass?: string }) => {

    const [selectedDate, setSelectedDate] = useState(moment());
    useEffect(() => {
        setSelectedDate(moment(onValueChange))

    }, [onValueChange])

    return (
        <HorizontalStack      
            direction={"row"}
            justifyContent={"space-between"}
            className={`input-field-container ${customClass}`}>
            <Typography className="textsize">{label}</Typography>
            <LocalizationProvider
                dateAdapter={AdapterMoment}
                dateFormats={{
                    monthAndYear: "MM/YYYY",
                }}
            >
                <MobileDatePicker
                    disabled={readonly}
                    format={"DD/MM/YYYY"}
                    value={selectedDate}
                    onChange={(value: any) => {
                        setSelectedDate(value)
                        valueDate(moment(value).format('MM/DD/YYYY'));
                    }}
                    defaultValue={currentDay}
                    reduceAnimations={true}
                    slotProps={{
                        textField: {
                            inputProps: {
                                className: "dark-bg-primary",
                                sx: {
                                    borderRadius: "50px",
                                    color: "white",
                                    border: "1px solid white",
                                    height: "2rem",
                                    p: 0,
                                    textAlign: "center",
                                    '@media screen and (max-width: 1200px)': {
                                        fontSize: '14px !important',
                                    },
                                    '@media screen and (max-width: 900px)': {
                                        height: "1.5rem",
                                    },
                                },
                            },
                            sx: {
                                "& fieldset": { border: "none!important" },

                            },
                        },
                        toolbar: {
                            hidden: true,
                        },
                        shortcuts: {
                            hidden: true,
                        },

                    }}
                />
            </LocalizationProvider>
        </HorizontalStack>
    )
}
export default DatePickerField