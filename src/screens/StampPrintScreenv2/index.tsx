import { GridColDef } from '@mui/x-data-grid';
import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FullScreenContainerWithNavBar from '../../components/FullScreenContainerWithNavBar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import TableCheckBox from '../../components/TableCheckBox';
import TableDateTimePicker from '../../components/TableDateTimePicker';
import moment from 'moment';
import { createConfig} from "../../utils/api"
import { coppyValuesArrayDeleteAndPrint } from '../../redux/ArrayDeleteAndPrint';
import InputField from '../../components/InputField';



const StampPrintScreen = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dataUser = useSelector((state: any) => state.UserLogin.user);
  const ArrayRowUps = useSelector((state: any) => state.ArrayRowUps.items);
  const ArrayRowDowns = useSelector((state: any) => state.ArrayRowDowns.items);
  const ArrayRowDowntoUp = useSelector((state: any) => state.ArrayRowDowntoUp.items);
  const ArrayDeleteAndPrint = useSelector((state: any) => state.ArrayDeleteAndPrint.items);
  //#endregion

  //#region State
  //#region  Cancel request axios
  const controllerRef = useRef(new AbortController());
  const configNew = createConfig(controllerRef.current.signal);
  // Func cancel Request
  const cancelRequest = () => {
      controllerRef.current.abort();
  };

  const [openCofirm, setOpenCofirm] = useState(false)
  const [cofirmType, setCofirmType] = useState('')
  const [open, setOpen] = useState(false)
  const [rowDowns, setrowDowns] = useState<any[]>([])
  const [rowUps, setrowUps] = useState<any[]>([])
  const [orderNo, setOrderNo] = useState("")
  const [outSource, setOutSource] = useState("")
  const [material_no, setMaterial_No] = useState("")
  const [workorder, setWorkOrder] = useState("")
  const [chxRY, setChxRY] = useState(false)
  const [chxPrint_All_RY, setchxPrint_All_RY] = useState(false)
  const [chxResidual_supplies, setchxResidual_supplies] = useState(false)
  const [chxPrint_RY, setchxPrint_RY] = useState(false)
  const [chxReprint, setchxReprint] = useState(false)
  const [chxReprint_RY, setchxReprint_RY] = useState(false)
  const [chxTotal_RY, setchxTotal_RY] = useState(false)
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"))
  const [dataInRowUps, setDataInRowUps] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false);
  const [resetCheckbox, setResetCheckbox] = useState(false);
  const [disable, setDisable] = useState(false)
  const [isApi, setIsApi] = useState(true)
  //#region column header  
  const columnsUp: GridColDef[] = [
    {
      field: "Supplier",
      headerName: t("dcpSupplier") as string,
      align: "center",
      editable: true,
      headerAlign: 'center',
      width: 150,
    },
    {
      field: "Material_No",
      headerName: t("dcpMaterial_No") as string,
      align: "center",
      headerAlign: 'center',
      width: 150,

    },
    {
      field: "Material_Name",
      headerName: t("dcpMaterial_Name") as string,
      align: "center",
      headerAlign: 'center',
      width: 150,

    },
    {
      field: "Color",
      headerName: t("dcmColor") as string,
      align: "center",
      headerAlign: 'center'

    },
    {
      field: "Size",
      headerName: t("dcmSize") as string,
      align: "center",
      headerAlign: 'center'

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
      field: "Unit",
      headerName: t("dcpUnit") as string,
      align: "center",
      headerAlign: 'center'

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
      field: "ngay",
      headerName: t("dcpDate") as string,
      align: "center",
      headerAlign: 'center',
      width: 150,

    },
    {
      field: "Production",
      headerName: t("dcpProduction") as string,
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
    {
      field: "Material_Type",
      headerName: t("dcmMaterial_Type") as string,
      align: "center",
      headerAlign: 'center'

    },
    {
      field: "Barcode",
      headerName: t("dcpBarcode") as string,
      align: "center",
      headerAlign: 'center',
      width: 180,

    },
    {
      field: "Type_Order",
      headerName: "",
      align: "center",
      width: 200,
      headerAlign: 'center'
    },
  ];
  const columnsDown: GridColDef[] = [
    {
      field: "zsywjc_Supplier",
      headerName: t("dcmSupplier") as string,
      align: "center",
      width: 150,
      headerAlign: 'center',
      editable: true,
    },
    {
      field: "CLBH_Material_No",
      headerName: t("dcpMaterial_No") as string,
      align: "center",
      width: 150,
      headerAlign: 'center',

    },
    {
      field: "ywpm_Material",
      headerName: t("dcpMaterial_Name") as string,
      align: "center",
      width: 150,
      headerAlign: 'center',
    },
    {
      field: "Color",
      headerName: t("dcmColor") as string,
      align: "center",
      headerAlign: 'center',
      width: 300,
    },
    {
      field: "Size",
      headerName: t("dcmSize") as string,
      align: "center",
      width: 400,
      headerAlign: 'center',
    },
    {
      field: "qty_roll",
      headerName: t("dcpQty_ROLL") as string,
      align: "center",
      headerAlign: 'center',
      width: 150,
      editable: true,

    },
    {
      field: "Arrival_QTY",
      headerName: t("dcmArrival_QTY") as string,
      align: "center",
      headerAlign: 'center',
      width: 150,
      editable: true,
    },
    {
      field: "QTY",
      headerName: t("dcpQTY") as string,
      align: "center",
      headerAlign: 'center',
    },
    {
      field: "dwbh_Units",
      headerName: t("dcpUnit") as string,
      align: "center",
      headerAlign: 'center'
    },
    {
      field: "CGNO_Order_No",
      headerName: t("lblOrderNo") as string,
      align: "center",
      width: 150,
      headerAlign: 'center'
    },
    {
      field: "Roll",
      headerName: t("dcmRoll") as string + "\u2002" + "\u2002" + "\u2002",
      align: "center",
      width: 150,
      headerAlign: 'center',
      editable: true,

    },
    {
      field: "ngay",
      headerName: t("dcpDate") as string,
      align: "center",
      width: 150,
      headerAlign: 'center'
    },
    {
      field: "ywsm_Production",
      headerName: t("dcpProduction") as string,
      align: "center",
      headerAlign: 'center',
      width: 150,
    },
    {
      field: "ZLBH_Work_Order",
      headerName: t("dcpWork_Order") as string,
      align: "center",
      width: 150,
      headerAlign: 'center'
    },
    {
      field: "cllb_Material_Type",
      headerName: t("dcmMaterial_Type") as string,
      align: "center",
      headerAlign: 'center'
    },
    {
      field: "Name_Material_Detail",
      headerName: "",
      align: "center",
      width: 200,
      headerAlign: 'center'
    },
    {
      field: "Type_Order",
      headerName: "",
      align: "center",
      width: 200,
      headerAlign: 'center'
    },
  ];
  const handleDoubleClick = () => {

  }
  const handleOrderNo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOrderNo(event.target.value);
    if (event.target.value.length === 15 || event.target.value.length === 16) {
        searchByBarcode(event.target.value)
    }
  }





  const searchByBarcode = (barcode: string) => {

  }
  return (
    <FullScreenContainerWithNavBar
      sideBarDisable={true}
      sideBarNavigate=""
      title={t("btnERP_Print") as string}
      navigate="/"
      cancelRequest={cancelRequest}>
      <Box   paddingX={1}
                paddingBottom={1}
                className={"dark-bg-secondary border-bottom-white"}>
        <Stack direction={"row"}>
          <Grid container alignItems={'center'}>
            <Grid item xs={5} display={'flex'}>
            <InputField focus={true} label={t("dcmOrder_No") as string} handle={handleOrderNo} keydown={null} value={orderNo} disable={disable} />
            </Grid>
            <Grid item xs={1} display={'flex'}></Grid>
            <Grid item xs={5} display={'flex'}></Grid>
          </Grid>
        </Stack>
        <Stack direction={"row"} alignItems={'center'} > 
          <Grid container alignItems={'center'}>
            <Grid item xs={5} display={'flex'}></Grid>
            <Grid item xs={1}></Grid>

          </Grid>
        </Stack>
        <Stack direction={'row'}>
          <Grid container alignItems={'center'}>
            <Grid item xs={2}>a</Grid>
            <Grid item xs={2}>b</Grid>
            <Grid item xs={2}>c</Grid>
            <Grid item xs={2}>d</Grid>
            <Grid item xs={2}>e</Grid>
            <Grid item xs={2}>f</Grid>
          </Grid>
        </Stack>

        <Stack direction={"row"} spacing={2} alignItems={'center'}></Stack>

      </Box>
      <Stack overflow={"hidden"} sx={{ height: '100%' }}>
        <Stack sx={{ height: '50%', }}>
          <TableCheckBox
            columns={columnsUp}
            rows={ArrayRowUps}
            listChx={(params: any) => { dispatch(coppyValuesArrayDeleteAndPrint(params)) }}
            arrNotShowCell={['_id']}
          />
        </Stack>
        <Stack sx={{ height: '50%' }} >
          <TableDateTimePicker
            checkOther={(chxRY === true || chxResidual_supplies === true || chxTotal_RY === true) ? true : false}
            checkOrderNo={orderNo !== "" ? true : false}
            columns={columnsDown}
            rows={ArrayRowDowns}
            onDoubleClick={handleDoubleClick}
            arrEditCell={["Size", "qty_roll", "Roll", "ywpm_Material", "Arrival_QTY", "ywsm_Production", "ZLBH_Work_Order", "ngay", "Color"]} arrNotShowCell={['_id', 'Suplier_no']}
          />
        </Stack>
      </Stack>

    </FullScreenContainerWithNavBar>
  )
}

export default StampPrintScreen
