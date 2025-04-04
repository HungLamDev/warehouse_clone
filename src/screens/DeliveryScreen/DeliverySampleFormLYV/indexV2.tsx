
import React, { useRef, useState } from "react";
import FullScreenContainerWithNavBar from "../../../components/FullScreenContainerWithNavBar";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { Backdrop, Box, CircularProgress, Grid, Stack } from "@mui/material";
import Sidebar, { SidebarRef } from "./SideBar/Sidebar";
import { BiBox } from "react-icons/bi";
import QRScannerV1 from "../../../components/QRScanner/indexV1";
import { GridColDef } from "@mui/x-data-grid";
import MyTableNew from "../../../components/MyTableNew";
import Decimal from "decimal.js";
import './sidebar.scss'
import MyButton from "../../../components/MyButton";
import ModalStockOutSample from "../../../components/ModalStockOutSample/ModalStockOutSample";
import Statistics from "../../../components/StatisticsForm";
import SampleSearchERP from "../../../components/SampleSearchERP"
import PdfViewer from "../../../components/PDFView"
import pdfFile from '../../../assets/PDF/HD.pdf'
import ModalCofirm from "../../../components/ModalConfirm";
import { useSelector } from "react-redux";
import { checkPermissionPrint, connect_string } from "../../LoginScreen/ChooseFactory";
import axios from "axios";
import ModalReturnMaterialSample from "./ModalReturnMaterialSample";
import ConfirmDelivery from "../../../components/ConfirmDelivery";
import { isEmptyOrNull } from "../../../utils/api_global";
const DeliverySampleLYVScreen = () => {
	const { t } = useTranslation();
	const location = useLocation();
	const stockout = location.state && location.state.data;
	const [open, setOpen] = useState(false)
	const [modalName, setModalName] = useState('')
	const [valuetotal, setValueTotal] = useState('')
	const [cofirmType, setCofirmType] = useState('')
	const [openCofirm, setOpenCofirm] = useState(false)
	const [qrcode, setQRCode] = useState('')
	const [isLoading, setIsLoading] = useState(false);
	const [title, setTitle] = useState<any>('')
	const [rows, setRows] = useState([])
	const [stockoutDetailValue, setStockOutDetailValue] = useState(stockout && stockout[0].Value_Qty)
	const [stockoutTemp, setStockOutTemp] = useState(stockout && stockout[0].Value_Qty)
	const [PO_NOAndTestNo, setPO_NOAndTestNo] = useState<any>("")
	const [listMaterialBOM, setListMaterialBOM] = useState([])
	const [listMaterialStockout, setListMaterialStockout] = useState<any[]>([])
	const [listMaterialStockoutOutSource, setListMaterialStockoutOutSource] = useState<any[]>([])
	const [article, setArticle] = useState("")
	const [kfjd, setKFJD] = useState("")
	const [JiJie, setJiJie] = useState("")
	const [mergeNo, setMerNo] = useState("")
	const [testNo, setTestNo] = useState("")
	const [qtyOutSample, setQtyOutSample] = useState<any>({})
	const [isOpenSidebar, setIsOpenSibar] = useState(true)
	const [isLoadingCreateSlip, setIsLoadingCreateSlip] = useState(false)
	const sidebarRef = useRef<SidebarRef>(null);
	const [isScannerOpen, setIsScannerOpen] = useState(false);
	const [focusedInputId, setFocusedInputId] = useState<string | null>(null);
	const [JGNO, setJGNO] = useState<any>(null)
	const [JGNO_Check, setJGNO_Check] = useState<any>(null)
	const [onFocus, setOnFocus] = useState(false)
	const [listCheckStockoutOutSource, setListCheckStockoutOutSource] = useState<any[]>([])
	const [itemRow, setItemRow] = useState<any>("")
	const [dataMaterialSampleReturn, setDataMaterialSampleReturn] = useState<any[]>([])
	const [checkVersionChange, setCheckVersionChange] = useState<any>(false)
	const [listCheckPrintInfo, setListCheckPrintInfo] = useState<any[]>([])
	const [disable, setDisable] = useState(false)
	const columns: any[] = [
		// {
		//   field: "TestNo",
		//   headerName: "Test No",
		//   align: "center",
		//   headerAlign: 'center',
		//   width: 150,

		// },
		{
			field: "PONO",
			headerName: "PONO",
			align: "center",
			headerAlign: 'center',
			width: 150,

		},
		{
			field: "Material_No",
			headerName: "Material No",
			align: "center",
			headerAlign: 'center',
			width: 150,
		},
		{
			field: "Barcode",
			headerName: "Barcode",
			align: "center",
			headerAlign: 'center',
			width: 150,
			hightlight: true

		},
		{
			field: "QTY_Bom",
			headerName: "QTY Bom",
			align: "center",
			headerAlign: 'center'
		},
		{
			field: "QTY_Sample",
			headerName: "QTY Sample",
			align: "center",
			headerAlign: 'center'
		},
		{
			field: "Size",
			headerName: "Size",
			align: "center",
			headerAlign: 'center',
			width: 150,

		},
		{
			field: "KFJD",
			headerName: "Stage",
			align: "center",
			headerAlign: 'center',
			width: 150,

		},
		{
			field: "YPZLBH",
			headerName: "Merge No",
			align: "center",
			headerAlign: 'center',
			width: 150,

		},
		{
			field: "LLNO",
			headerName: t("dcpOrder_No_Out"),
			align: "center",
			headerAlign: 'center',
			width: 150,

		},
		{
			field: "User_ID",
			headerName: "User ID",
			align: "center",
			headerAlign: 'center',
			width: 150,

		},
		{
			field: "Modify_Date",
			headerName: t("dcpModify_Date"),
			align: "center",
			headerAlign: 'center',
			width: 150,

		},

	];

	const columnsOutSource: any[] = [
		{
			field: "CLBH",
			headerName: "Material No",
			align: "center",
			headerAlign: 'center',
			width: 150,
		},
		{
			field: "JGNO",
			headerName: "JGNO",
			align: "center",
			headerAlign: 'center',
			width: 150,
		},
		{
			field: "Qty",
			headerName: "QTY",
			align: "center",
			headerAlign: 'center'
		},
		{
			field: "SCBH",
			headerName: "Article",
			align: "center",
			headerAlign: 'center'
		},
		{
			field: "LLNO",
			headerName: t("dcpOrder_No_Out"),
			align: "center",
			headerAlign: 'center',
			width: 150,

		},
		{
			field: "USERID",
			headerName: "User ID",
			align: "center",
			headerAlign: 'center',
			width: 150,

		},
		{
			field: "USERDATE",
			headerName: t("dcpModify_Date"),
			align: "center",
			headerAlign: 'center',
			width: 150,

		},
	];

	const columnsBOM: GridColDef[] = [

		{
			field: "MatNo",
			headerName: "Material No",
			align: "center",
			headerAlign: 'center',
			width: 180,

		},
		{
			field: "MatName",
			headerName: "Material Name",
			align: "center",
			headerAlign: 'center',
			width: 150,
		},
		// {
		//   field: "MJBH",
		//   headerName: "MJBH",
		//   align: "center",
		//   headerAlign: 'center',
		//   width: 150,

		// },
		{
			field: "USAGE",
			headerName: "USAGE",
			align: "center",
			headerAlign: 'center',
			width: 150,

		},
		{
			field: "Qty",
			headerName: "Qty",
			align: "center",
			headerAlign: 'center'
		},
		{
			field: "CLSLMin",
			headerName: "CLSLMin",
			align: "center",
			headerAlign: 'center',
		},
		{
			field: "Unit",
			headerName: "Unit",
			align: "center",
			headerAlign: 'center'

		},
		{
			field: "SIZE",
			headerName: "SIZE",
			align: "center",
			headerAlign: 'center'

		},
		{
			field: "SuppID",
			headerName: "Supplier	ID",
			align: "center",
			headerAlign: 'center',
			width: 150,

		},
		{
			field: "Supplier",
			headerName: "Supplier",
			align: "center",
			headerAlign: 'center',
			width: 150,

		},
		{
			field: "ARTICLE",
			headerName: "ARTICLE",
			align: "center",
			headerAlign: 'center',
			width: 150,

		},

	];

	const columnsBOMOutSource: GridColDef[] = [
		{
			field: "MatNo",
			headerName: "Material No",
			align: "center",
			headerAlign: 'center',
			width: 180,

		},
		{
			field: "MJBH",
			headerName: "MJBH",
			align: "center",
			headerAlign: 'center',
			width: 150,

		},
		{
			field: "Qty",
			headerName: "Qty",
			align: "center",
			headerAlign: 'center',
		},
		{
			field: "Unit",
			headerName: "Unit",
			align: "center",
			headerAlign: 'center'

		},
		{
			field: "SuppID",
			headerName: "Supplier	ID",
			align: "center",
			headerAlign: 'center',
			width: 150,

		},
		{
			field: "Supplier",
			headerName: "Supplier",
			align: "center",
			headerAlign: 'center',
			width: 150,

		},
		{
			field: "ARTICLE",
			headerName: "ARTICLE",
			align: "center",
			headerAlign: 'center',
			width: 150,
		},
		{
			field: "MatName",
			headerName: "Material Name",
			align: "center",
			headerAlign: 'center',
			width: 150,
		},
	];

	const columnsMaterialReturn: GridColDef[] = [
		{
			field: "stt",
			headerName: "ID",
			align: "center",
			headerAlign: 'center',
			width: 180,

		},
		{
			field: "Barcode_Show",
			headerName: "Barcode",
			align: "center",
			headerAlign: 'center',
			width: 150,

		},
		{
			field: "LLNO",
			headerName: "LLNO",
			align: "center",
			headerAlign: 'center',
			width: 150,

		},
	];
	const dataUser = useSelector((state: any) => state.UserLogin.user);


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
				if (sidebarRef.current) {
					handleRefresh()
					sidebarRef.current.refreshMaterial_Stock_Out_Sample()
				}// Gọi ngay sau khi xử lý xong
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
			sidebarRef.current?.refreshMaterial_Stock_Out_Sample()
			sidebarRef.current?.refreshData()

		} else {
			handleOpenConfirm("return-material-fail");
		}
	};

	const handleReturnMaterial = async () => {
		handleCloseConfirm()
		handleCloseConfirm()
		const result = await handleReturnMaterialSample(dataMaterialSampleReturn)
		if (result === true) {
			sidebarRef.current?.refreshMaterial_Stock_Out_Sample()
			sidebarRef.current?.refreshData()
		}
		else {
			handleOpenConfirm("return-material-fail")
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

	const handlePrintInfo = async () => {
		// Logic for printing info if needed
		if (await checkPermissionPrint("51400")) {
			if (listCheckPrintInfo.length > 0) {
				handleOpenConfirm("print")
			}
		}
		else {
			handleOpenConfirm('print-permission')
		}
	};
	const handlePrintInfoOK = async () => {
		console.log("handlePrintInfoOK")
		handleCloseConfirm()
		const filteredList = listMaterialBOM.filter((item1: any) =>
			listCheckPrintInfo.some((item2: any) => item1.MatNo === (JGNO === null ? item2.Material_No : item2.CLBH))
		);
		console.log(filteredList);
		const list_Prints = filteredList.map((item: any) => ({
			// standard: item?.Qty || "",
			standard: (JGNO === null ? item?.CLSLMin : item?.Qty) || "",
			Name_Material: item?.MatName || "",
			article: item?.ARTICLE || "",
			Stage: kfjd || "",
			Season: JiJie || "",
			Pono: item?.po || "",
			Supplier_Name: item?.Supplier || "",
			Material_No: item?.MatNo || ""
		}))

		const data = {
			list_Prints: list_Prints,
			// user mayin sẽ in tem thông tin kho mẫu
			UserID: "51400"
		}
		console.log("data", data )		
		const url = connect_string + "api/PrintLabel_Delivery_Sample_CLick_Standard"
		axios.post(url, data).then(res => {
			console.log(res)

			if (res.data == true) {
				handleOpenConfirm('print-success')
			}
			setDisable(false)
		}).catch(() => {
			handleOpenConfirm('print-permission')
			setDisable(false)
		})

	}
	const create_Material_Stock_Out_Sample_Outsource = async () => {
		console.log("create_Material_Stock_Out_Sample_Outsource")

	}
	const handleCreateSlip = (value: any) => {
		console.log("handleCreateSlip", value)
		if (
			!isEmptyOrNull(value?.CKBH || "") &&
			!isEmptyOrNull(mergeNo) &&
			!isEmptyOrNull(dataUser[0]?.UserId) &&
			!isEmptyOrNull(dataUser[0]?.factoryName)
		) {
			setIsLoadingCreateSlip(true)
			const url = connect_string + "api/creat_Stock_Out_No"
			const data = {
				Factory: dataUser[0]?.factoryName,
				Cb_WH: value?.CKBH || "",
				User_ID: dataUser[0]?.UserId,
				MergeNo: mergeNo
			}
			axios.post(url, data).then(res => {
				if (res.data === true) {
					sidebarRef.current?.refreshMaterial_Stock_Out_Sample()
					handleOpenConfirm("insert-slip-sucess")
				}
				else {
					handleOpenConfirm("insert-slip-error")
				}
			}).finally(() => {
				setIsLoadingCreateSlip(false)
			})
		}
		else {
			handleOpenConfirm("no-information")
		}
	}
	
		return (
		<FullScreenContainerWithNavBar
			hidden={true}
			sideBarDisable={true}
			sideBarNavigate="/history-delivery-sample-lyv"
			title={t("lblStock_Out") + " " + t("btnAccounting_Sample")}
			navigate="/"
		>
			<Stack style={{ height: '100%', borderTop: '1px solid rgba(255,255,255, 0.5)', overflow: 'hidden' }}>
				<Stack style={{ position: 'relative', height: '100%', }}>
					{/* phần Merge BOM*/}
					<Sidebar column={columnsBOM}
						columnOutSource={columnsBOMOutSource}
						PO_NOAndTestNo={(value: any) => { setPO_NOAndTestNo(value) }}
						listMaterialStockOut_Outsource={(value: any) => setListMaterialStockoutOutSource(value)}
						JGNO={(value: any) => setJGNO(value)}
						JGNO_Check={(value: any) => setJGNO_Check(value)}
						listMaterialBOM={(value: any) => { setListMaterialBOM(value) }}
						listMaterialStockOut={(value: any) => { console.log("Dữ liệu listMaterialStockOut:", value), setListMaterialStockout(value) }}
						Article={(value: any) => setArticle(value)}
						ref={sidebarRef}
						KFJD={(value: any) => setKFJD(value)}
						JiJie={(value: any) => setJiJie(value)}
						MergeNo={(value: any) => setMerNo(value)}
						TestNo={(value: any) => setTestNo(value)}
						isOpenSidebar={(value: any) => setIsOpenSibar(value)}
						get_qty_out_Sample={handleGet_qty_out_Sample}
						handleFocusInput={(id: any) => handleFocus(id)}
						listCheckMaterialStockout={(value: any) => setListCheckStockoutOutSource(value)}
						checkVersion={setCheckVersionChange} />
					<div className="main-content">
						<Box
							className={"dark-bg-secondary border-bottom-white"}
							style={{
								flexShrink: 0,
								minHeight:
									isOpenSidebar === true
										? "calc(80dvh/ 2.9)"
										: "calc(80dvh/ 5)",
								display: "flex",
								flexDirection: "column",
								justifyContent: "center",
							}}
						>
							<Stack direction={"row"} height={"100%"}>
								<Stack
									direction={"row"}
									height={"100%"}
									padding={0.5}
									width={"100%"}
									alignItems={"flex-end"}
								>
									<Stack
										padding={0.5}
										width={"100%"}
										height={"100%"}
										gap={0.5}
										justifyContent={"flex-end"}
										flexDirection={
											isOpenSidebar === true ? "column" : "row"
										}
									>
										<Grid container>
											<Grid item xs={12} display={"flex"} justifyContent={"flex-end"}
											> {checkVersionChange ? <span style={{ color: "#E52020", fontSize: "13px" }}>{t("msgVersionChange")}</span> : ""}
											</Grid>
											<Grid item xs={12} display={"flex"}>
												{/* Test No */}
												<Stack direction={'row'} justifyContent={'center'} width={'100%'} >
													<span className='textsize' style={{ color: 'yellow', width: '50%' }}>{mergeNo ? "Merge No: " + mergeNo : ""}</span>
													<span className='textsize' style={{ color: 'yellow', width: '50%' }}>{testNo ? "Version: " + testNo : ""}</span>
												</Stack>
											</Grid>
											<Grid item xs={12} display={"flex"}>
												{/* Merge No */}
												<Stack direction={'row'} justifyContent={'space-evenly'} width={'100%'} >
													<span className='textsize' style={{ color: 'yellow', width: '50%' }}>{JGNO === null && qtyOutSample?.Material_No ? "Material No: " + qtyOutSample?.Material_No : ""}</span>
													<span className='textsize' style={{ color: 'yellow', width: '50%' }}>{JGNO === null && qtyOutSample?.QTY ? "QTY: " + qtyOutSample?.QTY : ""}</span>
												</Stack>
											</Grid>
											<Grid item display={"flex"} alignItems={"center"} xs={1}
											> {isLoading && <CircularProgress size={'24px'} color='info' />}</Grid>
										</Grid>
										<Grid container direction={"row"} gap={"10px"} justifyContent={
											isOpenSidebar === true ? "center" : "flex-start"
										}>
											{/* Xuất chi tiết */}
											<Grid item display={'flex'} alignItems={'flex-end'} xs={2}>
												<MyButton height='2rem' name={t("dcpExport")} onClick={() => handleOpen('ImportAndExport')} disabled={disable} />
												{modalName === 'ImportAndExport' && <ModalStockOutSample open={open} handleClose={handleClose} />}
											</Grid>
											<Grid item display={'flex'} alignItems={'flex-end'} xs={2}>
												{/* Thống kê */}
												<MyButton height='2rem' name={t("btnStatistical")} onClick={() => handleOpen('Statistics')} disabled={disable} />
												{modalName === 'Statistics' && <Statistics open={open} onClose={handleClose} materialNo='' />}
											</Grid>
											<Grid item display={'flex'} alignItems={'flex-end'} xs={2}>
												{/* Tìm ERP */}
												<MyButton height='2rem' name={t("btnViewERP")} onClick={() => handleOpen('SearchERPSample')} disabled={disable} />
												{modalName === 'SearchERPSample' && <SampleSearchERP open={open} onClose={handleClose} />}
											</Grid>
											<Grid item display={'flex'} alignItems={'flex-end'} xs={2}>
												{/* Hướng dẫn */}
												<MyButton height='2rem' name={t("btnGuide")} onClick={() => handleOpen('Guide')} disabled={disable} />
												{modalName === 'Guide' && <PdfViewer onClose={handleClose} open={open} pdfFile={pdfFile} />}
											</Grid>
											<Grid item display={'flex'} alignItems={'flex-end'} xs={2}>
												{/* In tem thông tin */}
												<MyButton height='2rem' name={t("btnPrint")} onClick={handlePrintInfo} disabled={disable} />
											</Grid>
										</Grid>
									</Stack>
								</Stack>
							</Stack>
						</Box>
						<Stack sx={{ height: '100%', overflow: 'hidden' }}>
							{
								JGNO === null ?
									(
										<MyTableNew
											columns={columns}
											rows={listMaterialStockout}
											checkBox={true}
											paintingRow={paintingRow}
											highlightText={highlightText}
											onDoubleClick={handleDoubleClick}
											handleCheckBox={() => { return true }}
											listChx={(value: any) => setListCheckPrintInfo(value)}
										/>
									)
									:
									(
										<MyTableNew
											columns={columnsOutSource}
											rows={listMaterialStockoutOutSource}
											checkBox={true}
											handleCheckBox={() => { return true }}
											listChx={(value: any) => setListCheckPrintInfo(value)}
										/>
									)
							}

							<Stack alignItems={'flex-end'} paddingRight={'10px'} paddingLeft={'10px'} flexDirection={"row"}>
								<Stack width={"50%"} alignItems={"flex-start"}>
									{
										JGNO === null ?
											(
												// Nút Xuất vật tư
												<MyButton height='2rem' name={t("btnStock_Out")} onClick={() => handleOpenConfirm("stockout-outsource")} disabled={disable} />
											)
											:
											(
												<></>
											)
									}
								</Stack>
								<Stack width={"50%"} alignItems={"flex-end"}>
									{/* Tạo phiếu */}
									{
										JGNO === null ?
											(
												<MyButton height='2rem' name={t('btnCreate')} onClick={() => handleOpenConfirm("create-slip")} disabled={disable} />
											)
											:
											(
												// Tạo phiếu gia công
												<MyButton height='2rem' name={t("btnCreateSlipOutsource")} onClick={() => handleOpenConfirm("create-slip-outsource")} disabled={JGNO_Check?.check === true ? true : disable} />
											)
									}
								</Stack>
							</Stack>
						</Stack>
						{/* loading  */}
						<Backdrop
							sx={{
								color: "#fff",
								zIndex: (theme) => theme.zIndex.drawer + 1,
							}}
							open={isLoadingCreateSlip}
						>
							<CircularProgress color="inherit" />
						</Backdrop>
					</div>

				</Stack>
				{cofirmType === "no-list-bom" && <ModalCofirm showOk={false} open={openCofirm} onClose={handleCloseConfirm} title={t("lblNoBOM") as string} />}
				{cofirmType === "no-material" && <ModalCofirm showOk={false} open={openCofirm} onClose={handleCloseConfirm} title={t("lblNoMaterial") as string} />}
				{cofirmType === "no-stockout" && <ModalCofirm showOk={false} open={openCofirm} onClose={() => { handleCloseConfirm(), setQRCode("") }} title={t("lblNoStockOut") as string} />}
				{cofirmType === "insert-slip-sucess" && <ModalCofirm showOk={false} open={openCofirm} onClose={handleCloseConfirm} title={t("btnCreateSlipSucess") as string} />}
				{cofirmType === "insert-slip-error" && <ModalCofirm showOk={false} open={openCofirm} onClose={handleCloseConfirm} title={t("lblCreateSlipError") as string} />}
				{cofirmType === "no-information" && <ModalCofirm showOk={false} open={openCofirm} onClose={handleCloseConfirm} title={t("msgCompleteInformation") as string} />}
				{cofirmType === "stockout-outsource" && <ModalCofirm onPressOK={handleStockoutOutsource} open={openCofirm} onClose={handleCloseConfirm} title={t("msgStockOut") as string} />}
				{cofirmType === "return-material" && <ModalCofirm onPressOK={handleReturnMaterial} open={openCofirm} onClose={handleCloseConfirm} title={t("msgReturnMaterial") as string} />}
				{cofirmType === "return-material-sample" && <ModalReturnMaterialSample columns={columnsMaterialReturn} data={dataMaterialSampleReturn} onPressOK={handlePressOKReturnMaterialSample} open={openCofirm} onClose={handleCloseConfirm} title={t("msgReturnMaterial") as string} />}
				{cofirmType === "return-material-error" && <ModalCofirm onPressOK={handleCloseConfirm} showCancel={false} open={openCofirm} title={t("msgReturnMaterialError") as string} />}
				{cofirmType === "return-material-fail" && <ModalCofirm onPressOK={handleCloseConfirm} open={openCofirm} showCancel={false} title={t("msgReturnMaterialFail") as string} />}{/* Quét Camera */}
				{cofirmType === 'print-permission' && <ModalCofirm onPressOK={handleCloseConfirm} open={openCofirm} onClose={handleCloseConfirm} title={t("lblPrintPermission") as string} />}
				{cofirmType === "print" && <ModalCofirm open={openCofirm} onClose={handleCloseConfirm} title={t("msgCofirmPrint") as string} onPressOK={handlePrintInfoOK} />}
				{cofirmType === 'print-success' && <ModalCofirm showCancel={false} onPressOK={handleCloseConfirm} open={openCofirm} onClose={handleCloseConfirm} title={t("msgPrintSuccess") as string} />}
				{isScannerOpen && (
					<QRScannerV1
						onScan={handleScan}
						open={isScannerOpen}
						onClose={() => setIsScannerOpen(false)}
					/>
				)}
				{cofirmType === "create-slip" && <ConfirmDelivery onPressOK={handleCreateSlip} open={openCofirm} onClose={handleCloseConfirm} title={t("lblConfirmCreateSlip") as string} />}
				{cofirmType === "create-slip-outsource" && <ModalCofirm onPressOK={create_Material_Stock_Out_Sample_Outsource} open={openCofirm} onClose={handleCloseConfirm} title={t("msgCreateSlipOutsource") as string} />}
			</Stack>

		</FullScreenContainerWithNavBar>
	);
};


export default DeliverySampleLYVScreen;

