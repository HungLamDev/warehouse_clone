import Button from '@mui/material/Button';
import colors from '@mui/material/colors';
import React from 'react'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import importIcon from "../../../assets/import.png"
import exportIcon from "../../../assets/export.png"
import Analytics from "../../../assets/Analytics.png"
import inventoryIcon from "../../../assets/inventory.png"
import deliveryIcon from "../../../assets/delivery.png"
import reportIcon from "../../../assets/reportIcon.png"
import inkhacIcon from "../../../assets/inkhac.png"
import printerIcon from "../../../assets/printer.png";
import labelSplitIcon from "../../../assets/labelSplit.png";
import settingsIcon from "../../../assets/settings.png";
import resetPasswordIcon from "../../../assets/resetPassword.png";
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
import addUserIcon from "../../../assets/addUser.png"
import deleteStampIcon from "../../../assets/deleteStamp.png"
import PermissionPrintIcon from "../../../assets/permission-print.png"





const Menu = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dataUser = useSelector((state: any) => state.UserLogin.user);
    const IconWrapper = (props: any) => {
        return (
            <Button sx={
                {
                    width: "fir-content",
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
                }
            }{...props}>

            </Button>
        )

    }

    //danh sach chuc nang
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
            path: "/sockt-out",
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

        }, {
            title: t("btnAccounting_Card") as string,
            icon: reportIcon,
            path: "",
            modal: false,
            modalName: '',
        },
        {
            title: t("btnPrint_Other") as string,
            icon: inkhacIcon,
            path: "",
            modal: false,
            modalName: '',

        },{
            title: t("btnERP_Print") as string,
            icon: printerIcon,
            path: "",
            modal: false,
            modalName: '',

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
            modalName: '',
            disabled: dataUser[0].UserRole === 'Administrator' ? false : true

        },
        {
            title: t("btnChangepasssword"),
            icon: resetPasswordIcon,
            path: "",
            modal: true,
            modalName: 'change-password',

        }, {
            title: t("tsmLanguage"),
            icon: languagesIcon,
            path: "",
            modal: true,
            modalName: 'languages',

        },
    ]
    //danh sach the kho
    const list: {
        title: string; icon: string; path: string; vWareHouse:string, hidden?: boolean 
    }[] = [
        {
            title: t("btnAccounting_chemistry") as string,
            icon: chemistryIcon,
            path: "/accounting-card",
            vWareHouse: "No"
        },
        {
            title: t("btnAccounting_sample") as string,
            icon: SampleIcon,
            path: "/accounting-card",
            vWareHouse: "Sample"
        },
        {
            title: t("btnAccounting_inventory") as string,
            icon: tonIcon,
            path: "/accounting-card",
            vWareHouse: "inventory"
        },
        {
            title: t("btnAccounting_Sole") as string,
            icon: SoleIcon,
            path: "/accounting-card",
            vWareHouse: "Fitting"
        }, {
            title: t("btnAccounting_sample") as string,
            icon: decorateIcon,
            path: "/accounting-card",
            vWareHouse: "Decorate"
        }
    ]
    //danh sach ngon ngu
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
        }, {
            language: t("btnVietnames"),
            icon: vietnameseIcon,
            value: "EN"
        }, {
            language: t("tsmMyanmar"),
            icon: burmeseIcon,
            value: "EN"
        }
    ]
    // danh sach settings
    const listSettings: {title: string; icon: string; path:string}[] =[
        {
            title: t("lblDelete_Order") as string,
            icon: deleteStampIcon,
            path:"/delete-order"
        },
        {
            title: t("btnData_Program_Proproty") as string,
            icon: workerIcon,
            path:"/priority-rack"
        },
        {
            title: t("lblUser") as string,
            icon: addUserIcon,
            path:"/user-form"
        },
        {
            title: t("lblDelete_Order") as string,
            icon: PermissionPrintIcon,
            path:"/permission-print"
        }
    ]
      // Danh sách in khác
  const listPrintOther: { title: string; icon: string; path: string, disabled?: boolean, hidden?: boolean }[] = [
    {
      title: t("btnPrint_Chemistry") as string,
      icon: chemistryIcon,
      path: "/chemistry-print",
    },]
}

export default Menu
