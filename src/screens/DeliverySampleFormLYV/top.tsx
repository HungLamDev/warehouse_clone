import React, { useRef, useState } from "react";
import FullScreenContainerWithNavBar from "../../components/FullScreenContainerWithNavBar";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { Backdrop, Box, CircularProgress, Grid, Stack } from "@mui/material";
import Sidebar, { SidebarRef } from "./SideBar/Sidebar";
import { BiBox } from "react-icons/bi";
import QRScannerV1 from "../../components/QRScanner/indexV1";
import { GridColDef } from "@mui/x-data-grid";
import MyTableNew from "../../components/MyTableNew";
import Decimal from "decimal.js";
import './sidebar.scss';
import MyButton from "../../components/MyButton";
import ModalStockOutSample from "../../components/ModalStockOutSample/ModalStockOutSample";
import Statistics from "../../components/StatisticsForm";
import SampleSearchERP from "../../components/SampleSearchERP";
import PdfViewer from "../../components/PDFView";
import pdfFile from '../../assets/PDF/HD.pdf';
import ModalCofirm from "../../components/ModalConfirm";
import { useSelector } from "react-redux";
import { connect_string } from "../LoginScreen/ChooseFactory";
import axios from "axios";
import ModalReturnMaterialSample from "./ModalReturnMaterialSample";

