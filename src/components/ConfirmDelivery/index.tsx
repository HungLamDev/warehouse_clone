import { Autocomplete, Box, Button, Grid, Modal, Stack, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { connect_string } from "../../screens/LoginScreen/ChooseFactory";
import axios from "axios";
import { useEffect, useState } from "react";
import GenericAutocomplete from "../GenericAutocomplete";

interface ConfirmDeliveryProps {
  title?: string,
  open?: any,
  onClose?: any,
  onPressOK?: any,
  showOk?: boolean
}

const ConfirmDelivery = (props: ConfirmDeliveryProps) => {
  const { title, open, onClose, onPressOK, showOk = true } = props
  const { t } = useTranslation();

  const [listWH, setListWH] = useState<any[]>([])
  const [valueWH, setValueWH] = useState("")
  const [disable, setDisable] = useState(false)

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // width: '40%',
    // height: '30%',
    bgcolor: '#1c2538',
    border: '2px solid white',
    borderRadius: 3,
    boxShadow: 24,
    p: 2,
  };


  useEffect(() => {
    if (open) {
      handleLoadDataWH()
    }
  }, [open])

  const handleLoadDataWH = () => {
    setDisable(true)
    const url = connect_string + "api/get_KCCK_ERP"
    axios.post(url).then(res => {
      setListWH(res.data)
    }).finally(() => {
      setDisable(false)
    })

  }

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      slotProps={{
        backdrop: {
          style: {
            backdropFilter: "blur(1px)", // Hiệu ứng làm mờ nền
          },
        },
      }}
    >
      <Box sx={style}>
        <Stack direction={'column'} height={'100%'} gap={5}>
          <Stack height={'50%'} justifyContent={'center'} spacing={2}>
            <Typography className="titleNavbar" color={'white'} sx={{ fontSize: 30 }}>{title}</Typography>
            <Grid container>
              <Grid item display={'flex'} xs={4} alignItems={"center"}>
                <Typography className='textsize' color={'white'}>{t("lblChooseWH")}</Typography>
              </Grid>
              <Grid item display={'flex'} xs={8}>

                <GenericAutocomplete
                  value={valueWH}
                  onChange={(newValue: any | "") => {
                    setValueWH(newValue);

                  }}
                  getOptionLabel={(option) => (typeof option === 'string' ? option : option?.CKBH || "")}
                  isOptionEqualToValue={(option, value) => {
                    if (typeof value === 'string') {
                      return option.CKBH === value; // So sánh chuỗi với chuỗi
                    }
                    return option.CKBH === value?.CKBH; // So sánh object với object
                  }}
                  options={Array.isArray(listWH) ? listWH : []}
                />
              </Grid>
            </Grid>


          </Stack>
          <Stack height={'50%'} direction={'row'} justifyContent={'flex-end'} alignItems={'center'}>
            {
              (showOk === true) &&
              (
                <Button disabled={(valueWH === "" || valueWH === null) ? true : false} className='textsizebtn' onClick={() => onPressOK(valueWH)} style={{ color: 'white', backgroundColor: (valueWH === "" || valueWH === null) ? "#1c2538" : '#17594A', marginRight: 20, minWidth: '30%', border: '1px solid white' }}>{t("btnSuccess")}</Button>
              )
            }
            <Button className='textsizebtn' onClick={onClose} style={{ color: 'white', backgroundColor: '#F24C3D', minWidth: '30%', border: '1px solid white' }}>{t("btnCancel")}</Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  )
}

export default ConfirmDelivery