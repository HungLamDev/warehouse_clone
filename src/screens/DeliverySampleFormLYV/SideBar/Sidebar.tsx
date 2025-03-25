/** @format */

import { Box, Grid, Stack } from "@mui/material";
import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { useTranslation } from "react-i18next";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import GenericAutocomplete from "../../../components/GenericAutocomplete";
import MyButton from "../../../components/MyButton";
import MyTableNew from "../../../components/MyTableNew";
import InputFieldV1 from "../../../components/InputField/index_new";
import CreateMergeBom from "../CreateMergeBOMForm";
import axios from "axios";
import { connect_string } from "../../LoginScreen/ChooseFactory";
import { useSelector } from "react-redux";
import useDebounced from "../../../components/CustomHook/useDebounce";
import { fromPOgetTestNoVersion_WH } from "../Func/Func";
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
	const [testNoPoNo, setTestNoPoNo] = useState<any>({})
	const [mergeNo, setMergeNo] = useState<any>("")
	const [listMaterialStockOutSample, setListMaterialStockOutSample] = useState<any[]>([])
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
	
	
	useImperativeHandle(ref, () => ({
		refreshData,
		refreshMaterial_Stock_Out_Sample,
		refreshMaterial_Stock_Out_Sample_Outsource,
		refreshGetDataWatingOutSource,
		refreshLoadDataJGNO,
		setPoNoValue,
	}));

	const refreshLoadDataJGNO = async () => {
		return await loadDataJGNO(mergeNo)
	};
	const setPoNoValue = async (value: any) => {
		setPoNo(value)
	};
	const handlePoNoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPoNo(event.target.value);
	}
	const dataUser = useSelector((state: any) => state.UserLogin.user);

	const debouncedSearchTerm = useDebounced(PoNo, 300);

	useEffect(() => {
		if (
			debouncedSearchTerm !== ""
		) {
			getAllPoNo(debouncedSearchTerm);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debouncedSearchTerm]);
	

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
	

	const getDataWaitingAndgetInfoPO = async (value: any) => {
		setDisable(true)
		
		await handleGetNewVersion(value)
		 Promise.all([await getDataWaiting(value), await get_Material_Stock_Out_Sample(value)]).finally(() => {
			setDisable(false)
		})
	};
	const getDataWaiting = async (value: any) => {
		if(value != ""){
			setListDataWaiting([])
			await getInfoPO(value);
			if(value?.PONO !== "" && value?.PONO){
				const url = connect_string + "api/get_Merge_Bom_ERP";
				const data = {
					Po_No: value?.PONO || "",
					check_de: valueChooseWarehouse.value,
					check_Gia_Cong_Lieu_Don: valueChooseMaterial.value
				};

				try{
					const res = await axios.post(url, data);
					console.log("BOOm", res)
					const arr = res.data.map((item: any, index: any) => ({
						_id: index,
						...item,
					}));

					arr.sort((a: any, b: any) => {
						const statusComparison = b.Status.localeCompare(a.Status);
						if (statusComparison !== 0) return statusComparison;

						return b.MJBH.localeCompare(a.MJBH);
					});

					setListDataWaiting(arr);
					listMaterialBOM(arr);
					return arr;
				} catch(error){
					console.error("Error fetching data from get_Merge_Bom_ERP:", error)
				}
			}
		}

	}
	// lấy thông tin test no 
	const getInfoPO = async (value: any) => {
		const infoPO = await fromPOgetTestNoVersion_WH(value?.PONO)
		setTestNoPoNo(infoPO)
		PO_NOAndTestNo({ PONO: infoPO?.PONO?.trim(), TestNo: infoPO?.TestNo?.trim() });

		setInfoPO("");
		Article("");
		KFJD("");
		MergeNo("");
		TestNo("");
		setMergeNo("")

		const url = connect_string + "api/get_info_pono";
		const data = {
			TestNo: value?.TestNo || "",
			Po_No: value?.PONO || "",
		};
		try {
			const res = await axios.post(url, data);
			setInfoPO(res.data);
			Article(res?.data?.ARTICLE || "");
			KFJD(res?.data?.KFJD || "");
			JiJie(res?.data?.JiJie || "")
			MergeNo(res?.data?.YPZLBH || "");
			setMergeNo(res?.data?.YPZLBH || "")
			TestNo(res?.data?.Version || "");
			await loadDataJGNO(res?.data?.YPZLBH || "")
		} catch (error) {
			console.error("Error fetching PO info:", error);
		}

	}
	//get thong tin chi tiet test 
	const get_Material_Stock_Out_Sample = async (value: any) => {
		setListMaterialStockOutSample([])
		const url = connect_string + "api/get_Material_Stock_Out_Sample";
		const data = {
			TestNo: value?.TestNo,
			Po_No: value?.PONO,
		};
		try {
			const res = await axios.post(url, data);

			const arr = res.data.map((item: any, index: any) => ({
				_id: index + 1,
				...item,
			}));
			console.log("tab2", arr)
			setListMaterialStockOutSample(arr)
			listMaterialStockOut(arr)
			
			return arr

		} catch (error) {
			console.error("Error fetching Material Stock Out Sample:", error);
		}
		

	}
	const getDataWatingOutSource = async (value: any, arrJGNO: any) => {
		setListDataWaiting([]);
		listMaterialBOM([]);
		if (value === null) {
			await getDataWaiting(valueAutocomplete);
		} else if (value !== null && value !== "") {
			const url = connect_string + "api/get_Merge_Bom_ERP_OutSource";
			const data = {
				JGNO: value,
			};

			try {
				const res = await axios.post(url, data);

				const checkOutsourceComplete: any = arrJGNO.filter((item: any) => item.JGNO === value)

				let arr = []

				if (checkOutsourceComplete[0]?.check === true) {
					arr = res.data.map((item: any, index: any) => ({
						_id: index,
						...item,
						Status: "done",
					}));
				}
				else {
					arr = res.data.map((item: any, index: any) => ({
						_id: index,
						...item,
						Status: ""
					}));
				}
				setListDataWaiting(arr);
				listMaterialBOM(arr);
			} catch (error) {
				console.error("Error fetching data from get_Merge_Bom_ERP_OutSource:", error);
			}
		}
	};

	const getDataWaitingAndgetInfoPOOutSource = async (value: any ) => {
		setDisable(true)
		Promise.all([await getDataWatingOutSource(value, listDataWaitingOutsource)]).finally(() => {
			setDisable(false)
		})


	}
	const get_Material_Stock_Out_Sample_Outsource = async (value: any ) => {
		if (value !== null) {
			listMaterialStockOut_Outsource([])
			const url = connect_string + "api/get_list_Material_To_JGNO"
			const data = {
				JGNO: value
			}

			try {
				const res = await axios.post(url, data)

				const arr = res.data.map((item: any, index: any) => ({
					_id: index + 1,
					...item
				}))

				listMaterialStockOut_Outsource(arr)

			} catch (error) {
				console.error(error)
			}
		}
	}
	// load danh sách đơn gia công của merge no
	const loadDataJGNO = async (value: any) => {
		let arrJGNO = []
		if (value !== "") {
			setListDataWaitingOutsource([])
			// setPoOutsource(null)
			const url = connect_string + "api/get_JGNO_to_YPZLBH"
			const data = {
				YPZLBH: value
			}
			try {
				const res = await axios.post(url, data)
				setListDataWaitingOutsource(res.data)
				arrJGNO = res.data || []
			} catch (error) {
				error
			}
		}
		return arrJGNO
	}
	// lấy version mới nhất
	const handleGetNewVersion = async (value: any) => {
		const url = connect_string + "api/insert_PONO_version_new"
		const data = {
			PONO: value?.PONO,
			user_id: dataUser[0].UserId
		}

		try {
			const res = await axios.post(url, data)
		} catch (error) {
			console.error("Error fetching PO info:", error);
		}
	}
	const handleSearch = async (value: any ) => {
		if (PoOutsource === null) {
			await getDataWaitingAndgetInfoPO(valueAutocomplete)
		}
		else {
			await getDataWaitingAndgetInfoPOOutSource(PoOutsource)
			await get_Material_Stock_Out_Sample_Outsource(PoOutsource)
			await loadDataJGNO(mergeNo)
		}

	}

	// làm mới
	const handleClean = () => {
		setListDataWaiting([])
		listMaterialBOM([])
		listMaterialStockOut([])
		setListDataWaitingOutsource([])
		setListSampleOrder([])
		setValueAutocomplete("")
		setPoOutsource(null)
		setInfoPO("");
		Article("");
		KFJD("");
		MergeNo("");
		TestNo("");
		JGNO(null)
		get_qty_out_Sample()
	}

	const getAllPoNo = async (value: any) => {
		setDisable(true)
		setValueAutocomplete("")
		setPoOutsource(null)
		JGNO(null)
		// lấy version mới nhất
		const infoPO = await fromPOgetTestNoVersion_WH(value)
		
		setTestNoPoNo(infoPO)
		setOnFocus(false)
		const url = connect_string + "api/get_Merge_Bom_To_PONO";
		const data = {
			TestNo: infoPO?.TestNo?.trim(),
			Po_No: infoPO?.PONO?.trim(),
			User_WH: dataUser[0].UserId,
		};
		try {
			const res = await axios.post(url, data);

		
			setListSampleOrder(res.data || []);

			const filterListPo = res?.data.filter((item: any) => item.PONO === infoPO?.PONO?.trim());

			const newValue = {
				PONO: filterListPo[0]?.PONO?.trim(),
				TestNo: infoPO?.TestNo?.trim(),
			};

			PO_NOAndTestNo(newValue);

			setValueAutocomplete(newValue || "");

			await getDataWaitingAndgetInfoPO(newValue);

			setPoNo('');

		} catch (error) {
			console.error("Error fetching PO data:", error);
		} finally {
			setOnFocus(true);
			setDisable(false)
		}

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
												if (!value) return false; // Xử lý trường hợp value là null/undefined
												if (typeof value === 'string') {
													return option.PONO === value || option.TestNo === value;
												}
												return option.PONO === value?.PONO && option.TestNo === value?.TestNo;
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
											onClick={handleSearch} 
										/>
									</Grid>

									{/* Nút làm mới */}
									<Grid item xs={2} display={"flex"} alignItems={"center"}>
										<MyButton height="2rem" name={t("btnClean")} onClick={handleClean} disabled={disable} />
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
