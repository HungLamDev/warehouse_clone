import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getWareHouse, setWareHouse , setWareHouseAcount , getFactory , setFactory} from '../../../utils/localStorage';
import axios from "axios"
import { config } from '../../../utils/api';
import md5 from 'md5';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import MenuItem from '@mui/material/MenuItem';
const LoginForm = () => {
    const { t } = useTranslation();
    const dispatch =  useDispatch();
    const navigate = useNavigate();

     const currencies = [
        {
            value: 'No',
             label: t('massWarehouse'),
        },
        { 
            value:  'sample',
            label: t('btnAccounting_Sample')
        },
        {
            value: 'Fitting',
            label: t('btnAccounting_Sole')
        }, {
            value: 'Inventory',
            label: t('btnAccounting_Inventory')
        },
        {
            value: 'Decorate',
            label: t('btnAccounting_Decorate')
        }
     ];
     const [username, setUsername] =  useState('');
     const [password, setPassword] = useState('');
     const [showPassword, setShowPassword] = useState(false);
     const [isLoading, setIsLoading] = useState(false);
     const [open , setOpen] = useState(false);
     const [errorModal , setErrorModal] = useState(false);
     const [selectedWareHouse, setSelectedWareHouse] = useState('');
     const wareHouseName = getWareHouse() === null ? setWareHouse('No') : getWareHouse();
     const factoryName = getWareHouse() === null ? setWareHouse('No') : getWareHouse();

     const showBuliding = async () => {
        const url = "" //conect_string + "";
        const data = {
            user_id: username
        }

        const response = await axios.post(url, data, config)
        return response.data
     }
     
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const handleClickItem = (name: string) => {
    setSelectedWareHouse(name);
    setWareHouse(name);
    setWareHouseAcount(getWareHouse());
  }

  const handleClickShowPassword = () => setShowPassword((show) => !show);


  async function handleSubmit(event: any): Promise<void>
  {
    event.preventDefault();
    const url = ""
    const url_Login_boss = ""
    const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      const  dataUser = {
        User_Id: username,
        pass: md5(password).toUpperCase(),
      }
      const dataUserBoss = {
        UserId: username,
        pass: password
      }
      setIsLoading(true);
      try{
       
      }

   catch(error){
       setErrorModal(true);
       setIsLoading(false);
   }
}
return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Paper className={"my-login-form"}
          sx={{
            p: 5,
            zIndex: 10
          }}>
          <Stack spacing={2}> {/* Thêm spacing để tạo khoảng cách */}
            <TextField
              label={t("lblUser_Name")}
              variant="outlined"
              autoComplete='off'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
            />

            <TextField
              sx={{ with: '90%' }}
              label={t("lblUser_Password")}
              variant="outlined"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete='off'
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <TextField
              id="outlined-select-currency"
              select
              label="Kho"
              value={selectedWareHouse}
              onChange={(e) => handleClickItem(e.target.value)}
            >
              { currencies.map((option) => (
                <MenuItem onClick= {() =>  handleClickItem(option.value)} key={option.value} value={option.value}>{option.label}</MenuItem>
              ))}
            </TextField>

            <Button
              style={{ fontWeight: '600', color: 'black',  }}
              variant={"contained"}
              fullWidth
              type={"submit"}
              startIcon={isLoading && <CircularProgress size={'25px'} color='inherit' />}
            >
              {t('btnLogin')}
            </Button>
          </Stack>
        </Paper>
      </form>
    </Box>
  );
} 

export default LoginForm
