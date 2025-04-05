import { Box, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import FullScreenContainerWithNavBar from "../../../components/FullScreenContainerWithNavBar";
import EditableTableOrigin from "../../../components/EditableTable"; // Import wrapper
import MyButton from "../../../components/MyButton";
import InputField from "../../../components/InputField";
import { connect_string } from "../../LoginScreen/ChooseFactory";
import axios from "axios";
import { config } from "../../../utils/api";
import GenericAutocomplete from "../../../components/GenericAutocomplete";

const UpdateWH = () => {
    const { t } = useTranslation();
    const dataUser = useSelector((state: any) => state.UserLogin.user);

    const [rows, setRows] = useState<any[]>([]);
    const [Rack, setRack] = useState("");
    const [MaterialType, setMaterialType] = useState("");
    const [StorageSerial, setStorageSerial] = useState("");
    const [disable, setDisable] = useState(false);
    const [loading, setLoading] = useState(false);
    const [color, setColor] = useState(false);
    const [listWH, setListWH] = useState<any[]>([]);
    const [selectedWH, setSelectedWH] = useState<any>(null);
    const [editedRows, setEditedRows] = useState<any[]>([]);

    const handleRack = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRack(event.target.value);
    };
    const handleMaterialType = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMaterialType(event.target.value);
    };
    const handStorageSerial = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStorageSerial(event.target.value);
    };

    const columns: any[] = [
        { field: "stt", headerName: t("dcpNum") as string, width: 160, headerClassName: "custom-header" },
        { field: "Rack", headerName: t("dcpRack") as string, width: 160, headerClassName: "custom-header" },
        { field: "Storage_Serial", headerName: "Storage_Serial" as string, width: 150, headerClassName: "custom-header" },
        { field: "Position", headerName: "Position" as string, width: 160, headerClassName: "custom-header" },
        { field: "Material_Type", headerName: "Material_Type" as string, width: 300, headerClassName: "custom-header" },
        { field: "WH", headerName: "WH", width: 160, headerClassName: "custom-header", selected: true },
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

        if (Rack === "" && MaterialType === "" && StorageSerial === "") {
            url = connect_string + "api/api/get_rack_all";
            data = { WH: selectedWH?.value };
        } else {
            url = connect_string + "api/get_data_storeage";
            data = { Rack, Material_Type: MaterialType, StorageSerial };
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
        } catch (error) {
            console.error("Lỗi khi gọi API:", error);
            alert("Đã xảy ra lỗi khi lấy dữ liệu.");
        } finally {
            setDisable(false);
        }
    };

    const handleRefresh = () => {
        setRack("");
        setMaterialType("");
        setStorageSerial("");
        setRows([]);
        setListWH([]);
        setSelectedWH(null);
        setEditedRows([]);
    };

    const getDataWH = async () => {
        setLoading(true);
        const url = connect_string + "api/Get_WH_From_Data_Storage";
        try {
            const res = await axios.post(url);
            const data = res.data.map((wh: string) => ({
                value: wh,
                title: wh,
            }));
            setListWH(res.data
            );
            console.log("data", data)
            console.log("res", res.data)

        } catch (err) {
            console.error("Lỗi khi lấy WH:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleRowUpdate = (rowIndex: number, colName: string, value: string) => {
        const updatedRows = [...rows];
        console.log("new", updatedRows);

        updatedRows[rowIndex][colName] = value;

        // Cập nhật rows mới
        setRows(updatedRows);

        // Kiểm tra nếu dòng đã thay đổi và cần thêm vào editedRows
        const updatedRow = { ...updatedRows[rowIndex] };
        const editedRowIndex = editedRows.findIndex((row) => row._id === updatedRow._id);

        if (editedRowIndex === -1) {
            // Thêm dòng thay đổi mới vào editedRows
            setEditedRows((prev) => [...prev, updatedRow]);
        } else {
            // Cập nhật dòng đã thay đổi trong editedRows
            setEditedRows((prev) => {
                const newEditedRows = [...prev];
                newEditedRows[editedRowIndex] = updatedRow;
                return newEditedRows;
            });
        }

        console.log("newEditedRows", updatedRows);
    };

    const handleupdateWH = async () => {
       
        if (editedRows.length === 0) {
            alert("Không có thay đổi nào để lưu.");
            return;
        }

        setDisable(true);
        const url = connect_string + "api/update_wh";
        try {
            const response = await axios.post(url, { rows: editedRows }, config);
            if (response.status === 200) {
                alert("Cập nhật WH thành công!");
                setEditedRows([]); // Reset lại danh sách đã thay đổi
                await handleSearch(); // Gọi lại hàm tìm kiếm sau khi cập nhật
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật WH:", error);
            alert("Đã xảy ra lỗi khi cập nhật WH.");
        } finally {
            setDisable(false);
        }
    };



    return (
        <FullScreenContainerWithNavBar
            hidden={true}
            sideBarDisable={true}
            sideBarNavigate="/update-WH"
            title={t("lblupdate_inforWH")}
            navigate="/"
        >
            <Box paddingX={1} paddingBottom={1} className={"dark-bg-secondary border-bottom-white"}>
                <Stack>
                    <Grid container paddingTop={"16px"} justifyContent={"center"}>
                        <Grid item xs={1.2} display={"flex"} justifyContent={"start"} alignItems={"center"}>
                            <Typography className="textsize">RACK</Typography>
                        </Grid>
                        <Grid item xs={2} display={"flex"} paddingRight={"16px"}>
                            <InputField value={Rack} handle={handleRack} disable={disable} />
                        </Grid>
                        <Grid item xs={1.2} display={"flex"} justifyContent={"start"} alignItems={"center"}>
                            <Typography className="textsize">Material Type</Typography>
                        </Grid>
                        <Grid item xs={2} display={"flex"} paddingRight={"16px"}>
                            <InputField value={MaterialType} handle={handleMaterialType} disable={disable} />
                        </Grid>
                        <Grid item xs={1.2} display={"flex"} justifyContent={"start"} alignItems={"center"}>
                            <Typography className="textsize">Storage Serial</Typography>
                        </Grid>
                        <Grid item xs={2} display={"flex"}>
                            <InputField value={StorageSerial} handle={handStorageSerial} disable={disable} />
                        </Grid>
                    </Grid>
                    <Grid container padding={"16px"} justifyContent={"center"}>
                        <Grid item xs={0.5} display={"flex"} justifyContent={"start"} alignItems={"center"}>
                            <Typography className="textsize">WH</Typography>
                        </Grid>
                        <Grid item display={"flex"} alignItems={"center"} xs={1.5} paddingRight={"16px"}>
                            <GenericAutocomplete
                                options={listWH}
                                value={selectedWH}
                                onChange={(newValue: any | null) => setSelectedWH(newValue || null)}
                                getOptionLabel={(option) => option.title}
                                isOptionEqualToValue={(option, value) => option.title === value?.title}
                            />
                        </Grid>
                        <Grid item paddingRight={"16px"}>
                            <MyButton name={t("btnSearch")} onClick={handleSearch} disabled={disable} />
                        </Grid>
                        <Grid item paddingRight={"16px"}>
                            <MyButton name={t("Lưu")} onClick={handleupdateWH} disabled={disable} />
                        </Grid>
                        <Grid item>
                            <MyButton name={t("btnClean") as string} disabled={disable} onClick={handleRefresh} />
                        </Grid>
                    </Grid>
                </Stack>
            </Box>
            <Stack overflow={"hidden"} direction="row" sx={{ height: "100%" }}>
                <Grid sx={{ width: "100%", overflow: "hidden" }}>
                    <EditableTableOrigin
                        columns={columns}
                        rows={rows}
                        dataSelected={listWH}
                        onRowUpdate={handleRowUpdate}
                    />
                </Grid>
            </Stack>
        </FullScreenContainerWithNavBar>
    );
};

export default UpdateWH;