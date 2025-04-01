//#region import
import { Stack, Grid, Typography, Modal, Box, FormControlLabel, Radio, FormControl, RadioGroup, Checkbox, FormGroup, IconButton } from '@mui/material'
import InputField from '../../../components/InputField'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux';
import './styles.scss'
import MyButton from '../../../components/MyButton';
import { config } from '../../../utils/api';
import { checkPermissionPrint } from "../../LoginScreen/ChooseFactory";
import { connect_string } from '../../LoginScreen/ChooseFactory';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import { addItemArrayStockout } from '../../../redux/ArrayStockout';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { BiArrowBack } from 'react-icons/bi';
import moment from 'moment';
import { styletext } from '../StockinForm';
import ModalCofirm from '../../../components/ModalConfirm';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import QRScanner from '../../../components/QRScanner';
import { successSound } from '../../../utils/pathsound';
import { addTotalQtyOut } from '../../../redux/TotalQtyOut';
import Decimal from 'decimal.js';
import { set } from 'lodash';
import FormConfirmMaterial from '../../../components/FormConfirmMaterial';
import { debounce } from '../../../utils/debounce';
import useDebounced from '../../../components/CustomHook/useDebounce';
//#endregion
function ImportAndExport({ open, onClose, form, dataColor }: { open: any, onClose: any, form: any, dataColor?: any }) {
  const dispatch = useDispatch()
  const { t } = useTranslation();

  //#region Style
  const style = {
    position: 'absolute',
    top: '55%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    "@media screen and (max-width: 1200px)": {
      width: "70%",
      top: '62%',
    },
    height: '60%',
    bgcolor: '#1c2538',
    border: '2px solid white',
    borderRadius: 3,
    boxShadow: 24,
    p: 2,
  };
  //#endregion

  //#region useSelector
  const dataUser = useSelector((state: any) => state.UserLogin.user);
  const dataFOC = useSelector((state: any) => state.FOC.foc);
  //#endregion

  //#region Variable
  const [isloading, setIsLoading] = useState(false)
  const [value, setValue] = useState('female');
  const [scanqr, setScanQR] = useState('')
  const [Barcode, setBarcode] = useState('')
  const [MaterialNo, setMaterialNo] = useState('')
  const [MaterialName, setMaterialName] = useState('')
  const [QTY, setQTY] = useState<number>(0)
  const [Value_Total_Qty, setValue_Total_Qty] = useState<number>(0)
  const [Unit, setUnit] = useState('')
  const [qtyout, setQtyOut] = useState<number>(0)
  const [chxAll, setchxAll] = useState(true)
  const [disable, setDisable] = useState(false)
  const [openCofirm, setOpenCofirm] = useState(false)
  const [cofirmType, setCofirmType] = useState('')
  const [mode, setMode] = useState(false)
  const [modalScan, setModalScan] = useState(false)
  const [qtyRemain, setQtyRemain] = useState(0)
  const [chxpair, setChxPair] = useState(false)
  const [title, setTitle] = useState<any>('')
  const [message, setMessage] = useState('')
  const [chxPrint, setchxPrint] = useState(false)

  //#endregion

  //#region Func OnChange Input
  const handleQtyRemain = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQtyRemain(event.target.valueAsNumber);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  const handleScanQr = (event: React.ChangeEvent<HTMLInputElement>) => {
    setScanQR(event.target.value);
  };

  const handleQtyOut = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQtyOut = event.target.valueAsNumber;
    setQtyOut(newQtyOut);
  }

  const handlechxALL = (event: React.ChangeEvent<HTMLInputElement>) => {
    setchxAll(event.target.checked);
  };

  const handlechxPair = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChxPair(event.target.checked);
  };

  const handlechxPrint = (event: React.ChangeEvent<HTMLInputElement>) => {
    setchxPrint(event.target.checked);
  };
  //#endregion

  //#region useEffect

  // useEffect(() => {
  //     //     //#region Nhập cải thiện
  //     //     // if (scanqr.length >= 15) {
  //     //     //     if (form === 'stockout') {
  //     //     //         checkMaterial(scanqr).then(result => {
  //     //     //             if (result == true) {
  //     //     //                 handleOpenConfirm('notify-reject-material')
  //     //     //             }
  //     //     //             else (
  //     //     //                 ScanQR()
  //     //     //             )
  //     //     //         })
  //     //     //     }
  //     //     //     else {
  //     //     //         ScanQR()
  //     //     //     }
  //     //     // }
  //     //     //#endregion
  //     //     // Bản cũ
  //     //Debounced
  //     const handleTextChange = setTimeout(() => {
  //         if (scanqr.length >= 15) {
  //             ScanQR(scanqr)
  //         }
  //     }, 1000)

  //     return () => clearTimeout(handleTextChange)
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [scanqr])

  const debouncedSearchTerm = useDebounced(scanqr, 0);
  useEffect(() => {
    //Phiên bản có kiểm tra chất lượng vật tư
    if (dataUser[0].factoryName === "LYV" && dataUser[0].WareHouse === "Sample") {
      if (debouncedSearchTerm.length >= 15) {
        ScanQR(debouncedSearchTerm)
      }
    }
    else {
      if (
        dataUser[0].factoryName !== "LYM"
      ) {
        if (debouncedSearchTerm.length >= 15) {
          checkMaterial(debouncedSearchTerm).then(result => {
            if (result !== "") {
              setMessage(result)
              handleOpenConfirm('notify-reject-material')
            }
            else (
              ScanQR(debouncedSearchTerm)
            )
          })
        }
      }
      else {
        if (debouncedSearchTerm.length >= 15) {
          ScanQR(debouncedSearchTerm)
        }
      }
    }

  }, [debouncedSearchTerm]);

  useEffect(() => {
    if (form !== 'stockout') {
      const result = new Decimal(QTY).plus(qtyout).toNumber();
      setQtyRemain(result)
    }
  }, [qtyout])
  //#endregion

  //#region Func Logic
  // const onPressOK = (params: any) => {
  //     if (params !== "") {
  //         if (params !== "") {
  //             const url = connect_string + "api/Confirm_QC_Check_Fail"
  //             const data = {
  //                 user_id: dataUser[0].UserId,
  //                 Barcode: scanqr,
  //                 Conntent_Input: params
  //             }
  //             axios.post(url, data, config).then(response => {
  //                 if (response.data === true) {
  //                     handleCloseConfirm()
  //                     ScanQR()
  //                 }
  //                 else {
  //                     handleOpenConfirm('network-error');
  //                 }
  //             }).catch(() => {
  //                 handleOpenConfirm('network-error');
  //             })
  //         }

  //     }
  // }

  const onPressCancel = () => {
    handleCloseConfirm()
    setScanQR('')
    setBarcode('')
    setMaterialNo('')
    setMaterialName('')
    setQTY(0)
    setUnit('')
    setValue_Total_Qty(0)
  }

  const handleOpenConfirm = (confirmName: string) => {
    setCofirmType(confirmName)
    setOpenCofirm(true)
  }
  const handleCloseConfirm = () => {
    setCofirmType('')
    setOpenCofirm(false)
  }

  const calculateRemainingQty = () => {
    const remainingQty = new Decimal(QTY).minus(qtyout).toNumber();
    return remainingQty >= 0 ? Number(remainingQty) : 0;
  };

  const calculateQtyOut = () => {
    if (form === 'stockout') {
      if (qtyout >= QTY) {
        return QTY
      }
      else if (qtyout < QTY && qtyout >= 0) {
        return qtyout
      }
      else {
        return ''
      }
    }
    else {
      // if(Number(QTY) + Number(qtyout) >= Value_Total_Qty){
      //     return ''
      // }
    }
  }

  const ScanQR = (value_scan: string) => {
    // if (form === 'stockout') {
    setQtyOut(0)
    setIsLoading(true)
    setDisable(true)
    const url = connect_string + 'api/txtScan_TextChanged'
    const data = {
      txtScan: value_scan,
      rbtImport: false,
      rbtExport: true,
      User_Serial_Key: dataUser[0].UserId
    }
    axios.post(url, data, config).then(response => {
      if (response.data.MaterialNo !== null) {
        setBarcode(response.data.Value_Barcode)
        setMaterialNo(response.data.MaterialNo)
        setMaterialName(response.data.MaterialName)
        setQTY(response.data.QTY)
        setUnit(response.data.Unit)
        setValue_Total_Qty(response.data.Value_Total_Qty)
        setScanQR('')
      }
      else {
        setBarcode('')
        setMaterialNo('')
        setMaterialName('')
        setQTY(0)
        setUnit('')
        setValue_Total_Qty(0)
      }
    }).finally(() => {
      setIsLoading(false)
      setDisable(false)
    })
    // }
  }

  const SavePartial = async () => {
    let flat = false
    if (dataUser[0].WareHouse === "Sample" && chxPrint === false) {
      flat = true
    }
    else {
      flat = await checkPermissionPrint(dataUser[0].UserId)
    }

    if (flat) {
      // Xuất tách tem
      if (form === 'stockout') {
        setIsLoading(true)
        setDisable(true)
        const url = connect_string + 'api/btn_Save_Partial'
        const data = {
          rbtImport: false,
          rbtExport: true,
          txtQty_Input: qtyout >= QTY ? Number(QTY) : qtyout,
          Value_Barcode: Barcode,
          txtQty_Remain: calculateRemainingQty(),
          Value_Unit: Unit,
          txtScan: Barcode,
          User_Serial_Key: dataUser[0].UserId,
          chxAll: (dataUser[0].factoryName === "LYV" && dataUser[0].WareHouse === "Sample") ? chxPrint : chxAll,
          chxpair: chxpair,
          get_version: dataFOC === true ? "FOC" : dataUser[0].WareHouse,
          Value_Remain: dataColor.Value_Remain === "" ? 0 : dataColor.Value_Remain,
          chxColor: dataColor.chxColor,
          rbtColor_A: dataColor.rbtColor_A,
          rbtColor_B: dataColor.rbtColor_B,
          rbtColor_C: dataColor.rbtColor_C,
          rbtColor_D: dataColor.rbtColor_D,
          rbtColor_E: dataColor.rbtColor_E,
          rbtColor_F: dataColor.rbtColor_F,
          rbtColor_G: dataColor.rbtColor_G,
          rbtColor_H: dataColor.rbtColor_H,
          rbtColor_O: dataColor.rbtColor_O,
          Check_ScanMore: false,
          chxPrint: chxPrint

        }
        axios.post(url, data, config).then(response => {
          const item = response.data;
          if (item.Barcode !== null) {
            const newItem = {
              _id: item.Barcode,
              Barcode: item.Barcode,
              Material_No: item.Material_No,
              Supplier: item.Supplier,
              Material_Name: item.Material_Name,
              Color: item.colorValue,
              Size: item.Size,
              QTY: item.QTY,
              Print_QTY: item.Print_QTY,
              Order_No: item.Order_No,
              Roll: item.Roll,
              Production: item.Production,
              Supplier_No: item.Supplier_No,
              Work_Order: item.Work_Order,
              Modify_Date: moment(item.Modify_Date).format("DD/MM/YYYY"),
              User_Serial_Key: item.User_Serial_Key,
              Value_Total: item.Value_Total,
              Material_Label_Serial: item.Material_Label_Serial,
            };
            dispatch(addItemArrayStockout(newItem))
            dispatch(addTotalQtyOut(response.data.Value_Qty_Out))
            setScanQR(Barcode)
            // handleOpenConfirm('ok')
          }
          else {
            handleOpenConfirm('materialOut')
          }
        }).finally(() => {
          setIsLoading(false)
          setDisable(false)
        })
      }
      // Nhập số lượng trong tem
      else {
        setIsLoading(true)
        setDisable(true)
        const remainingQty = new Decimal(QTY).plus(qtyout).toNumber();
        const url = connect_string + 'api/btn_Save_Partial'
        const data = {
          rbtImport: true,
          rbtExport: false,
          txtQty_Input: remainingQty >= Value_Total_Qty ? 0 : qtyout,
          Value_Barcode: Barcode,
          txtQty_Remain: qtyRemain,
          Value_Unit: Unit,
          txtScan: Barcode,
          User_Serial_Key: dataUser[0].UserId,
          chxAll: chxAll,
          get_version: dataUser[0].WareHouse

        }
        axios.post(url, data, config).then(response => {
          const item = response.data;
          if (item.Barcode !== null) {

            const newItem = {
              _id: item.Barcode,
              Barcode: item.Barcode,
              Material_No: item.Material_No,
              Supplier: item.Supplier,
              Material_Name: item.Material_Name,
              Color: item.Color,
              Size: item.Size,
              QTY: item.QTY,
              Print_QTY: item.Print_QTY,
              Order_No: item.Order_No,
              Roll: item.Roll,
              Production: item.Production,
              Supplier_No: item.Supplier_No,
              Work_Order: item.Work_Order,
              ngay: moment(item.Modify_Date).format("DD/MM/YYYY"),
              User_Serial_Key: item.User_Serial_Key,
              Value_Total: item.Value_Total,
              Material_Label_Serial: item.Material_Label_Serial,
            };
            setQTY(newItem.QTY)
            setValue_Total_Qty(value => new Decimal(value).minus(qtyout).toNumber())

            // dispatch(addItemArrayStockout(newItem))
            setScanQR(Barcode)
            // handleOpenConfirm('ok')
          }
          else {
            handleOpenConfirm('materialOut')
          }
        }).finally(() => {
          setIsLoading(false)
          setDisable(false)
        })
      }
    }
    else {
      handleOpenConfirm('print-permission')
    }

  }

  const handleScanClick = () => {
    setMode(true);
    setModalScan(true);
  }

  const handleScan = async (result: any | null) => {

    if (result || result.text) {
      setScanQR(result.text)
      // setModalScan(false)
      modalScan && successSound.play();
    }
  }

  function checkMaterial(barcode: string): Promise<any> {

    const url = connect_string + "api/QC_Check_Marterial";
    const data = {
      user_id: dataUser[0].UserId,
      Barcode: barcode
    };

    return new Promise((resolve, reject) => {
      axios.post(url, data, config)
        .then(response => {
          resolve(response.data); // Trả về dữ liệu từ response
          setTitle(response.data)
        })
        .catch(error => {

          handleOpenConfirm('network-error');
          reject(error); // Reject với lỗi nếu có lỗi xảy ra
        })
    });
  }

  //#endregion
  return (
    <Modal
      open={open}
      // onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Stack height={'100%'}>
          <Stack height={'10%'} direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
            {/* Nút back */}
            <IconButton className={'back-button'} onClick={onClose}>
              <BiArrowBack className="icon-wrapper" />
            </IconButton>
            {/* Title */}
            <Typography variant="h5" component="h5" color={'white'}>{t('frmData_Warehousing')}</Typography>
            {/* Camera */}
            <IconButton sx={{ marginLeft: '20px' }}  >
              <CameraAltIcon onClick={handleScanClick} />
            </IconButton>
          </Stack>
          <Stack height={'90%'} direction={'row'}>
            <Stack width={'45%'}>
              <Grid container height={'90%'} alignItems={'center'}>
                {/* Radio Nhập, Xuất */}
                <Grid item xs={12}>
                  <FormControl>
                    <RadioGroup
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                      value={value}
                      onChange={handleChange}
                      sx={{ display: 'flex', flexDirection: 'row' }}
                    >
                      {
                        form === 'stockin' ?
                          <>
                            <FormControlLabel sx={styletext} value="import" control={<Radio checked />} label={t("dcpImport") as string} />
                            <FormControlLabel sx={styletext} value="export" disabled control={<Radio />} label={t("dcpExport") as string} />
                          </>
                          :
                          <>
                            <FormControlLabel sx={styletext} value="import" disabled control={<Radio />} label={t("dcpImport") as string} />
                            <FormControlLabel sx={styletext} value="export" control={<Radio checked />} label={t("dcpExport") as string} />
                          </>
                      }
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid container>
                  {/* Mã QR */}
                  <Grid item xs={4.5}>
                    <Typography className='textsize'>{t("dcpBarcode") as string}</Typography>
                  </Grid>
                  {/* Chỗ hiện mã QR */}
                  <Grid item xs={7.5} className='input_label'>
                    <Typography className='_text'>{Barcode}</Typography>
                  </Grid>
                </Grid>
                <Grid container>
                  {/* Mã vật tư */}
                  <Grid item xs={4.5}>
                    <Typography className='textsize'>{t("dcpMaterial_No") as string}</Typography>
                  </Grid>
                  {/* Chỗ hiện mã vật tư */}
                  <Grid item xs={7.5} className='input_label'>
                    <Typography className='_text'>{MaterialNo}</Typography>
                  </Grid>
                </Grid>
                <Grid container >
                  {/* Tên vật tư */}
                  <Grid item xs={4.5}>
                    <Typography className='textsize'>{t("lblMaterial_Name") as string}</Typography>
                  </Grid>
                  {/* Chỗ hiện tên vật tư */}
                  <Grid item xs={7.5} className='input_label' >
                    <Typography className='_text' overflow={'hidden'} textOverflow={'ellipsis'}>{MaterialName}</Typography>
                  </Grid>
                </Grid>
                <Grid container>
                  {/* Tổng sản lượng */}
                  <Grid item xs={4.5}>
                    <Typography className='textsize'>{t("lblQtyTotal") as string}</Typography>
                  </Grid>
                  {/* Chỗ hiện tổng sản lượng */}
                  <Grid item xs={7.5} className='input_label'>
                    <Typography className='_text'>{QTY === 0 ? '' : QTY}</Typography>
                  </Grid>
                </Grid>
                <Grid container>
                  {/* Đơn vị */}
                  <Grid item xs={4.5}>
                    <Typography className='textsize'>{t("lblUnit") as string}</Typography>
                  </Grid>
                  {/* Chỗ hiện đơn vị */}
                  <Grid item xs={7.5} className='input_label'>
                    <Typography className='_text'>{Unit}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Stack>
            <Stack width={'55%'}>
              <Grid container height={'90%'} width={'100%'} alignItems={'center'}>
                {/* Quét */}
                <Grid container >
                  <Grid item xs={12} justifyContent={'flex-end'} className='input_label' sx={{ display: 'flex' }}>
                    <InputField focus={true} label={t("gpbScan") as string} handle={handleScanQr} keydown={null} value={scanqr} disable={false} />
                  </Grid>
                </Grid>
                <Grid item xs={12}></Grid>
                <Grid container sx={{ display: 'flex' }}>
                  {/* Chỗ hiện thị số lượng quét */}
                  <Grid item xs={12} display={'flex'} justifyContent={'flex-end'}>
                    <Typography textAlign={'end'} marginRight={'16px'} className='_text'>
                      {
                        form === 'stockout'
                          ?
                          QTY === 0 ? '' : QTY
                          :
                          Value_Total_Qty
                      }
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={12}></Grid>
                <Grid container >
                  {/* Số lượng */}
                  <Grid item xs={12} justifyContent={'flex-end'} className='input_label' sx={{ display: 'flex' }}>
                    <InputField label={t("dcmQTY") as string} handle={handleQtyOut} keydown={null} value={calculateQtyOut()} type='number' disable={false} />
                  </Grid>
                </Grid>
                <Grid container >
                  {/* Còn lại */}
                  <Grid item xs={12} justifyContent={'flex-end'} className='input_label' sx={{ display: 'flex' }}>
                    <InputField label={t("lblQty_Remain") as string} handle={form !== 'stockout' && handleQtyRemain} keydown={null} value={form === 'stockout' ? calculateRemainingQty() : qtyRemain} type='number' disable={form === "stockout" ? true : false} />
                  </Grid>
                </Grid>
                <Grid container >
                  <Grid item xs={12} display={'flex'} justifyContent={'flex-end'} paddingLeft={'20px'}>
                    <Box display={'flex'} width={'22rem'} marginRight={'16px'} justifyContent={'space-between'} alignItems={'center'}>
                      {/* Check tất cả */}
                      {/* Check tất cả */}
                      {
                        (form === "stockout" && dataUser[0].WareHouse === "Sample" && dataUser[0].factoryName === "LYV")
                          ?
                          (
                            <></>
                          )
                          :
                          (
                            <FormGroup>
                              <FormControlLabel sx={styletext} control={<Checkbox sx={{ color: 'white' }} value={chxAll} defaultChecked onChange={handlechxALL} />} label={t("chxAll") as string} />
                            </FormGroup>

                          )
                      }


                      {
                        // Check đôi
                        (form === "stockout" && dataUser[0].WareHouse !== "Sample") &&
                        (
                          <FormGroup>
                            <FormControlLabel sx={styletext} control={<Checkbox sx={{ color: 'white' }} value={chxpair} onChange={handlechxPair} />} label={t("chxPair")} />
                          </FormGroup>
                        )
                      }
                      {
                        // Check In
                        (form === "stockout" && dataUser[0].WareHouse === "Sample") &&
                        (
                          <FormGroup>
                            <FormControlLabel sx={styletext} control={<Checkbox sx={{ color: 'white' }} checked={chxPrint} onChange={handlechxPrint} />} label={t("btnPrint")} />
                          </FormGroup>
                        )
                      }

                      {isloading && <CircularProgress size={'25px'} color="info" />}
                      {/* Nút lưu */}
                      <MyButton name={t("btnSave") as string} onClick={SavePartial} disabled={disable} />
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Stack>
          </Stack>
        </Stack>
        {cofirmType === 'ok' && <ModalCofirm onPressOK={handleCloseConfirm} open={openCofirm} onClose={handleCloseConfirm} title={t("msgExportSuccess") as string} />}
        {cofirmType === 'print-permission' && <ModalCofirm onPressOK={handleCloseConfirm} open={openCofirm} onClose={handleCloseConfirm} title={t("lblPrintPermission") as string} />}
        {modalScan && <QRScanner onScan={handleScan} open={modalScan} onClose={() => { setModalScan(false); setMode(false); }} />}
        {cofirmType === 'materialOut' && <ModalCofirm onPressOK={handleCloseConfirm} open={openCofirm} onClose={handleCloseConfirm} title={t("msgExistingMaterialExport") as string} />}
        {cofirmType === 'notify-reject-material' && <ModalCofirm showOk={false} onPressOK={onPressCancel} open={openCofirm} onClose={onPressCancel} title={message} />}
        {cofirmType === 'confirm-Material' && <FormConfirmMaterial data={[]} open={openCofirm} onClose={handleCloseConfirm} qrcodeScan={""} />}            </Box>
    </Modal >
  )
}

export default ImportAndExport