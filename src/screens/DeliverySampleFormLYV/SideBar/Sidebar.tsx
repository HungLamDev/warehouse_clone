/** @format */

import { Box, Grid, Stack } from "@mui/material";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { useTranslation } from "react-i18next";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import GenericAutocomplete from "../../../components/GenericAutocomplete";
import MyButton from "../../../components/MyButton";
import MyTableNew from "../../../components/MyTableNew";
import InputFieldV1 from "../../../components/InputField/index_new";
import CreateMergeBom from "../CreateMergeBOMForm";
interface SidebarProps {
	column: any;
	columnOutSource: any;
	PO_NOAndTestNo: any;
	JGNO: any;
	listMaterialBOM: any;
	listMaterialStockOut: any;
	listMaterialStockOut_Outsource: any;
	Article: any;
	KFJD: any;
	JiJie: any;
	MergeNo: any;
	TestNo: any;
	isOpenSidebar: any;
	get_qty_out_Sample: any;
	handleFocusInput: any;
	JGNO_Check: any;
	listCheckMaterialStockout: any;
	checkVersion: any;
}

export interface SidebarRef {
	refreshData: () => Promise<void>;
	refreshMaterial_Stock_Out_Sample: () => Promise<void>;
	refreshMaterial_Stock_Out_Sample_Outsource: () => Promise<void>;
	refreshLoadDataJGNO: () => Promise<any[]>;
	setPoNoValue: (value: any) => void;
	refreshGetDataWatingOutSource: (value: any, arrJGNO: any) => Promise<void>;
}