const DeliverySampleLYVScreen = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const stockout = location.state && location.state.data;
    const dataUser = useSelector((state: any) => state.UserLogin.user);
    const sidebarRef = useRef<SidebarRef>(null);

    // State Declarations
    const [open, setOpen] = useState(false);
    const [modalName, setModalName] = useState('');
    const [valuetotal, setValueTotal] = useState('');
    const [cofirmType, setCofirmType] = useState('');
    const [openCofirm, setOpenCofirm] = useState(false);
    const [qrcode, setQRCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [title, setTitle] = useState<any>('');
    const [rows, setRows] = useState([]);
    const [stockoutDetailValue, setStockOutDetailValue] = useState(stockout && stockout[0].Value_Qty);
    const [stockoutTemp, setStockOutTemp] = useState(stockout && stockout[0].Value_Qty);
    const [PO_NOAndTestNo, setPO_NOAndTestNo] = useState<any>("");
    const [listMaterialBOM, setListMaterialBOM] = useState([]);
    const [listMaterialStockout, setListMaterialStockout] = useState<any[]>([]);
    const [listMaterialStockoutOutSource, setListMaterialStockoutOutSource] = useState<any[]>([]);
    const [article, setArticle] = useState("");
    const [kfjd, setKFJD] = useState("");
    const [JiJie, setJiJie] = useState("");
    const [mergeNo, setMerNo] = useState("");
    const [testNo, setTestNo] = useState("");
    const [qtyOutSample, setQtyOutSample] = useState<any>({});
    const [isOpenSidebar, setIsOpenSibar] = useState(true);
    const [isLoadingCreateSlip, setIsLoadingCreateSlip] = useState(false);
    const [isScannerOpen, setIsScannerOpen] = useState(false);
    const [focusedInputId, setFocusedInputId] = useState<string | null>(null);
    const [JGNO, setJGNO] = useState<any>(null);
    const [JGNO_Check, setJGNO_Check] = useState<any>(null);
    const [onFocus, setOnFocus] = useState(false);
    const [listCheckStockoutOutSource, setListCheckStockoutOutSource] = useState<any[]>([]);
    const [itemRow, setItemRow] = useState<any>("");
    const [dataMaterialSampleReturn, setDataMaterialSampleReturn] = useState<any[]>([]);
    const [checkVersionChange, setCheckVersionChange] = useState<any>(false);
    const [listCheckPrintInfo, setListCheckPrintInfo] = useState<any[]>([]);
    const [disable, setDisable] = useState(false);

    // Column Definitions (unchanged)
    const columns: any[] = [/* ... */];
    const columnsOutSource: any[] = [/* ... */];
    const columnsBOM: GridColDef[] = [/* ... */];
    const columnsBOMOutSource: GridColDef[] = [/* ... */];
    const columnsMaterialReturn: GridColDef[] = [/* ... */];

    // Modal and Confirmation Handlers
    const handleOpen = (name: string) => {
        setModalName(name);
        setOpen(true);
    };

    const handleClose = () => {
        setModalName('');
        setOpen(false);
    };

    const handleOpenConfirm = (confirmName: string) => {
        setCofirmType(confirmName);
        setOpenCofirm(true);
    };

    const handleCloseConfirm = () => {
        setCofirmType('');
        setOpenCofirm(false);
    };

    // QR Scanner Handlers
    const handleFocus = (id: string) => {
        setFocusedInputId(id);
    };

    const handleScan = (data: any | null) => {
        if (data && focusedInputId) {
            setTimeout(() => {
                const inputElement = document.getElementById(focusedInputId) as HTMLInputElement;
                if (inputElement && focusedInputId === "scan-po") {
                    // Handle QR scan logic here if needed
                }
            });
        }
    };

    // Table Formatting Functions
    const paintingRow = (item: any, row: any) => {
        if (row?.checkMaterial === true) {
            return "#E52020";
        }
        if (row.Material_No !== null && row.QTY_Bom !== "" && ((new Decimal(row.QTY_Bom).minus(new Decimal(row.QTY_Sample))).toNumber() !== 0)) {
            return "orange";
        }
        return "white";
    };

    const highlightText = (item: any, row: any) => {
        if (typeof item !== "string") return item;
        const barcodes = row?.Barcode?.split("\r\n");
        const regex = new RegExp(`(${barcodes?.join("|")})`, "gi");
        const parts = item.split(regex);
        return (
            <>
                {parts.map((part: any, index: any) => (
                    <React.Fragment key={index}>
                        {part.includes("*") ? (
                            <span style={{ color: "lightgreen" }}>{part.replace(/\*/g, "")}</span>
                        ) : part}
                    </React.Fragment>
                ))}
            </>
        );
    };

    // Stockout and Material Handling
    const handleImport_Material_Stock_Out_Sample = async (
        Material_No: string, Barcode: string, QTY_Sample: string, User_ID: string,
        PO_NO: string, TestNo: string, YPZLBH: string, Article: string,
        QTY_BOM: any, KFJD: any, Size: any
    ) => {
        const url = connect_string + "api/insert_Key_Material_Stock_Out_Sample";
        const data = { Material_No, Barcode, QTY_Sample, User_ID, PONO: PO_NO, TestNo, YPZLBH, Article, QTY_Bom: QTY_BOM, Size, KFJD };
        try {
            await axios.post(url, data);
        } catch (error) {
            console.error("Error inserting material stock out sample:", error);
        }
    };

    const handleStockoutOutsource = async () => {
        setIsLoadingCreateSlip(true);
        handleCloseConfirm();
        const arrFilter = listCheckStockoutOutSource.filter((item: any) => item.stayus !== "done");
        try {
            if (arrFilter.length > 0) {
                for (const newItem of arrFilter) {
                    await handleImport_Material_Stock_Out_Sample(
                        newItem.MatNo,
                        newItem?.CLZMLB === "Y" && newItem?.MJBH === "ZZZZZZZZZZ" ? "Outsource" : "Normal",
                        newItem?.CLSLMin,
                        dataUser[0].UserId,
                        PO_NOAndTestNo?.PONO,
                        PO_NOAndTestNo?.TestNo,
                        mergeNo,
                        article,
                        newItem?.CLSLMin,
                        kfjd,
                        newItem.SIZE
                    );
                }
                handleRefresh(); // Gọi ngay sau khi xử lý xong
            }
        } catch (error) {
            console.error("Error during stock out:", error);
        } finally {
            setIsLoadingCreateSlip(false);
        }
    };

    const handleRefresh = () => {
        if (sidebarRef.current) {
            sidebarRef.current.refreshData();
            sidebarRef.current.refreshMaterial_Stock_Out_Sample();
        }
    };

    // Material Return Handlers
    const handleReturnMaterialSample = async (data: any) => {
        const url = connect_string + "api/return_Material_Out";
        const dataReturn = data.map((item: any) => ({ ...item, User_ID: dataUser[0].UserId }));
        const response = await axios.post(url, dataReturn);
        return response.data;
    };

    const handleDoubleClick = async (params: any, item: any) => {
        setItemRow(item);
        const barcodeList = item?.Barcode?.split("\r\n");
        const keyList = item?.Key?.split("\r\n");
        const sizeList = item?.Size?.split("\r\n");
        const LLNOList = item?.LLNO.split("\r\n") || [];
        const YPZLBHList = item?.YPZLBH?.split("\r\n");

        const result = barcodeList.map((barcode: any, index: any) => ({
            Barcode: barcode.split("➪")[0].trim(),
            Barcode_Show: barcode,
            Key: keyList[index],
            Material_No: item.Material_No,
            XXCC: sizeList[index],
            LLNO: LLNOList[index] || "",
            Article: article,
            SCBH: YPZLBHList[index],
            User_ID: dataUser[0].UserId,
            _id: index,
            stt: index + 1
        }));

        const url = connect_string + "api/check_list_LLNO_CFMID_KCLL";
        const data = result.map((item: any) => ({ LLNO: item.LLNO }));
        try {
            setIsLoadingCreateSlip(true);
            const response = await axios.post(url, data);
            const updatedDataList = result.map((item: any) => ({
                ...item,
                status: response.data.find((x: any) => x.LLNO === item.LLNO)?.status
            }));
            setDataMaterialSampleReturn(updatedDataList);
            setIsLoadingCreateSlip(false);
            handleOpenConfirm("return-material-sample");
        } catch (error) {
            console.error("Error checking LLNO:", error);
        }
    };

    const handlePressOKReturnMaterialSample = async (data: any) => {
        handleCloseConfirm();
        const result = await handleReturnMaterialSample(data);
        if (result === true) {
            handleRefresh(); // Gọi refresh sau khi trả vật tư thành công
        } else {
            handleOpenConfirm("return-material-fail");
        }
    };

    const handleReturnMaterial = async () => {
        handleCloseConfirm();
        const result = await handleReturnMaterialSample(dataMaterialSampleReturn);
        if (result === true) {
            handleRefresh(); // Gọi refresh sau khi trả vật tư thành công
        } else {
            handleOpenConfirm("return-material-fail");
        }
    };

    // Miscellaneous Handlers
    const handleGet_qty_out_Sample = (value: any, materialNo: any) => {
        setQtyOutSample("")
                const url = connect_string + "api/get_qty_out_Sample"
                const data = {
                    PONO: value?.PONO,
                    TestNo: value?.TestNo,
                    barcode: "",
                    Material_No: materialNo
                }
                axios.post(url, data).then(res => {
                    const data = {
                        Material_No: materialNo,
                        QTY: res.data
                    }
                    setQtyOutSample(data)
                    console.log("res",)
                }
        
                )
    };

    const handlePrintInfo = () => {
        // Logic for printing info if needed
    };

    // Render
    return (
        <div></div>
    );
};

export default DeliverySampleLYVScreen;