import useMediaQuery from '@mui/material/useMediaQuery';
import React, { useState } from 'react'
import { useTranslation } from "react-i18next"
import { useSelector } from 'react-redux'
import { connect_string } from '../../LoginScreen/ChooseFactory';
import axios from 'axios';
import { config } from '../../../utils/api';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { BiArrowBack } from 'react-icons/bi';
import Typography from '@mui/material/Typography';
import useIcon from "../../../assets/user.png"
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ModalCofirm from "../../../components/ModalConfirm"
import MyButton from '../../../components/MyButton';
import md5 from 'md5';
const ChangePassword = ({ open, onClose }: { open?: any, onClose?: any }) => {
    const { t } = useTranslation()
    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: '40%',
        "@media screen and (max-width: 1200px)": {
            width: "40%"
        },
        bgcolor: "#1c2538",
        border: "2px solid white",
        borderRadius: 3,
        boxShadow: 24,
    }

    const dataUser = useSelector((state: any) => state.UserLogin.user)

    const isScreenLarge = useMediaQuery("(min-width: 1200px)");
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmNewPassword, setConfirmNewPassword] = useState("")
    const [openconfirm, setOpenConfirm] = useState(false)
    const [txtStatus, setTxtStatus] = useState("")
    const [showPassword, setShowPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false)


    const handleCurrentPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentPassword(event.target.value);
    }
    const handleNewPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewPassword(event.target.value);
    }
    const handleCofirmNeWPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmNewPassword(event.target.value);
    }
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    }
    const handleOk = () => {
        setCurrentPassword('')
        setNewPassword('')
        setConfirmNewPassword('')
        setOpenConfirm(false)
    }
    const handleclickShowPassword = (name: string) => {
        setShowPassword(name)
        if (name === showPassword) {
            setShowPassword('')
        }
    }
    const handleSave = () => {
        const url = connect_string + "api/updateuserpassword"
        const data = {
            txtCurrenPass: currentPassword,
            User_Password: newPassword,
            txtConfirmPass: confirmNewPassword,
            User_ID: dataUser[0].UserId,
            User_Name: dataUser[0].User_Name,
            get_version: dataUser[0].WareHouse

        }
        axios.post(url, data, config).then(response => {

            if (response.data === false) {
                setTxtStatus(t("msgNoChangePassword") as string)
                setOpenConfirm(true)
            } else {
                setTxtStatus(t("msgChangePassword") as string)
                setOpenConfirm(true)
            }
        }) .catch(error => {
            console.error("Lỗi API:", error);
            setTxtStatus("Có lỗi xảy ra, vui lòng thử lại.");
            setOpenConfirm(true);
        });

    }
    return (
        <Modal open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            slotProps={{
                backdrop: {
                    style: {
                        backdropFilter: "blur(3px)",
                    }
                }
            }}>
            <Box sx={style}>
                <Stack height={'100%'} paddingBottom={'20px'} >
                    <Stack height={'15%'} direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                        <IconButton className={'back-button'} onClick={onClose}>
                            <BiArrowBack className="icon-wrapper" />
                        </IconButton>
                        <Typography variant="h4" component="h4" color={'white'}>{t("btnChangepassword") as string}</Typography>
                        <Typography></Typography>
                    </Stack>
                </Stack>
                <Stack height={'75%'} alignItems={'center'} justifyContent={isScreenLarge ? 'center' : 'start'}>
                    <Stack height={'80%'} width={'100%'} alignItems={'center'}>
                        <Stack marginBottom={'20px'} width={'100%'} height={'30%'} alignItems={'center'} justifyContent={'center'}>
                            <img src={useIcon} alt="enter" width={"70px"} />
                            <Box marginTop={'20px'}>
                                <Typography variant="h5" component="h5" color={'white'}>{dataUser[0].UserId}</Typography>
                                <Typography variant="h5" component="h5" color={'white'}>{dataUser[0].User_Name}</Typography>
                            </Box>
                        </Stack>
                        <Stack height={'100%'} width={'100%'} justifyContent={'center'} alignItems={'center'}>
                            <Grid width={'50%'}>
                                <Grid item xs={12}>
                                    <Typography className='textsize' marginBottom={'20px'} textAlign={'left'}>{t("lblPassword_Old")}</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id="outlined-select-currency"
                                        value={currentPassword}
                                        onChange={handleCurrentPassword}
                                        autoComplete="off"
                                        type={showPassword === "pwd-old" ? "text" : "password"}
                                        sx={{ width: "100%" }}
                                        InputProps={{
                                            inputProps: {
                                                step: null,
                                            },
                                            className: "dark-bg-primary textsize",
                                            sx: {
                                                borderRadius: "50px",
                                                color: "white",
                                                height: "2rem",
                                                "& fieldset": {
                                                    borderColor: "white"
                                                },
                                                marginBottom: "20px"
                                            },
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={() => handleclickShowPassword("pwd-old")}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end">
                                                        {showPassword === "pwd-old" ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                                    </IconButton>
                                                </InputAdornment>
                                            )

                                        }}>

                                    </TextField>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography className='textsize' marginBottom={'20px'} textAlign={'left'}>{t("lblPassword_New")}</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id="outlined-select-currency"
                                        value={newPassword}
                                        onChange={handleNewPassword}
                                        autoComplete="off"
                                        type={showPassword === "pwd-new" ? "text" : "password"}
                                        sx={{ width: "100%" }}
                                        InputProps={{
                                            inputProps: {
                                                step: null,
                                            },
                                            className: "dark-bg-primary textsize",
                                            sx: {
                                                borderRadius: "50px",
                                                color: "white",
                                                height: "2rem",
                                                "& fieldset": {
                                                    borderColor: "white"
                                                },
                                                marginBottom: "20px"
                                            },
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={() => handleclickShowPassword("pwd-new")}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end">
                                                        {showPassword === "pwd-new" ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                                    </IconButton>
                                                </InputAdornment>
                                            )

                                        }}>

                                    </TextField>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography className='textsize' marginBottom={'20px'} textAlign={'left'}>{t("lblCofirm_Password")}</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id="outlined-select-currency"
                                        value={confirmNewPassword}
                                        onChange={handleCofirmNeWPassword}
                                        autoComplete="off"
                                        type={showPassword === "confirm-pwd" ? "text" : "password"}
                                        sx={{ width: "100%" }}
                                        InputProps={{
                                            inputProps: {
                                                step: null,
                                            },
                                            className: "dark-bg-primary textsize",
                                            sx: {
                                                borderRadius: "50px",
                                                color: "white",
                                                height: "2rem",
                                                "& fieldset": {
                                                    borderColor: "white"
                                                },
                                                marginBottom: "20px"
                                            },
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={() => handleclickShowPassword("confirm-pwd")}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end">
                                                        {showPassword === "confirm-pwd" ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                                    </IconButton>
                                                </InputAdornment>
                                            )

                                        }}>

                                    </TextField>
                                </Grid>
                                <Grid xs={12} display={'flex'} justifyContent={'center'} >
                                        <MyButton name={t('btnSave') as string} onClick={handleSave} />
                                    </Grid>
                            </Grid>


                        </Stack>

                    </Stack>

                </Stack>
                {openconfirm && <ModalCofirm open={openconfirm} onClose={() => setOpenConfirm(false)} title={txtStatus} onPressOK={handleOk} />}

            </Box>

        </Modal>
    )
}

export default ChangePassword
