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
    const [confirNewPassword, setConfirmNewPassword] = useState("")
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
    const handleMouseDownPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
    }
    const handleOK = () => {
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
        const url = connect_string + "api/updateusertpassword"
        const data = {

        }
        axios.post(url, data, config).then(response => {

            if (response.data === false) {
                setTxtStatus(t("msgNoChangePassword") as string)
                setOpenConfirm(true)
            } else {
                setTxtStatus(t("msgChangePassword") as string)
                setOpenConfirm(true)
            }



        })

    }
    return (
        <Modal open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal
            
            -description"
            slotProps={{
                backdrop: {
                    style: {
                        backdropFilter: "blur(3px)",
                    }
                }
            }}>
                <Box
                
                sx={style}>

                </Box>

        </Modal>
    )
}

export default ChangePassword
