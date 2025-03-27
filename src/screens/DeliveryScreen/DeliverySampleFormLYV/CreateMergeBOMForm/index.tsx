import { Backdrop, Box, CircularProgress, Grid, IconButton, Modal, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { BiArrowBack } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import MyTableNew from '../../../../components/MyTableNew';
import MyButton from '../../../../components/MyButton';
import InputFieldV1 from '../../../../components/InputField/index_new';
import QRScanner from '../../../../components/QRScanner';
import { connect_string } from '../../../LoginScreen/ChooseFactory';
import axios from 'axios';
import moment from 'moment';
import useDebounced from '../../../../components/CustomHook/useDebounce';
import DetailMergeBOM from '../../../../components/CreateMergeBOM/DetailMergeBOM/index'
export const fromPOgetTestNoVersion = async (pono: string) => {
    const url = connect_string + "api/get_testNo_Version"
    const data = {
        PONO: pono
    }

    try {
        const res = await axios.post(url, data);
        return res.data
    } catch (error) {
        console.error("Error during get test no and version:", error);
    }
}
interface CreateMergeBomProps {
    title?: string,
    open?: any,
    onClose?: any,
    onPressOK?: any,
    showOk?: boolean
}
const CreateMergeBom = (props: CreateMergeBomProps) => {
    const { title, open, onClose, onPressOK, showOk = true } = props
    const { t } = useTranslation();
    //#region columnHeader
    const columns: any[] = [
        // {
        //     field: "TestNo",
        //     headerName: "Test No",
        //     align: "center",
        //     headerAlign: 'center',
        //     width: 180,
        // },
        {
            field: "Po_No",
            headerName: "Po No",
            align: "center",
            headerAlign: 'center',
            width: 180,
        },
        {
            field: "Version",
            headerName: "Version",
            align: "center",
            headerAlign: 'center',
            width: 180,
        },
        {
            field: "Article",
            headerName: "Article",
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
            field: "JiJie",
            headerName: "Sesson",
            align: "center",
            headerAlign: 'center',
        },
        {
            field: "YPDH",
            headerName: "YPDH",
            align: "center",
            headerAlign: 'center'
        },
        {
            field: "User_ID",
            headerName: "User ID",
            align: "center",
            headerAlign: 'center'
        },
        {
            field: "YPZLBH",
            headerName: "Merge No",
            align: "center",
            headerAlign: 'center'
        },
        {
            field: "Modify_Date",
            headerName: "Modify Date",
            align: "center",
            headerAlign: 'center',
            width: 150,
        },
        {
            field: "",
            headerName: t("lblDetail") as string,
            align: "center",
            headerAlign: 'center',
            width: 150,
            type: "button",
        },
        {
            field: "print_all",
            headerName: t("rbtPrint_All") as string,
            align: "center",
            headerAlign: 'center',
            width: 150,
            type: "button",
        },
    ];
    //#endregion

    //#region useSelector
    const dataUser = useSelector((state: any) => state.UserLogin.user);
    //#endregion
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        height: '90%',
        bgcolor: '#1c2538',
        border: '2px solid white',
        borderRadius: 3,
        boxShadow: 24,
        display: 'flex',
        flexDirection: 'column'
    };

    const [disable, setDisable] = useState(false)
    const [valueScan, setValueScan] = useState("")
    const [itemRow, setItemRow] = useState<any>({})
    const [data, setData] = useState<any[]>([])
    const [mergeNo, setMergeNo] = useState("")
    const [cofirmType, setCofirmType] = useState('')
    const [openCofirm, setOpenCofirm] = useState(false)
    const [modalScan, setModalScan] = useState(false)
    const [itemRowMergeBom, setItemRowMergeBom] = useState<any>({})
    const handleScanClick = () => {
        setModalScan(true);
    }
    const handleRowClick = (params: any, item: any) => {
        setItemRow(item)
    }
    const handleOnClickBtn = (item: any, column: any) => {
        setItemRowMergeBom(item)

        if (item?.YPZLBH !== "" && item?.YPZLBH !== null && column?.field !== "print_all") {
            return (
                <MyButton
                    height="1.5rem"
                    name={t("lblDetail")}
                    onClick={() => handleOpenConfirm("detail-merge-bom")}
                />
            );
        }
        else if (item?.YPZLBH !== "" && item?.YPZLBH !== null && column?.field === "print_all") {
            return (
                <MyButton
                    height="1.5rem"
                    name={t("btnPrintMergeNo")}
                    onClick={() => handlePrintAll()}
                />
            );
        }
        else {
            return <></>;
        }


    }
    const handleOpenConfirm = (confirmName: string) => {
        setCofirmType(confirmName)
        setOpenCofirm(true)
    }
    const createBOM = () => {

    }

    const handleCloseConfirm = () => {
        setCofirmType('')
        setOpenCofirm(false)
    }

    const handlePrintAll = async () => {}

    //Tô màu dòng trong bảng------------------------------------------
    const paintingRow = (item: any, row: any) => {
        if (typeof item !== "string") {
            return item;
        }

        if (row.check === true) {
            return "grey"
        }

        return "white"
    };
    const checkCreateSlip = async (PONO: string) => {
        const url = connect_string + "api/check_LLNO_TO_PONO";
        const data = {
            PONO: PONO,
        };

        try {
            const res = await axios.post(url, data);
            return res.data
        }
        catch (error) {
            console.log("Error in checkCreateSlip:", error);
        }
    }

    const handleValueScanChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValueScan(event.target.value);
    };
    const handleMergeNoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMergeNo(event.target.value);
    };
    const debouncedSearchTerm = useDebounced(valueScan, 200);
    useEffect(() => {
        //Phiên bản có kiểm tra chất lượng vật tư
        if (
            debouncedSearchTerm !== ""
        ) {
            scanPoNo(debouncedSearchTerm)
        }
    }, [debouncedSearchTerm]);
    const handlePaintingPo = async (test_no: any) => {
        let check= false
        const url = connect_string + "api/check_testNo_and_MergeNo"
        const data = {
            test_no: test_no,
        }
        const res = await axios.post(url, data)
        check = res.data
        return check
    }
    const handleMergeNoToPono = async () => {
        setDisable(true)
        const url = connect_string + "api/Merge_No_To_Pono"
        const data = {
            ypzlbh: mergeNo.trim()
        }
        try {
            const res = await axios.post(url, data)
            const list_data = await Promise.all(
                res.data.map(async (item: any, index:any) => {
                    const check = await handlePaintingPo(item.TestNo)
                    return {
                        _id: index + 1,
                        ...item,
                        check: check,
                        Modify_Date: moment(item.Modify_Date).format("DD/MM/YYYY HH:mm:ss")
                    }

                })
            )
            console.log("hung", list_data)
            setData(list_data);
            setMergeNo("");
        } catch (error) {
            console.error("error in handleMergeNoToPOno", error)
        } finally{
            setDisable(false)
        }

    }
    // hàm xử lý các test no khi scan vào bảng
    const addPoNo = (prev: any[], newItem: any): any[] => {
        // Tìm xem đã có phần tử nào trong mảng trong không, nếu ko có trả về -1
        const existingItemIndex = prev.findIndex(
            (item) => item.TestNo === newItem.TestNo
        );
        setValueScan("")

        // Nếu khác -1 thì gom hàng
        if (existingItemIndex === -1) {
            return [...prev, newItem];
        }
        else {
            const updatedArray = [...prev];
            updatedArray.splice(existingItemIndex, 1); // Xóa phần tử cũ
            updatedArray.push(newItem); // Thêm phần tử mới
            return updatedArray;
        }
    };
    const scanPoNo = async (value: any) => {
        setDisable(true);
        const infoPO = await fromPOgetTestNoVersion(value)
        const result = await checkCreateSlip(infoPO?.PONO?.trim())
        if (result) {
            handleOpenConfirm("no-create")
            setDisable(false);
        }
        else {
            const url = connect_string + "api/Create_Merge_Bom";
            const dataPoNo = {
                User_WH: dataUser[0].UserId,
                Po_No: infoPO?.PONO?.trim() || "",
                TestNo: [infoPO?.TestNo?.trim() || ""],
                Version: infoPO?.Version?.trim() || "",
            };

            try {
                const res = await axios.post(url, dataPoNo);
                if (res?.data?.TestNo !== null) {

                    const checkKFJDAndJiJie = data.some(
                        (item: any) => item.KFJD === res?.data?.KFJD && item.JiJie === res?.data?.JiJie
                    );

                    if (checkKFJDAndJiJie || data.length === 0) {

                        const _id = Math.floor(Math.random() * 10000000) + 1;

                        const check = res.data?.YPZLBH === "" ? false : await handlePaintingPo(res.data?.TestNo)
                        const newItem = {
                            ...res.data,
                            _id: _id,
                            Modify_Date: moment(res.data.Modify_Date).format("DD/MM/YYYY HH:mm:ss"),
                            check: check,
                        };
                        setData((prev: any[]) => addPoNo(prev, newItem));

                    } else {
                        handleOpenConfirm("no-KFJD-JiJie");
                    }
                    setValueScan("");
                }
            } catch (error) {
                console.error("Error in scanPoNo:", error);
            } finally {
                setDisable(false);
            }
        }

    }
    const handleDeleteRow = () => {

    }
    const handleScan = async (result: any | null) => {
        if (result || result.text) {
            setValueScan(result.text)
            // setModalScan(false)
        }

    }
    return (
        <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            slotProps={{
                backdrop: {
                    style: {
                        backdropFilter: "blur(2px)",
                    },
                },
            }}
        >
            <Box sx={style}>
                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} style={{ borderBottom: '1px solid gray' }}>
                    {/* Nút back */}
                    <IconButton className={'back-button'} onClick={onClose}>
                        <BiArrowBack className=" icon-wrapper" />
                    </IconButton>
                    {/* Tittle */}
                    <Typography variant="h5" component="h5" color={'white'}>{t("btnCreateBOM")}</Typography>
                    {/* Camera */}
                    <IconButton sx={{ marginLeft: '20px' }}  >
                        <CameraAltIcon onClick={handleScanClick} />
                    </IconButton>
                </Stack>
                <Stack flex={1}>
                    <Grid container padding={'10px'}>
                        <Grid item display={'flex'} xs={3}>
                            {/* Scan xuất */}
                            <InputFieldV1
                                xsLabel={2}
                                xsInput={8}
                                label={t("gpbScan") as string}
                                disable={disable}
                                value={valueScan}
                                handle={handleValueScanChange}
                            />
                        </Grid>
                        <Grid item display={'flex'} xs={3}>
                            {/* Merge No */}
                            <InputFieldV1
                                xsLabel={4}
                                xsInput={8}
                                label={"Merge No"}
                                disable={disable}
                                value={mergeNo}
                                handle={handleMergeNoChange}
                            />
                        </Grid>
                        <Grid item display={'flex'} xs={1.5} justifyContent={'center'}>
                            {/* Nút tìm kiếm */}
                            <MyButton height='2rem' name={t('btnSearch')} onClick={handleMergeNoToPono} disabled={disable} />
                        </Grid>
                        <Grid item display={'flex'} xs={1.5} justifyContent={'center'}>
                            {/* Nút xóa */}
                            <MyButton height='2rem' name={t('btnDelete')} onClick={handleDeleteRow} disabled={disable} />
                        </Grid>
                        <Grid item display={'flex'} xs={1.5} justifyContent={'center'}>
                            {/* Nút lamf mới */}
                            <MyButton height='2rem' name={t('btnClean')} onClick={() => setData([])} disabled={disable} />

                        </Grid>

                    </Grid>
                    <Stack sx={{ height: '100%' }}>
                        <Stack overflow={"hidden"}
                            sx={{ height: '100%' }}>
                            {/* Bảng */}
                            <MyTableNew
                                columns={columns}
                                rows={data}
                                checkBox={false}
                                handlerowClick={handleRowClick}
                                onClickButton={handleOnClickBtn}
                                paintingRow={paintingRow}
                            />
                        </Stack>
                        <Stack alignItems={'flex-end'} padding={'10px'}>
                            <Stack flexDirection={"row"} justifyContent={'flex-end'} width={'100%'} >
                                {/* In toàn bộ tem thông tin */}
                                {/* <MyButton height='2rem' name={t('rbtPrint_All')} onClick={handlePrintAll} disabled={disable} /> */}
                                {/* Tạo BOM */}
                                <MyButton height='2rem' name={t('btnCreateBOM')} onClick={createBOM} disabled={disable} />
                            </Stack>
                        </Stack>

                    </Stack>
                    {modalScan && <QRScanner onScan={handleScan} open={modalScan} onClose={() => { setModalScan(false); }} />}

                    {/* Loading khi tạo phiếu */}
                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={disable}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>

                </Stack>
                {cofirmType === "detail-merge-bom" && <DetailMergeBOM item={itemRowMergeBom} open={openCofirm} onClose={handleCloseConfirm} />}

            </Box>

        </Modal>
    )
}

export default CreateMergeBom