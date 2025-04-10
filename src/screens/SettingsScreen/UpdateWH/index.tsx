import { Box, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import FullScreenContainerWithNavBar from "../../../components/FullScreenContainerWithNavBar";

import MyButton from "../../../components/MyButton";
import InputField from "../../../components/InputField";
import { connect_string } from "../../LoginScreen/ChooseFactory";
import axios from "axios";
import { config } from "../../../utils/api";
import GenericAutocomplete from "../../../components/GenericAutocomplete";
import TableOrigin from "../../../components/TableOrigin";
import ModalCofirm from "../../../components/ModalConfirm";


const UpdateWH = () => {
    const { t } = useTranslation();
    const dataUser = useSelector((state: any) => state.UserLogin.user);
    const [rows, setRows] = useState<any[]>([]);
    const [MaterialType, setMaterialType] = useState("");
    const [disable, setDisable] = useState(false);
    const [loading, setLoading] = useState(false);
    const [listWH, setListWH] = useState<any[]>([]);
    const [selectedWHToAll, setSelectedWHToAll] = useState<any>(null);
    const [selectedWH, setSelectedWH] = useState<any>(null);
    const [openCofirm, setOpenCofirm] = useState(false)
    const [cofirmType, setCofirmType] = useState('')
    const [originalRows, setOriginalRows] = useState<any[]>([]);
    const [RackInput, setRackInput] = useState("");
    const [RackList, setRackList] = useState<string[]>([]);

    const handleMaterialType = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMaterialType(event.target.value);
    };
    const handleRackInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = event.target.value;
        setRackInput(rawValue);
        const racks = rawValue
            .split(/\s+/)            // tách theo khoảng trắng, tab, newline
            .map(s => s.trim())      // xóa khoảng trắng 2 bên
            .filter(Boolean);        // loại bỏ chuỗi rỗng

        setRackList(racks)
    };

    const columns: any[] = [
        { field: "stt", headerName: t("dcpNum") as string, width: 160, headerClassName: "custom-header" },
        { field: "Rack", headerName: t("dcpRack") as string, width: 1000, headerClassName: "custom-header" },
        { field: "Position", headerName: t("dcpPosition") as string, width: 160, headerClassName: "custom-header" },
        { field: "Material_Type", headerName: t("dcmUser_ID") as string, width: 300, headerClassName: "custom-header" },
        { field: "WH", headerName: t("lblChooseWH"), width: 160, headerClassName: "custom-header", selected: true },
    ];

    useEffect(() => {
        const fetchWH = async () => {
            if (dataUser !== "") {
                await getDataWH();
            }
        };
        fetchWH();
    }, [dataUser]);

    const handleSearch = async () => {
        setDisable(true);
        let url = "";
        let data = {};
        url = connect_string + "api/get_data_storeage";
        data = {
            RackList: RackList || "",
            Material_Type: MaterialType || "",
            WH: selectedWH || ""
        }
        try {
            const response = await axios.post(url, data, config);
            const arr = response.data.map((item: any, index: number) => ({
                _id: item._id || index,
                stt: index + 1,
                Storage_Serial: item.Storage_Serial,
                Material_Type: item.Material_Type,
                Rack: item.Rack,
                Position: item.Position,
                WH: item.WH || "",
                Max_Qty: item.Max_Qty,
                Min_Qty: item.Min_Qty,
                StartDate: item.StartDate,
                EndDate: item.EndDate,
                ModifyDate: item.ModifyDate,
            }));
            setRows(arr);
            setOriginalRows(JSON.parse(JSON.stringify(arr)));
        } catch (error) {
            console.error("Lỗi khi gọi API:", error);
            alert("Đã xảy ra lỗi khi lấy dữ liệu.");
        } finally {
            setDisable(false);
        }
    };

    const handleRefresh = () => {
        setMaterialType("");
        setRows([]);
        setSelectedWH(null);
        setRackInput("")
        setRackList([])

    };

    const handleOpenConfirm = (confirmName: string) => {
        setCofirmType(confirmName)
        setOpenCofirm(true)
    }

    const handleCloseConfirm = () => {
        setCofirmType('')
        setOpenCofirm(false)
    }

    const getDataWH = async () => {
        setLoading(true);
        const url = connect_string + "api/Get_WH_From_Data_Storage";
        try {
            const res = await axios.post(url);
           
            setListWH(res.data);
            setSelectedWH(null)
            setSelectedWHToAll(null)
        } catch (err) {
            console.error("Lỗi khi lấy WH:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleupdateWH = async () => {
        if (rows.length > 0) {
            setLoading(true);
            const changedRows = rows.filter((row, index) => {
                const originalRow = originalRows[index];
                if (!originalRow) return true;

                return Object.keys(row).some((key) => {
                    return row[key] !== originalRow[key];
                });
            });
            if (changedRows.length === 0) {
                handleOpenConfirm('NoChange')
                setLoading(false);
                return;
            }
            const url = connect_string + "api/update_Data_Storage";
            const data = {
                List_update: changedRows,
                saFactory: dataUser[0].factoryName,
                saVersion: dataUser[0].WareHouse,
                USERID_PWA: dataUser[0].UserId,
            };

            try {
                const response = await axios.post(url, data, config);
                console.log("response",response)
                if (response.data === true) {
                    handleOpenConfirm('success')
                } else {
                    handleOpenConfirm('error')
                }
            } catch (error) {
                console.error("Lỗi cập nhật:", error);
            } finally {
                setLoading(false);
            }
        }
    };
    const handleApplyWHToAll = (WH: any) => {
        const updatedRows = rows.map(row => ({
            ...row,
            WH,
        }));
        setRows(updatedRows);
    };
    return (
        <FullScreenContainerWithNavBar
            hidden={true}
            sideBarDisable={true}
            sideBarNavigate="/update-WH"
            title={t("lblupdate_inforWH")}
            navigate="/">
            <Box paddingX={1} paddingBottom={1} className={"dark-bg-secondary border-bottom-white"}>
                <Stack>
                    <Grid container paddingTop={"16px"} justifyContent={"center"}>
                        <Grid item xs={0.5} display={"flex"} justifyContent={"start"} alignItems={"center"}>
                            <Typography className="textsize">{t("dcpRack")}</Typography>
                        </Grid>
                        <Grid item xs={2} display={"flex"} paddingRight={"16px"}>
                            <InputField value={RackInput} handle={handleRackInputChange} disable={disable} />
                        </Grid>
                        <Grid item xs={1.2} display={"flex"} justifyContent={"start"} alignItems={"center"}>
                            <Typography className="textsize">{t("dcmUser_ID")}</Typography>
                        </Grid>
                        <Grid item xs={2} display={"flex"} paddingRight={"16px"}>
                            <InputField value={MaterialType} handle={handleMaterialType} disable={disable} />
                        </Grid>
                       
                           <Grid item xs={1} display={"flex"} justifyContent={"start"} alignItems={"center"}>
                            <Typography className="textsize"> {t("lblChooseWH")}</Typography>
                        </Grid>
                        <Grid item display={"flex"} alignItems={"center"} xs={1.5} paddingRight={"16px"}>
                            <GenericAutocomplete
                                options={listWH || []}
                                value={selectedWH}
                                onChange={(newValue: any | null) => {
                                    setSelectedWH(newValue)
                                }}
                                getOptionLabel={(option) =>
                                    typeof option === 'string' ? option : option?.title || ''
                                }
                                isOptionEqualToValue={(option, value) => option.value === value?.value}
                            />
                        </Grid>
                        
                    </Grid>
                    <Grid container padding={"16px"} justifyContent={"center"}>
                        <Grid item paddingRight={"16px"}>
                            <MyButton name={t("btnSearch")} onClick={handleSearch} disabled={disable} />
                        </Grid>
                        <Grid item paddingRight={"16px"}>
                            <MyButton name={t("btnSave")} disabled={disable} onClick={() => rows.length > 0 && handleOpenConfirm('confirm')} />
                        </Grid>
                        <Grid item paddingRight={"16px"}>
                            <MyButton name={t("btnClean") as string} disabled={disable} onClick={handleRefresh} />
                        </Grid>
                       
                        {rows.length > 2 && (
                            <>
                                <Grid item xs={1} display={"flex"} justifyContent={"start"} alignItems={"center"}>
                                    <Typography className="textsize">{t("rbtUpdateManyRack")}</Typography>
                                </Grid>
                                <Grid item display={"flex"} alignItems={"center"} xs={1.5} paddingRight={"16px"}>
                                    <GenericAutocomplete
                                        options={listWH || []}
                                        value={selectedWHToAll}
                                        onChange={(newValue: any | null) => {
                                            setSelectedWHToAll(newValue);
                                            handleApplyWHToAll(newValue);
                                        }}
                                        getOptionLabel={(option) =>
                                            typeof option === 'string' ? option : option?.title || ''
                                        }
                                        isOptionEqualToValue={(option, value) => option.value === value?.value}
                                    />
                                </Grid>
                            </>
                        )}
                       
                    </Grid>
                </Stack>
            </Box>
            <Stack overflow={"hidden"} direction="row" sx={{ height: "100%" }}>
                <Grid sx={{ width: "100%", overflow: "hidden" }}>
                    <TableOrigin  columns={columns} rows={rows} arrNotShowCell={[]} handleDoubleClick={null} handlerowClick={null} dataSelected={listWH} />
                </Grid>
                {cofirmType === 'confirm' && <ModalCofirm onPressOK={handleupdateWH} open={openCofirm} onClose={handleCloseConfirm} title={t("msgYouWantUpdate") as string} />}
                {cofirmType === 'error' && <ModalCofirm showCancel={false} onPressOK={handleCloseConfirm} open={openCofirm} onClose={handleCloseConfirm} title={t("msgerror") as string} />}
                {cofirmType === 'NoChange' && <ModalCofirm showCancel={false} onPressOK={handleCloseConfirm} open={openCofirm} onClose={handleCloseConfirm} title={t("msgNochange") as string} />}
                {cofirmType === 'success' && <ModalCofirm showCancel={false} onPressOK={handleCloseConfirm} open={openCofirm} onClose={handleCloseConfirm} title={t("msgUpdateSuccesful") as string} />}
            </Stack>
        </FullScreenContainerWithNavBar>
    );
};

export default UpdateWH;