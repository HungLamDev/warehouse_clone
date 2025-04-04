import { Box, Checkbox, CircularProgress, FormControlLabel, FormGroup, Grid, IconButton, Modal, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import FullScreenContainerWithNavBar from '../../../components/FullScreenContainerWithNavBar';
import { BiArrowBack } from 'react-icons/bi';
import TableOrigin from '../../../components/TableOrigin';
import ModalCofirm from '../../../components/ModalConfirm';
import MyButton from '../../../components/MyButton';
import InputField from '../../../components/InputField';
import { styletext } from '../../StockinScreenv2/StockinForm';
import { GridColDef } from '@mui/x-data-grid';
import TableCheckBox from '../../../components/TableCheckBox';
import DatePickerField from '../../../components/DatePickerField';
import { connect_string } from '../../LoginScreen/ChooseFactory';
import axios from 'axios';
import { config } from "../../../utils/api";

const UpdateWH  = () => {
    const { t } = useTranslation();
    const dataUser = useSelector((state: any) => state.UserLogin.user);

    const [mode, setMode] = useState(false)
    const [modalScan, setModalScan] = useState(false)
    const [rows, setRows] = useState([])
    const [listChecked, setListChecked] = useState([])
    const [Rack, setRack] = useState('')
    const [MaterialType, setMaterialType] = useState('')
    const [StorageSerial, setStorageSerial] = useState('')
    const [disable, setDisable] = useState(false)

    const handleRack = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRack(event.target.value);
    };
    const handleMaterialType = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMaterialType(event.target.value);
    };
    const handStorageSerial = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStorageSerial(event.target.value);
    };
    const columns: GridColDef[] = [
        {
            field: 'stt',
            headerName: t("dcpNum") as string,
            width: 160,
            headerClassName: 'custom-header'
        },
        {
            field: 'Material_No',
            headerName: t("dcpMaterial_No_Show") as string,
            width: 150,
            editable: true,
            headerClassName: 'custom-header'
        },
        {
            field: 'Color',
            headerName: t("dcmColor") as string,
            width: 160,
            headerClassName: 'custom-header'
        },
        {
            field: 'Total_Qty',
            headerName: t("dcmQTY") as string,
            width: 300,
            headerClassName: 'custom-header'
        },
        {
            field: 'Rack',
            headerName: t("dcpRack") as string,
            width: 160,
            headerClassName: 'custom-header'
        },
        {
                field: 'WH',
                headerName: "WH",
                width: 160,
                headerClassName: 'custom-header',
               }

    ];

    const handleSearch = () => {
        if ( MaterialType !== "" ) {
            setDisable(true)
            const url = connect_string + "api/get_rack_all"
            const data = {
                Rack: Rack,
                Material_Type: MaterialType
            }
            axios.post(url, data, config).then(response => {
                console.log("test", response)

                setDisable(false)
            })
        }


    }
  return (
      <FullScreenContainerWithNavBar 
          hidden={true}
          sideBarDisable={true}
          sideBarNavigate="/update-WH"
          title={t("lblupdate_inforWH")}
          navigate="/"
          >
          <Box
              paddingX={1}
              paddingBottom={1}
              className={"dark-bg-secondary border-bottom-white"}
          > 
          <Stack  >
                  <Grid container justifyContent={'center'}>
                      <Grid item xs={1} display={'flex'} justifyContent={'start'} alignItems={'center'}>
                          <Typography className="textsize">RACK</Typography>
                      </Grid>
                      <Grid item xs={2} display={'flex'} paddingRight={'16px'}>
                          <InputField value={Rack} handle={handleRack} disable={disable}/>
                      </Grid>
                      <Grid item xs={1} display={'flex'} justifyContent={'start'} alignItems={'center'}>
                          <Typography className="textsize">Material Type</Typography>
                      </Grid>
                      <Grid item xs={2} display={'flex'} paddingRight={'16px'}>
                          <InputField value={MaterialType}handle={handleMaterialType} disable={disable}/>
                      </Grid>
                      <Grid item xs={1} display={'flex'} justifyContent={'start'} alignItems={'center'}>
                          <Typography className="textsize">Storage Serial</Typography>
                      </Grid>
                      <Grid item xs={2} display={'flex'}>
                          <InputField value={StorageSerial} handle={handStorageSerial} disable={disable}/>
                      </Grid>
                      <Grid item  >
                          <MyButton name={t("btnSearch")} onClick={handleSearch} disabled={disable} />
                      </Grid>
                  </Grid>
            

          </Stack>
          </Box>
          <Stack overflow={"hidden"} sx={{ height: '100%' }}>
              <TableCheckBox columns={columns} rows={rows} listChx={(params: any) => setListChecked(params)} />
          </Stack>
        
      </FullScreenContainerWithNavBar>
  )
}

export default UpdateWH 