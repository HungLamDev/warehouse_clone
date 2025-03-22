/** @format */

import { Box, Grid, Stack } from "@mui/material";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { useTranslation } from "react-i18next";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import GenericAutocomplete from "../../../components/GenericAutocomplete";
import MyButton from "../../../components/MyButton";
import MyTableNew from "../../../components/MyTableNew";
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

	const refreshData = async () => { };
	const refreshGetDataWatingOutSource = async () => { };
	const refreshMaterial_Stock_Out_Sample = async () => { };
	const refreshMaterial_Stock_Out_Sample_Outsource = async () => { };
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
							<Grid
								container
								columnSpacing={1}
								rowSpacing={0.5}
								justifyContent={"center"}
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
								></Grid>
								<Grid
									item
									xs={3}
									display={"flex"}
									justifyContent={"center"}
									alignItems={"center"}
								></Grid>
								<Grid item xs={6} display={"flex"}></Grid>
								<Grid
									container
									item
									xs={6}
									display={"flex"}
									alignItems={"center"}
								></Grid>
								<Grid item xs={3} display={"flex"} alignItems={"center"}></Grid>
								<Grid item xs={3} display={"flex"} alignItems={"center"}></Grid>
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
										{/* <GenericAutocomplete /> */}
									</Grid>
								</Grid>
								<Grid
									container
									item
									xs={12}
									display={"flex"}
									alignItems={"center"}
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
											disabled={disable}
										/>
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
