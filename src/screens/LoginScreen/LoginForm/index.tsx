import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getFactory, getWareHouse, setFactory, setWareHouse, setWareHouseAcount } from '../../../utils/localStorage';
import axios from 'axios';
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
import { connect_string } from '../ChooseFactory';
import { addUser } from '../../../redux/UserLogin';

const LoginForm = ()  => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const currencies = [
        { value: 'No', label: t('massWarehouse') },
        { value: 'sample', label: t('btnAccounting_Sample') },
        { value: 'Fitting', label: t('btnAccounting_Sole') },
        { value: 'Inventory', label: t('btnAccounting_Inventory') },
        { value: 'Decorate', label: t('btnAccounting_Decorate') },
    ];

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [errorModal, setErrorModal] = useState(false);
    const wareHouseName = getWareHouse() === null ? setWareHouse("No") : getWareHouse();
    const [selectedWareHouse, setSelectedWareHouse] = useState(
        wareHouseName ? wareHouseName : "No"
    );
    const factoryName = getFactory() === null ? setFactory("LHG") : getFactory();

 
    const showBuliding = async () => {
        const url = connect_string + "api/show_Value_Buiding";
        const data = { user_id: username };
        try {
            const response = await axios.post(url, data, config);
            return response.data;
        } catch (error) {
            console.error('Error fetching building data:', error);
            return [];
        }
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleClickItem = (name: string) => {
        setSelectedWareHouse(name);
        setWareHouse(name);
        setWareHouseAcount(name);
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleFulfilled = () => {
        navigate("/");
    };

    async function handleSubmit(event: any): Promise<void> {
        event.preventDefault();
        const url = connect_string + "api/Login";
        const url_Login_Boss = connect_string + "api/Login_Boss"
        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        };
    
        const dataUser = {
            User_Id: username,
            pass: md5(password).toUpperCase(),
        };
        const dataUserBoss = {
          User_Id: username,
          pass: password,
        };
        console.log("Username:", username); // Log username
        console.log("Password:", password); // Log password
        console.log("Selected WareHouse:", selectedWareHouse); // Log selectedWareHouse
        console.log("connect_string", connect_string)
        console.log("Factory Name:", factoryName); // Log factoryName
        setIsLoading(true);
        try {
            const response = await axios.post(url, dataUser, config);
        console.log("response user:", response); // Log factoryName
            
            if (response.data.length !== 0) {
                // const buldingData = await showBuliding();
                dispatch(
                    addUser([
                        {
                            UserId: response.data[0]['Rp_User_Id'],
                            UserName: response.data[0]['Rp_User_name'],
                            UserRole: response.data[0]['Rp_Usere_level'],
                            WareHouse: selectedWareHouse,
                            factoryName: factoryName,
                            // buldingData: buldingData,
                            TLLanguage: response.data[0]['TLLanguage'],
                        },
                    ])
                );
                setIsLoading(false);
                handleFulfilled();
            } else {
              const response = await axios.post(url_Login_Boss, dataUserBoss, config);
              if(response.data.length !== 0) {
                // const buildingData = await showBuliding();  Chờ đợi showBuilding trả về dữ liệu
                dispatch(
                  addUser([
                    {
                      UserId: response.data[0]['Rp_User_Id'],
                      UserName: response.data[0]['Rp_User_name'],
                      UserRole: response.data[0]['Rp_Usere_level'],
                      WareHouse: selectedWareHouse,
                      factoryName: factoryName,
                    //   building: buildingData,
                      TLLanguage: response.data[0]['TLLanguage'] // Sử dụng dữ liệu từ showBuilding ở đây
                    }
                  ])
                );
                  setIsLoading(false);
                  handleFulfilled();
              }
              else{
                  setOpen(true);
                 setIsLoading(false);
            }
        } 
            }
            catch (error) {
              setErrorModal(true);
              console.error("Login failed:", error); // Log lỗi
          } finally {
              setIsLoading(false);
          }
        }
    return (
        <Box>
            <form onSubmit={handleSubmit}>
                <Paper
                    className={"my-login-form"}
                    sx={{
                        p: 5,
                        zIndex: 10,
                    }}
                >
                    <Stack spacing={2}>
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
                                ),
                            }}
                        />

                        <TextField
                            id="outlined-select-currency"
                            select
                            label={t("lblWareHouse")}
                            value={selectedWareHouse}
                            onChange={(e) => handleClickItem(e.target.value)}
                        >
                            {currencies.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>

                        <Button
                            style={{ fontWeight: '600', color: 'black' }}
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
};

export default LoginForm;