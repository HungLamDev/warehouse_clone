import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { useEffect, useRef } from "react";

const InputField = ({ label, value, handle, keydown, type, disable, customClass, selected, focus, onFocus }: { label?: string, value?: any, handle?: any, keydown?: any, type?: string, disable?: boolean, customClass?: string, selected?: boolean, focus?: boolean, onFocus?: any }) => {


    const textFieldRef: any = useRef(null);
    useEffect(() => {
        if (focus) {
            textFieldRef.current.focus();
        }
    })
    return (
        <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={'space-between'}
            marginRight={2}
            gap={'5px'}
            className={`input-field-container ${customClass}`}>
            <Typography className="textsize">{label}</Typography>
            <TextField
                inputRef={textFieldRef}
                autoFocus={focus}
                select={selected}
                disabled={disable}
                autoComplete="off"
                type={type ? type : "text"}
                InputProps={{
                    inputProps: {
                        step: null,
                    },
                    className: "dark-bg-primary",
                    value: value,
                    onChange: handle,
                    onKeyDown: typeof keydown === "function" ? keydown : undefined,
                    sx: {
                        borderRadius: "50px",
                        color: "white",
                        height: "2rem",

                        "& fieldset": { borderColor: "white" },

                        // '& .MuiInputBase-input': {

                        '@media screen and (max-width: 1200px)': {
                            height: "1.8rem",
                        },

                        '@media screen and (max-width: 900px)': {
                            height: "1.5rem",
                        },
                        // },
                    },
                }}
            ></TextField>
        </Stack>

    )
}

export default InputField;
