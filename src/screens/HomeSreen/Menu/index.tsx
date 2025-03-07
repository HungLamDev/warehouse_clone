import "./style.scss";
import Button from '@mui/material/Button';
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import importIcon from "../../../assets/import.png"
import exportIcon from "../../../assets/export.png"
import Analytics from "../../../assets/Analytics.png"
import inventoryIcon from "../../../assets/inventory.png"
import deliveryIcon from "../../../assets/delivery.png"
import reportIcon from "../../../assets/report.png"
import focIcon from "../../../assets/FOC.png";
import inkhacIcon from "../../../assets/inkhac.png"
import printerIcon from "../../../assets/printer.png";
import labelSplitIcon from "../../../assets/tachnhan.png";
import settingsIcon from "../../../assets/settings.png";
import resetPasswordIcon from "../../../assets/reset-password.png";
import languagesIcon from "../../../assets/languages.png"
import SampleIcon from "../../../assets/sample.png"
import { useSelector } from 'react-redux';
import chemistryIcon from "../../../assets/chemistry.png"
import tonIcon from "../../../assets/inton.png"
import SoleIcon from "../../../assets/sole.png"
import decorateIcon from "../../../assets/decorate.png"
import { ILanguageItem } from '../../LoginScreen/chooseLanguage/interface';
import englishIcon from "../../../assets/english.png"
import burmeseIcon from "../../../assets/burmese.png"
import vietnameseIcon from "../../../assets/vietnamese.png"
import chineseIcon from "../../../assets/chinese.png"
import workerIcon from "../../../assets/worker.png"
import addUserIcon from "../../../assets/add-group.png"
import deleteStampIcon from "../../../assets/deleteStamp.png"
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PermissionPrintIcon from "../../../assets/permission-print.png"
import LogoutIcon from '@mui/icons-material/Logout';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import ChangePassword from '../../ModalScreen/ChangePassword/index';
import ModalChoose from "../../../components/ModalChoose";
import inblaIcon from "../../../assets/inbla.png"
import qrcanIcon from "../../../assets/qrcan.png"
import lsinIcon from "../../../assets/lsin.png"
import intonIcon from "../../../assets/inton.png";
const Menu = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dataUser = useSelector((state: any) => state.UserLogin.user);

    // Component IconWrapper để hiển thị các icon
    const IconWrapper = (props: any) => {
        return (
            <Button sx={{
                width: "fit-content",
                height: "fit-content",
                p: 1.5,
                borderRadius: "20%",
                cursor: "pointer",
                color: "white",
                background: "rgb(157, 178, 191, 0.8)",
                ':disabled': {
                    background: 'gray',
                    opacity: 0.5
                },
            }}{...props}>
            </Button>
        )
    }

    // Component GridItem để bố trí các phần tử trong grid
    const GridItem = (props: any) => {
        return (
            <Grid {...props} item xs={2} textAlign={"center"} color={"white"} display={"flex"} direction={'column'} alignItems={'center'} gap={'10px'}></Grid>
        );
    };

    // Danh sách các chức năng trong menu
    const menuList: { title: string; icon: string; path: string, modal: boolean, modalName: string, disabled?: boolean }[] = [
        {
          title: t("btnStock_In") as string,
          icon: importIcon,
          path: "/stock-in",
          modal: false,
          modalName: '',
        },
        {
          title: t("btnStock_Out") as string,
          icon: exportIcon,
          path: "/stock-out",
          modal: false,
          modalName: '',
        },
        {
          title: t("lblSystem_Warehouse") as string,
          icon: Analytics,
          path: "/warehouse",
          modal: false,
          modalName: '',
        },
        {
          title: t("btnInventory") as string,
          icon: inventoryIcon,
          path: "/inventory",
          modal: false,
          modalName: '',
        },
        {
          title: (dataUser[0].WareHouse === 'Sample' && dataUser[0].factoryName === 'LYV') ? t("btnDeliverySample") : t("btnDelivery"),
          icon: deliveryIcon,
          path: (dataUser[0].WareHouse === 'Sample' && dataUser[0].factoryName !== 'LYV') ? "/delivery-sample" : (dataUser[0].WareHouse === 'Sample' && dataUser[0].factoryName === 'LYV') ? "/delivery-sample-lyv" : "/delivery",
          modal: false,
          modalName: '',
        },
        {
          title: t("btnAccounting_Card") as string,
          icon: reportIcon,
          path: dataUser[0].WareHouse === 'Fitting' ? "/accountingcard-sole" : "/accounting-card",
          modal: dataUser[0].UserRole === 'Administrator' || dataUser[0].UserRole === 'Manager' || dataUser[0].UserRole === 'Account' ? true : false,
          modalName: 'listAccounting_Card',
        },
        {
          title: t("btnPrint_Other") as string,
          icon: inkhacIcon,
          path: "",
          modal: true,
          modalName: 'print_other',
          disabled: dataUser[0].UserRole === 'User ' ? true : false
        },
        {
          title: t("btnERP_Print") as string,
          icon: printerIcon,
          path: "/stamp-print",
          modal: false,
          modalName: '',
          disabled: dataUser[0].UserRole === 'User ' ? true : false
        },
        {
          title: t("lblSM_Print_Cut"),
          icon: labelSplitIcon,
          path: "/label-split",
          modal: false,
          modalName: '',
          disabled: dataUser[0].UserRole === 'User ' ? true : false
        },
        {
          title: t("lblSetting"),
          icon: settingsIcon,
          path: "",
          modal: true,
          modalName: 'settings',
          disabled: dataUser[0].UserRole === 'Administrator' ? false : true
        },
        {
          title: t("btnChangepassword"),
          icon: resetPasswordIcon,
          path: "",
          modal: true,
          modalName: 'change-password',
        },
        {
          title: t("tsmLanguage"),
          icon: languagesIcon,
          path: "",
          modal: true,
          modalName: 'languages',
        },
      ];

    // Danh sách thẻ kho
    const list: {
        title: string; icon: string; path: string; vWareHouse: string, hidden?: boolean
    }[] = [
        {
            title: t("btnAccounting_Chemistry") as string,
            icon: chemistryIcon,
            path: "/accounting-card",
            vWareHouse: "No"
        },
        {
            title: t("btnAccounting_Sample") as string,
            icon: SampleIcon,
            path: "/accounting-card",
            vWareHouse: "Sample"
        },
        {
            title: t("btnAccounting_Inventory") as string,
            icon: tonIcon,
            path: "/accounting-card",
            vWareHouse: "inventory"
        },
        {
            title: t("btnAccounting_Sole") as string,
            icon: SoleIcon,
            path: "/accounting-card",
            vWareHouse: "Fitting"
        },
        {
            title: t("btnAccounting_Decorate") as string,
            icon: decorateIcon,
            path: "/accounting-card",
            vWareHouse: "Decorate"
      
          },
          {
            title: t("btnAccounting_FOC") as string,
            icon: focIcon,
            path: "/accounting-card",
            vWareHouse: "FOC",
            hidden: dataUser[0].factoryName === "LHG" ? false : true
          },
          {
            title: t("btnAccounting_Card") as string,
            icon: reportIcon,
            path: "/accounting-card",
            vWareHouse: "No"
          },
    ]

    // Danh sách ngôn ngữ
    const myArray: ILanguageItem[] = [
        {
            language: t("btnEnglish"),
            icon: englishIcon,
            value: "EN"
        },
        {
            language: t("btnChina"),
            icon: chineseIcon,
            value: "EN"
        },
        {
            language: t("btnVietnames"),
            icon: vietnameseIcon,
            value: "EN"
        },
        {
            language: t("tsmMyanmar"),
            icon: burmeseIcon,
            value: "EN"
        }
    ]

    // Danh sách cài đặt
    const listSettings: { title: string; icon: string; path: string }[] = [
        {
            title: t("lblDelete_Order") as string,
            icon: deleteStampIcon,
            path: "/delete-order"
        },
        {
            title: t("btnData_Program_Proproty") as string,
            icon: workerIcon,
            path: "/priority-rack"
        },
        {
            title: t("lblUser") as string,
            icon: addUserIcon,
            path: "/user-form"
        },
        {
            title: t("lblDelete_Order") as string,
            icon: PermissionPrintIcon,
            path: "/permission-print"
        }
    ]

    // Danh sách in khác
    const listPrintOther: { title: string; icon: string; path: string, disabled?: boolean, hidden?: boolean }[] = [
        {
          title: t("btnPrint_Chemistry") as string,
          icon: chemistryIcon,
          path: "/chemistry-print",
        },
        {
          title: t("btnPrint_sample") as string,
          icon: inblaIcon,
          path: "/sample-print",
        },
        {
          title: t("btnPrint_Inventory") as string,
          icon: intonIcon,
          path: "/inventory-print",
          disabled: dataUser[0].UserRole === 'Administrator' || dataUser[0].UserRole === 'Manager' || dataUser[0].UserRole === 'InPartial' || dataUser[0].UserRole === 'Inventory' ? false : true
        },
        {
          title: t("btnPrintRack_QRcode") as string,
          icon: qrcanIcon,
          path: "/shelve-code",
        },
        {
          title: t("btnPrint_Decorate") as string,
          icon: decorateIcon,
          path: "/decorate-print",
        },
        {
          title: t("btnPrint_FOC") as string,
          icon: focIcon,
          path: "/foc-print",
          hidden: dataUser[0].factoryName === "LHG" ? false : true
        },
        {
          title: t("btnData_History_Print") as string,
          icon: lsinIcon,
          path: "/history-print",
        },
      ];

    const [open, setOpen] = useState(false);
    const [modalName, setModalName] = useState('');

    // Hàm điều hướng
    const handleNavigate = (path: string) => {
        navigate(path);
    }

    // Hàm mở modal
    const handleOpen = (name: string) => {
        setModalName(name);
        setOpen(true);
    }

    // Hàm đóng modal
    const handleClose = () => {
        setOpen(false);
        setModalName('')
    }

    // Hàm đăng xuất
    const handleLogout = () => {
        window.location.reload()
    }

    return (
        <Stack
            className={"menuContainer"}
            justifyContent={"center"}
            alignItems={"center"}
            margin={"0 auto"}>
            <div style={{
                display: "flex",
                justifyContent: "flex-end",
                flex: 1,
                width: "100%",
                paddingRight: "50px",
                paddingTop: "20px",
            }}>
                <Box sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    border: "1px solid",
                    padding: "5px",
                    borderRadius: "20px",
                }}>
                    <AccountCircleIcon fontSize="large" />
                    <Stack sx={{ marginLeft: "10px", marginRight: "20px" }} >
                        <Typography>
                            {dataUser[0].User_Name}
                        </Typography>
                        <Box display="flex" justifyContent={"space-between"}>
                            <Typography marginRight="20px" variant="subtitle2">{dataUser[0].UserId} </Typography>
                        </Box>
                    </Stack>
                    <LogoutIcon
                        sx={{
                            cursor: 'pointer'
                        }}
                        onClick={handleLogout} />
                </Box>
            </div>
            <Grid
                container
                width="80%"
                flex={8}
                display="flex"
                alignContent={"center"}
                marginTop={'50px'}
                gap={'70px 0px'}
                sx={{
                    "@media screen and (max-height: 400px)": {
                        gap: '15px 0px'
                    },
                }}>
                {menuList.map(({ title, icon, path, modal, modalName, disabled }, index: number) => {
                    return (
                        <Grid key={index} item display={'flex'} flexDirection={'column'} textAlign={'center'} xs={2} alignItems={'center'} gap={'10px'} >
                            <IconWrapper
                                disabled={disabled ? disabled : false}
                                onClick={() => {
                                    if (modal) {
                                        handleOpen(modalName)
                                    } else {
                                        handleNavigate(path);
                                    }
                                }}
                            >
                                <img src={icon} alt={title} className="hover-effect" />
                            </IconWrapper>
                            <Typography
                                sx={{
                                    fontSize: '15px',
                                    color: 'white'
                                }}
                                className="textsize-960px" >{t(title)}</Typography>
                        </Grid>
                    );
                })}
            </Grid>
            {modalName === 'change-password' && <ChangePassword open={open} onClose={() => setOpen(false)} />}
            {modalName === 'listAccounting_Card' && <ModalChoose open={open} onClose={() => setOpen(false)} array={list} />}
        </Stack>
    )
}

export default Menu