//#region Tạo BOM
const Sidebar = forwardRef<SidebarRef, SidebarProps>((props, ref) => {
	const {
		column,
		columnOutSource,
		PO_NOAndTestNo,
		JGNO,
		JGNO_Check,
		listMaterialBOM,
		listMaterialStockOut,
		listMaterialStockOut_Outsource,
		Article,
		KFJD,
		JiJie,
		MergeNo,
		TestNo,
		isOpenSidebar,
		get_qty_out_Sample,
		handleFocusInput,
		listCheckMaterialStockout = [],
		checkVersion,
	} = props;
	const { t } = useTranslation();

	//region variable
	const [isOpen, setIsOpen] = useState(true);
	const [disable, setDisable] = useState(false);
	const [listDataWaitingOutsource, setListDataWaitingOutsource] = useState<any[]>([])
	const [PoOutsource, setPoOutsource] = useState<any>(null)
	const [listDataWaiting, setListDataWaiting] = useState<any[]>([])
	const [infoPO, setInfoPO] = useState<any>({})
	const [onFocus, setOnFocus] = useState(false)
	const [PoNo, setPoNo] = useState("")
	const [listSampleOrder, setListSampleOrder] = useState<any[]>([])
	const [valueAutocomplete, setValueAutocomplete] = useState<any>(null);
	const refreshData = async () => { };
	const refreshGetDataWatingOutSource = async () => { };
	const refreshMaterial_Stock_Out_Sample = async () => { };
	const refreshMaterial_Stock_Out_Sample_Outsource = async () => { };
	const [openCreateBOM, setOpenCreateBOM] = useState(false);
	const listChooseMaterial = [
		{
			value: "all",
			title: t("chxAll")
		},
		{
			value: "lieu_don",
			title: t("lblSingleMaterials")
		},
		{
			value: "lieu_gia_cong",
			title: t("lblOutsourceMaterials")
		},
	]

	const [valueChooseMaterial, setValueChooseMaterial] = useState({
		value: "all",
		title: t("chxAll")
	})

	const listChooseWarehouse = [
		{
			value: "all",
			title: t("chxAll")
		},
		{
			value: "da-vai-pu",
			title: t("lblLeather-Fabric-PU")
		},
		{
			value: "may-baobi",
			title: t("lblSewing-Packaging")
		},
		{
			value: "kho_de",
			title: t("lblSoleWarehouse")
		},
	]

	const [valueChooseWarehouse, setValueChooseWarehouse] = useState({
		value: "all",
		title: t("chxAll")
	})
	
	const refreshLoadDataJGNO = async () => {
		return []
	};
	const setPoNoValue = async () => { };

	useImperativeHandle(ref, () => ({
		refreshData,
		refreshMaterial_Stock_Out_Sample,
		refreshMaterial_Stock_Out_Sample_Outsource,
		refreshGetDataWatingOutSource,
		refreshLoadDataJGNO,
		setPoNoValue,
	}));
	const paintingRow = (item: any, row: any) => {
		if (typeof item !== "string") {
			return item;
		}

		if (row.Status === "done") {
			return "grey"
		}

		return "white"
	};
	const handleRowClick = (MatNo: any) => {

	}
	const handleCheckBox = (item: any) => {
		if (PoOutsource !== null || item.Status === "done") {
			return false
		}
		return true
	}
	const handlePoNoChange = () => {

	}

	const getDataWaitingAndgetInfoPO = async (value: any) => {
		setDisable(true)

		// await handleGetNewVersion(value)
		// Promise.all([await getDataWaiting(value), await get_Material_Stock_Out_Sample(value)]).finally(() => {
		// 	setDisable(false)
		// })
	};
	const getDataWaitingAndgetInfoPOOutSource = async (value: any) => {

	}
	const get_Material_Stock_Out_Sample_Outsource = async (value: any ) => {

	}

	return (
		<div className={`sidebar ${isOpen ? "open" : "closed"}`}>
			<button className="toggle-button">
				{isOpen ? (
					<SkipPreviousIcon color="action" />
				) : (
					<SkipNextIcon color="action" />
				)}
			</button>
			{!isOpen && (
				<div
					style={{
						position: "absolute",
						top: "calc(80dvh/2)",
						left: "3px",
					}}
				>
					<span
						style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
					>
						MERGE BOM
					</span>
				</div>
			)}

			<div
				className="content"
				style={{ display: "flex", flexDirection: "column", height: "100%" }}
			>
				<Box
					className={"dark-bg-secondary border-bottom-white"}
					style={{ minHeight: "calc(80dvh/ 2.9)", flexShrink: 0 }}
				>
					<Stack direction={"row"} height={"100%"} alignItems={"flex-end"}>
						<Stack width={"100%"} padding={0.5}>
							<Grid container columnSpacing={1} rowSpacing={0.5} justifyContent={"center"}
							>
								<Grid
									item
									xs={3}
									display={"flex"}
									justifyContent={"center"}
									alignItems={"center"}
								> <span className='textsize' style={{ color: 'yellow', overflow: "hidden", textOverflow: "ellipsis" }}> {infoPO?.ARTICLE ? "Article: " + infoPO.ARTICLE : ""}</span></Grid>
								<Grid
									item
									xs={3}
									display={"flex"}
									justifyContent={"center"}
									alignItems={"center"}
								> <span className='textsize' style={{ color: 'yellow', overflow: "hidden", textOverflow: "ellipsis" }}> {infoPO?.KFJD ? "Article: " + infoPO.KFJD : ""}</span></Grid>
								<Grid
									item
									xs={3}
									display={"flex"}
									justifyContent={"center"}
									alignItems={"center"}
								> {/* Pairs */}
									<span className='textsize' style={{ color: 'yellow', overflow: "hidden", textOverflow: "ellipsis" }}> {infoPO?.PAIRS ? "Pairs: " + infoPO.PAIRS : ""}</span></Grid>
								<Grid item xs={6} display={"flex"}>
									{/* Quét PO */}
									<InputFieldV1
										xsLabel={4}
										xsInput={8}
										label={t("gpbScan") as string}
										disable={disable}
										value={PoNo}
										onFocus={onFocus}
										handle={handlePoNoChange}
										id='scan-po'
										handleOnFocus={() => handleFocusInput('scan-po')}
									/>
								</Grid>
								<Grid
									container
									item
									xs={6}
									display={"flex"}
									alignItems={"center"}
								>
									{/* List PO */}
									<Grid item display={'flex'} xs={3}>
										<span className='textsize'>PO NO</span>
									</Grid>
									<Grid item display={'flex'} xs={9}>
										<GenericAutocomplete
											options={Array.isArray(listSampleOrder) ? listSampleOrder : []}
											value={valueAutocomplete || ""}
											onChange={(newValue: any | null) => {
												if (newValue !== null) {
													setValueAutocomplete(newValue);
													getDataWaitingAndgetInfoPO(newValue)
												}
											}}

											getOptionLabel={(option) =>
												typeof option === "string" ? option : option.PONO || ""
											}
											isOptionEqualToValue={(option, value) => {
												if (typeof value === 'string') {
													return option.TestNo === value;
												}
												return option.TestNo === value?.TestNo;
											}}
										/>
									</Grid>
								</Grid>
								<Grid item xs={3} display={"flex"} alignItems={"center"}>
									{/* Chọn kho */}
									<GenericAutocomplete
										options={listChooseWarehouse}
										value={valueChooseWarehouse}
										onChange={(newValue: any | "") => {
											if (newValue === null) {
												setValueChooseWarehouse({
													value: "all",
													title: t("chxAll")
												})
											}
											else {
												setValueChooseWarehouse(newValue || "")
											}
										}}

										getOptionLabel={(option) =>
											typeof option === "string" ? option : option.title
										}
										isOptionEqualToValue={(option, value) => {
											if (typeof value === 'string') {
												return option.title === value;
											}
											return option.title === value.title;
										}}
									/>
								</Grid>
								<Grid item xs={3} display={"flex"} alignItems={"center"}>
									{/* Chọn loại vật tư */}
									<GenericAutocomplete
										options={listChooseMaterial}
										value={valueChooseMaterial}
										onChange={(newValue: any | "") => {
											if (newValue === null) {
												setValueChooseMaterial({
													value: "all",
													title: t("chxAll")
												})
											}
											else {
												setValueChooseMaterial(newValue || "")
											}
										}}

										getOptionLabel={(option) =>
											typeof option === "string" ? option : option.title
										}
										isOptionEqualToValue={(option, value) => {
											if (typeof value === 'string') {
												return option.title === value;
											}
											return option.title === value.title;
										}}
									/>
								</Grid>
								<Grid
									container
									item
									xs={6}
									display={"flex"}
									alignItems={"center"}
								>
									<Grid item display={"flex"} xs={3}>
										<span className="textsize">JGNO</span>
									</Grid>
									<Grid item display={"flex"} xs={9}>
										<GenericAutocomplete
											options={listDataWaitingOutsource || []}
											value={PoOutsource}
											onChange={(newValue: any | null) => {
												setPoOutsource(newValue?.JGNO || null);
												JGNO(newValue?.JGNO || null)
												JGNO_Check(newValue || null)
												getDataWaitingAndgetInfoPOOutSource(newValue?.JGNO || null)
												get_Material_Stock_Out_Sample_Outsource(newValue?.JGNO || null)
											}}

											getOptionLabel={(option) =>
												typeof option === "string" ? option : option.JGNO
											}
											isOptionEqualToValue={(option, value) => {
												if (typeof value === 'string') {
													return option.JGNO === value;
												}
												return option.JGNO === value?.JGNO;
											}}
										/>
									</Grid>
								</Grid>
								<Grid
									container
									item
									xs={12}
									display={"flex"}
									justifyContent={"center"}
									gap={"20px"}
								>
									{/* Nút tim kiem */}

									<Grid item xs={2} display={"flex"} alignItems={"center"}>
										<MyButton
											height="2rem"
											name={t("btnSearch")}
											disabled={disable}
										/>
									</Grid>

									{/* Nút làm mới */}
									<Grid item xs={2} display={"flex"} alignItems={"center"}>
										<MyButton height="2rem" name={t("btnClean")} disabled={disable} />
									</Grid>
									{/* Nút tạo BOM */}
									<Grid item xs={2} display={"flex"} alignItems={"center"}>
										<MyButton
											height="2rem"
											name={t("btnCreateBOM")}
											onClick={() => setOpenCreateBOM(true)}
											disabled={disable}
										/>
										{openCreateBOM && <CreateMergeBom open={openCreateBOM} onClose={() => setOpenCreateBOM(false)} />}
									</Grid>
									{/* Nút In mẫu */}
									<Grid item xs={2} display={"flex"} alignItems={"center"}>
										<MyButton
											height="2rem"
											name={t("btnPrint_sample")}
											disabled={disable}
										/>
									</Grid>
								</Grid>
							</Grid>
						</Stack>
					</Stack>
				</Box>
				<Stack overflow={"hidden"}
					sx={{ height: '100%', width: '100%', backgroundColor: '#1c2538' }}>
					{/* Bảng */}
					<MyTableNew
						columns={PoOutsource === null ? column : columnOutSource}
						rows={listDataWaiting}
						paintingRow={paintingRow}
						checkBox={true}
						handlerowClick={(params: any, item: any) => handleRowClick(item?.MatNo || "")}
						selectedFirstRow={true}
						handleCheckBox={(item: any) => handleCheckBox(item)}
						listChx={(row) => listCheckMaterialStockout(row)}
					/>
				</Stack>
			</div>
		</div>
	);
});
//#endregion

export default Sidebar;
