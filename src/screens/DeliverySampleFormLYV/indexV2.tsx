
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
import './sidebar.scss'
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


	const handleFocus = (id: string) => {
		setFocusedInputId(id);
	};
	const handleScan = (data: any | null) => {
		if (data && focusedInputId) {
			setTimeout(() => {
				const inputElement = document.getElementById(
					focusedInputId
				) as HTMLInputElement;
				if (inputElement) {
					if (focusedInputId == "scan-po") {
					}
				}
			});
		}
	}
	const paintingRow = (item: any, row: any) => {
		if (row?.checkMaterial === true) {

			return "#E52020"
		}
		if (row.Material_No !== null && row.QTY_Bom !== "" && ((new Decimal(row.QTY_Bom).minus(new Decimal(row.QTY_Sample))).toNumber() !== 0)) {
			return "orange"
		}

		return "white"
	};
	const highlightText = (item: any, row: any) => {
		if (typeof item !== "string") {
			return item;
		}
	}
	const handleGet_qty_out_Sample = (value: any, Material_No: any) => {
	}
	const handleDoubleClick = async (params: any, item: any) => {

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
							listMaterialStockOut={(value: any) => setListMaterialStockout(value)}
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
												<Grid
													item
													xs={12}
													display={"flex"}
													justifyContent={"flex-end"}
												></Grid>
												<Grid item xs={12} display={"flex"}>
													{" "}
												</Grid>
												<Grid item xs={12} display={"flex"}>
													{" "}
												</Grid>
												<Grid
													item
													display={"flex"}
													alignItems={"center"}
													xs={1}
												></Grid>
											</Grid>

											<Grid
												container
												direction={"row"}
												gap={"10px"}
												justifyContent={
													isOpenSidebar === true ? "center" : "flex-start"
												}
											>
												<Grid
													item
													display={"flex"}
													alignItems={"flex-end"}
													xs={2}
												></Grid>
												<Grid
													item
													display={"flex"}
													alignItems={"flex-end"}
													xs={2}
												></Grid>
												<Grid
													item
													display={"flex"}
													alignItems={"flex-end"}
													xs={2}
												></Grid>
												<Grid
													item
													display={"flex"}
													alignItems={"flex-end"}
													xs={2}
												></Grid>
												<Grid
													item
													display={"flex"}
													alignItems={"flex-end"}
													xs={2}
												></Grid>
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
									<Stack width={"50%"} alignItems={"flex-start"}></Stack>
									<Stack width={"50%"} alignItems={"flex-end"}></Stack>
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
					{/* Quét Camera */}
					{isScannerOpen && (
						<QRScannerV1
							onScan={handleScan}
							open={isScannerOpen}
							onClose={() => setIsScannerOpen(false)}
						/>
					)}
				</Stack>
			</FullScreenContainerWithNavBar>
		);
	};


export default DeliverySampleLYVScreen;

