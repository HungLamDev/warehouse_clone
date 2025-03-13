import './style.scss'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import FullScreenContainerWithNavBar from '../../../components/FullScreenContainerWithNavBar';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { BiBorderRadius } from 'react-icons/bi';
import InputFieldV1 from '../../../components/InputField/index_new';
import { GridColDef } from '@mui/x-data-grid';
import useMediaQuery from '@mui/material/useMediaQuery';
import moment from 'moment';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import DatePickerFieldV1 from '../../../components/DatePickerField/index_new';
import { styletext } from '../../../components/StockinScreenv2/StockinForm';
import MyButton from '../../../components/MyButton';
const RegisterLabel = () => {

  const { t } = useTranslation();
  const dataUser = useSelector((state: any) => state.UserLogin.user);

  const columnsLeftRight: GridColDef[] = [
    {
      field: "STT",
      headerName: "",
      align: "center",
      headerAlign: 'center',
      width: 180,

    },
    {
      field: "Barcode",
      headerName: t("dcpBarcode") as string,
      align: "center",
      headerAlign: 'center',
      width: 180,

    },
    {
      field: "Material_No",
      headerName: t("dcpMaterial_No") as string,
      align: "center",
      headerAlign: 'center',
      width: 150,

    },
    {
      field: "Print_QTY",
      headerName: t("dcpQty_ROLL") as string,
      align: "center",
      headerAlign: 'center',
      width: 150,
    },
    {
      field: "QTY",
      headerName: t("dcpQTY") as string,
      align: "center",
      headerAlign: 'center',
      width: 150,

    },
    {
      field: "Order_No",
      headerName: t("lblOrderNo") as string,
      align: "center",
      headerAlign: 'center',
      width: 150,

    },
    {
      field: "Roll",
      headerName: t("dcmRoll") as string,
      align: "center",
      headerAlign: 'center',
    },
    {
      field: "Print_Date",
      headerName: t("dcpDate") as string,
      align: "center",
      headerAlign: 'center',
      width: 150,

    },
    {
      field: "Work_Order",
      headerName: t("dcpWork_Order") as string,
      align: "center",
      headerAlign: 'center',
      width: 150,

    },
  ];
 // #region Func OnChange Input
  const handleOrderNo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOrderNo(event.target.value);
  };
  const handleOrderNoRegister = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOrderNoRegister(event.target.value);
  };
  const handleMaterialNo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaterialNo(event.target.value);
  };
  const handleRY = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRY(event.target.value);
  };
  const handleChxDatePrint = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChxDatePrint(event.target.checked);
  };
  const handleChxDatePrintRegister = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChxDatePrintRegister(event.target.checked);
  };
  const handleChxFind = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChxFind(event.target.checked);
    if (event.target.checked === true) {
      Find()
    }
  };

  //#endregion

  const isScreenLarge = useMediaQuery('(min-width:1000px)')
  const [chxFind, setChxFind] = useState(false)
  const [openCofirm, setOpenCofirm] = useState(false)
  const [cofirmType, setCofirmType] = useState('')
  const [disable, setDisable] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [orderNo, setOrderNo] = useState('')
  const [orderNoRegister, setOrderNoRegister] = useState('')
  const [materialNo, setMaterialNo] = useState('')
  const [ry, setRY] = useState('')
  const [chxDatePrint, setChxDatePrint] = useState(false)
  const [chxDatePrintRegister, setChxDatePrintRegister] = useState(true)
  const [datePrint, setDatePrint] = useState(moment().format("YYYY-MM-DD"))
  const [datePrintRegister, setDatePrintRegister] = useState(moment().format("YYYY-MM-DD"))
  const [listDataLeft, setListDataLeft] = useState([])
  const [listDataRight, setListDataRight] = useState([])
  const [listDataLeftCheck, setListDataLeftCheck] = useState([])
  const [listDataRightCheck, setListDataRightCheck] = useState([])

  const handleOpenConfirm = (confirmName: string) => {
    setCofirmType(confirmName)
    setOpenCofirm(true)
  }
  const handleCloseConfirm = () => {
    setCofirmType('')
    setOpenCofirm(false)
  }
  const Search = () => {

  }
  const Refresh = () => {
    setListDataLeft([])
    setListDataRight([])
  }
  const Register = () => {

  }
  const handlePrint = async () => {

  }
  const handlePrintok = () => {

  }
  const Find = () => {

  }
  return (
    <FullScreenContainerWithNavBar sideBarDisable={true} sideBarNavigate="" title={t('lblData_Register_Print_Lable')} navigate="/stamp-print">
      < Stack height={'35%'}>
        <Box paddingX={1}
          className={"dark-bgsecondary border-bottom-white"}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            flexDirection: 'column',
            gap: '10px'
          }}>
          <Grid container width={'80%'} rowGap={1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Grid item xs={6}>
              {/* số phiếu */}
              <InputFieldV1

                focus={true}
                label={t("dcmOrder_No") as string}
                value={orderNo}
                handle={handleOrderNo}
                keydown={null}
                disable={disable}
                xsLabel={5.5}
                xsInput={5.5}
              />
            </Grid>
            {/* đơn hàng đăng ký */}
            <Grid item xs={6}>
              <InputFieldV1
                label={t("lblOrderNo_Register") as string}
                value={orderNoRegister}
                handle={handleOrderNoRegister}
                keydown={null}
                disable={disable}
                xsLabel={5.5}
                xsInput={5.5}
              />
            </Grid>
            {/* Mã vật tư  */}
            <Grid item xs={6}>
              <InputFieldV1
                label={t("dcpMaterial_No") as string}
                value={materialNo}
                handle={handleMaterialNo}
                keydown={null}
                disable={disable}
                xsLabel={5.5}
                xsInput={5.5}
              />
            </Grid>
            {/* RY  */}
            <Grid item xs={6}>
              <InputFieldV1
                label={t("lblRY") as string}
                value={ry}
                handle={handleRY}
                keydown={null}
                disable={disable}
                xsLabel={5.5}
                xsInput={5.5}
              />
            </Grid>
            <Grid item xs={2.75}>
              {/* check ngày in  */}
              <FormControlLabel
                sx={styletext}
                control={<Checkbox value={chxDatePrint} onChange={handleChxDatePrint} />}
                label={t("chxPrint_Date")}
              />
            </Grid>
            <Grid item xs={3.25}>
              {/* chọn ngày in   */}
              <DatePickerFieldV1
                valueDate={(params: any) => {
                  setDatePrint(params);
                }}
                xsDate={10.25}
                xsLabel={0}
              />
            </Grid>
            <Grid item xs={2.75}>
              {/* check ngày đăng ký    */}
              <FormControlLabel
                sx={styletext}
                control={<Checkbox defaultChecked value={chxDatePrintRegister} onChange={handleChxDatePrintRegister} />}
                label={t("chxRegister_Date")}
              />
            </Grid>
            <Grid item xs={3.25}>
              {/* chọn ngày đăng ký    */}
              <DatePickerFieldV1
                valueDate={(params: any) => {
                  setDatePrintRegister(params);
                }}
                xsDate={10.25}
                xsLabel={0}

              />
            </Grid>
          </Grid>
          <Grid container justifyContent={'center'} columnGap={'15px'}>
            <Grid item xs={0.5}></Grid>
            {/* Tìm kiếm */}
            <Grid item display={'flex'}>
              <MyButton name={t("btnSearch") as string} onClick={Search} disabled={disable} />
            </Grid>
            {/* Làm mới */}
            <Grid item display={'flex'}>
              <MyButton name={t("btnClean") as string} onClick={Refresh} disabled={disable} />
            </Grid>
            {/* Đăng ký */}
            <Grid item display={'flex'}>

            </Grid>
            {/* In*/}
            <Grid item display={'flex'}>

            </Grid>
            {/* Tìm lại */}
            <Grid item display={'flex'}>
              <FormControlLabel
                sx={styletext}
                control={<Checkbox value={chxFind} onChange={handleChxFind} />}
                label={t("lblFindAgain")}
              />
            </Grid>
            <Grid item xs={0.5} display={'flex'}></Grid>

          </Grid>
        </Box>
      </Stack>
      <Stack height={'65%'} direction={'row'} overflow={'hidde '}>
        <Stack width={'50%'} borderRadius={'1px solid white'}>

        </Stack>
        <Stack width={'50%'} borderRadius={'1px solid white'}></Stack>
      </Stack>

    </FullScreenContainerWithNavBar>
  )
}

export default RegisterLabel
