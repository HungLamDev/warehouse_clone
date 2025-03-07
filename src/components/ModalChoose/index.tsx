import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import importIcon from "../../../assets/import.png";
import exportIcon from "../../../assets/export.png";
import printerIcon from "../../../assets/printer.png";
import inventoryIcon from "../../../assets/inventory.png";
import reportIcon from "../../../assets/report.png";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Load from "../../../src/assets/load.gif";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getAppLang, setAppLang, setWareHouse, setWareHouseAcount } from "../../utils/localStorage";
import { LanguageName } from "../../screens/LoginScreen/chooseLanguage/type";
import { useState } from "react";
import "./style.scss";
import { connect_string } from "../../screens/LoginScreen/ChooseFactory";
import { addFOC } from "../../redux/FOC";

type ModalChooseProps = {
    array?: any;
    open: boolean;
    onClose: () => void;
    setShowState?: (value: boolean) => void;
};

const style = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: "10px",
    width: "85%",
    bgcolor: "#1c2538",
    border: "2px solid white",
    borderRadius: 3,
    boxShadow: 24,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
};

const IconWrapper = (props: any) => (
    <Button
        sx={{
            width: "fit-content",
            height: "fit-content",
            p: 1.5,
            borderRadius: "20%",
            cursor: "pointer",
            color: "white",
            marginTop: "10px",
            background: "#9DB2BF",
            ":disabled": {
                background: "gray",
                opacity: 0.5,
            },
        }}
        {...props}
    />
);

const ModalChoose: React.FC<ModalChooseProps> = ({ array = [], open, onClose, setShowState }) => {
    const dataUser = useSelector((state: any) => state.UserLogin.user);
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const [selectedValue, setSelectedValue] = useState<LanguageName>(getAppLang() || "VN");

    const handleClickItem = (lng: LanguageName) => {
        i18n.changeLanguage(lng);
        setSelectedValue(lng);
        setAppLang(lng);
    };

    const handleClickWareHouse = (wareHouse: string) => {
        if (wareHouse !== "FOC") {
            setWareHouseAcount(wareHouse);
            setWareHouse(wareHouse);
            dispatch(addFOC(false));
        } else {
            dispatch(addFOC(true));
        }
    };

    const handleNavigate = (path: string, title: string) => {
        onClose();
        if (setShowState) setShowState(false);
        setTimeout(() => navigate(path), 1400);
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            slotProps={{ backdrop: { style: { backdropFilter: "blur(1px)" } } }}
        >
            <Box sx={style}>
                <div style={{ display: "flex", alignContent: "center", justifyContent: "center", width: "100%" }}>
                    {array.map(({ title, icon, path, language, value, vWareHouse, disabled, hidden }: any, index: number) => (
                        <div key={index} style={{ display: hidden ? "none" : "flex", width: "100%" }} className="item-choose">
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                padding: "10px",
                                textAlign: "center",
                                color: "white",
                                height: "100%",
                                alignItems: "center",
                                gap: "5px",
                                flex: 1,
                            }}>
                                <IconWrapper
                                    onClick={() => {
                                        if (path) {
                                            vWareHouse ? [handleNavigate(path, title), handleClickWareHouse(vWareHouse)] : handleNavigate(path, title);
                                        } else {
                                            handleClickItem(value);
                                        }
                                    }}
                                    disabled={disabled || false}
                                >
                                    <img className="hover-effect" width="32px" src={icon} alt={title} />
                                </IconWrapper>
                                <Typography marginTop="5px" whiteSpace="normal" sx={{ fontSize: "15px" }} className="textsize-960px">
                                    {title ? t(title) : language}
                                </Typography>
                            </div>
                            {index !== array.length - 1 && <hr style={{ height: "100%" }} />}
                        </div>
                    ))}
                </div>
            </Box>
        </Modal>
    );
};

export default ModalChoose;