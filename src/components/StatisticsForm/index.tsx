import { Box, CircularProgress, Grid, IconButton, Modal, Stack, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { BiArrowBack } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import TableOrigin from '../TableOrigin';
import QRScanner from '../QRScanner';
import ModalCofirm from '../ModalConfirm';
import InputField from '../InputField';
import Decimal from 'decimal.js';
import axios from 'axios';
import { connect_string } from '../../screens/LoginScreen/ChooseFactory';
import { config } from '../../../src/utils/api';
import { successSound } from '../../utils/pathsound';
import useDebounced from '../CustomHook/useDebounce';

const Statistics = ({ open, onClose, materialNo }: { open: any, onClose: any, materialNo?: string }) => {
  const { t } = useTranslation();
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
  };

  const columns: GridColDef[] = [
    {
      field: 'Barcode',
      headerName: t("dcpBarcode") as string,
      width: 160,
      headerClassName: 'custom-header'
    },
    {
      field: 'Material_No',
      headerName: t("dcpMaterial_No") as string,
      width: 150,
      editable: true,
      headerClassName: 'custom-header'
    },
    {
      field: 'Rack',
      headerName: t("dcpRack") as string,
      width: 160,
      headerClassName: 'custom-header'
    },
    {
      field: 'Supplier',
      headerName: t("dcpSupplier") as string,
      width: 160,
      headerClassName: 'custom-header'
    },
    {
      field: 'Material_Name',
      headerName: t("dcpMaterial_Name") as string,
      width: 160,
      headerClassName: 'custom-header'
    },
    {
      field: 'Color',
      headerName: t("dcpColor") as string,
      width: 300,
      headerClassName: 'custom-header'
    },
    {
      field: 'QTY',
      headerName: t("dcpQTY") as string,
      width: 160,
      headerClassName: 'custom-header'
    },
    {
      field: 'Order_No',
      headerName: t("dcpOrder_No") as string,
      width: 160,
      headerClassName: 'custom-header'
    },
    {
      field: 'Roll',
      headerName: t("dcpRoll") as string,
      width: 160,
      headerClassName: 'custom-header'
    },
    {
      field: 'User_Serial_Key',
      headerName: t("dcpUser_Name") as string,
      width: 160,
      headerClassName: 'custom-header'
    },
    {
      field: 'Total_QTY',
      headerName: t("lblQtyTotal") as string,
      width: 160,
      headerClassName: 'custom-header'
    },
  ];

  const dataUser = useSelector((state: any) => state.UserLogin.user);
  const dataFOC = useSelector((state: any) => state.FOC.foc);

  const MaterialNo = materialNo ? materialNo : "";
  const [txtscan, setTxtScan] = useState(MaterialNo)
  const [arrayRowUps, setArrayRowUps] = useState<any[]>([])
  const [arrayRowDowns, setArrayRowDowns] = useState<any[]>([])
  const [openmodal, setOpenModal] = useState(false)
  const [value_total_qty, setValue_Total_Qty] = useState('')
  const [value_total_num, setValue_Total_Num] = useState('')
  const [value_material, setValue_Material] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const [total_click, setTotal_Click] = useState(0)
  const [mode, setMode] = useState(false)
  const [modalScan, setModalScan] = useState(false)

  // func Onchange input
  const handleTxtScan = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTxtScan(event.target.value);
  };

  const debouncedSearchTerm = useDebounced(txtscan, 300);
  useEffect(() => {
    if (debouncedSearchTerm) {
      ScanValue(debouncedSearchTerm)
    }
  }, [debouncedSearchTerm]);

  const ScanValue = (value_scan: string) => {
    const url = connect_string + "api/TextChanged_ReportAccounting"
    if(value_scan !== '') {
      setIsLoading(true)
      let data = {}
      const foundarrayRowUps = arrayRowUps.find((value : any )=> value.Barcode === value_scan)
      if (foundarrayRowUps){
        data = {
          User_Serial_Key: dataUser[0].UserId,
          txtScan: value_scan,
          dgvStock_Cout: arrayRowDowns.length,
          Check_Exit_Scan: false,
          get_version: dataFOC === true ? "FOC" : dataUser[0].WareHouse
        }
      }
      data = {
        User_Serial_Key: dataUser[0].UserId,
        txtScan: value_scan,
        dgvStock_Cout: arrayRowDowns.length,
        Check_Exit_Scan: true,
        get_version: dataFOC === true ? "FOC" : dataUser[0].WareHouse
      }
      axios.post(url, data, config).then(reponse => {
        const arr = reponse.data.map((item: any, index: any) => ({
          _id: item.Barcode,
          Barcode: item.Barcode,
          Material_No: item.Material_No,
          Rack: item.Rack,
          Supplier: item.Supplier,
          Material_Name: item.Material_Name,
          Color: item.Color,
          QTY: item.QTY,
          Order_No: item.Order_No,
          Roll: item.Roll,
          User_Serial_Key: item.User_Serial_Key,
          Value_Total_Qty: item.Value_Total_Qty,
          Total_QTY: item.Total_QTY,
          mau: item.mau
        }))
        setValue_Material(reponse?.data[reponse.data.length - 1]?.Material_No)
        setValue_Total_Num(reponse?.data[reponse.data.length - 1]?.Value_Total_Num)
        setValue_Total_Qty(reponse?.data[reponse.data.length - 1]?.Value_Total_Qty)
        if (arr?.length > 0) setTxtScan('')
        if (arr[0]?.check_Barcode === true) {
          const foundarrayRowUps = arr.find((value: any) => value.Barcode === value_scan)
          if (foundarrayRowUps && arrayRowDowns.length > 0) {
            setArrayRowUps([...arr, ...arrayRowUps])
            const arrTemp = arrayRowDowns.filter((value: any) => value.Barcode !== value_scan)
            setArrayRowDowns(arrTemp)
            if (arr[0].Material_No === value_material) {
              // làm tròn 4 số
              setTotal_Click(lastitem => {
                const lastItemDecimal = new Decimal(lastitem);
                const qtyDecimal = new Decimal(arr[0].QTY);

                const total = lastItemDecimal.plus(qtyDecimal);

                return total.toNumber();
              });
            }
            else {
              setTotal_Click(arr[0].QTY)
            }
          }
          else {
            if (arr.length > 0) {
              setArrayRowDowns(arr)
              setTotal_Click(0)
            }
          }
        }
        else {
          setArrayRowDowns(arr)
          setArrayRowUps([])
        }
      }).finally(() => {
        setIsLoading(false)
      })
    }

  }
  const handleScanClick = () => {
    setMode(true);
    setModalScan(true);

  }
  const handleRowDownsClick = (params: any , item: any) =>{
    setArrayRowUps(preArry => [...preArry, item])
    const foundarray = arrayRowDowns.filter((value: any) => value.Barcode !== item.Barcode)
    setArrayRowDowns(foundarray)
    setTotal_Click(lastitem => {
      const lastItemDecimal = new Decimal(lastitem);
      const qtyDecimal = new Decimal(item.QTY);

      const total = lastItemDecimal.plus(qtyDecimal);

      return total.toNumber();
    });

  }
  const handleScanCam = (result: any | null) => {
    if (result || result.text) {
      setTxtScan(result.text)
      modalScan && successSound.play();
    }

  }
  const  handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      if (arrayRowDowns.length > 0) {
        setOpenModal(true)
      }
    }

  }
  const handleOK = (params: any) => 
  {
    const url = connect_string + "api/txtScan_KeyDown_Enter"
    axios.post(url, arrayRowDowns, config).then(response => {
      if (response.data[0] === true) {
        setArrayRowDowns([])
      }
    })
    setOpenModal(false)
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Stack height={'100%'}>
          <Stack height={'10%'} direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
            <IconButton className={'back-button'} onClick={onClose}>
              <BiArrowBack className=" icon-wrapper" />
            </IconButton>
            <Typography variant="h4" component="h4" color={'white'}>{t("lblReport_Deviations") as string}</Typography>
            <IconButton sx={{ marginLeft: '20px' }} onClick={handleScanClick} >
              <CameraAltIcon />
            </IconButton>
          </Stack>
          <Stack height={'90%'} >
            <Box sx={{ display: 'flex', width: '100%', marginBottom: '10px', justifyContent: 'flex-end' }}>
              <Grid container justifyContent={'flex-end'} alignContent={'center'}>
                <Grid item xs={0.5} display={'flex'} alignItems={'center'} justifyContent={'flex-end'}>
                  {isLoading && <CircularProgress size={'25px'} color='info' />}
                </Grid>
                <Grid item xs={2} display={'flex'} alignItems={'center'} justifyContent={'flex-end'}>
                  {value_material}
                </Grid>
                <Grid item xs={2} display={'flex'} alignItems={'center'} justifyContent={'flex-end'}>
                  {total_click > 0 ? total_click : value_total_qty}
                </Grid>
                <Grid item xs={2} display={'flex'} alignItems={'center'} justifyContent={'flex-end'}>
                  {value_total_num}
                </Grid>
                <Grid item xs={3} display={'flex'} alignItems={'center'} justifyContent={'flex-end'}>
                  <InputField focus={true} keydown={handleKeyDown} handle={handleTxtScan} value={txtscan} disable={false} />
                </Grid>

              </Grid>
            </Box>
            <Box sx={{ height: '45%', width: '100%', marginBottom: '10px', overflow: 'hidden' }}>
              <TableOrigin columns={columns} rows={arrayRowUps} arrNotShowCell={['_id']} />

            </Box>
            <Box sx={{ height: '45%', width: '100%', overflow: 'hidden' }}>
            <TableOrigin columns={columns} rows={arrayRowDowns} handleDoubleClick={handleRowDownsClick} arrNotShowCell={['_id']} />
            </Box>

          </Stack>
        </Stack>
        {openmodal && <ModalCofirm title={t("msgYouWantUpdate") as string} open={openmodal} onClose={() => setOpenModal(false)} onPressOK={handleOK} />}
        {modalScan && <QRScanner onScan={handleScanCam} open={modalScan} onClose={() => { setModalScan(false); setMode(false); }} />}
      </Box>
    </Modal>
  )
}

export default Statistics