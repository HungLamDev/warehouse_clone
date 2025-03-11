import React from 'react'
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import FullScreenContainerWithNavBar from '../../../components/FullScreenContainerWithNavBar';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { BiBorderRadius } from 'react-icons/bi';
const RegisterLabel = () => {

  const { t } = useTranslation();
  const dataUser = useSelector((state: any) => state.UserLogin.user);


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
            <Grid item xs={6}></Grid>
            <Grid item xs={6}></Grid>
            <Grid item xs={6}></Grid>
            <Grid item xs={6}></Grid>
            <Grid item xs={2.75}></Grid>
            <Grid item xs={3.25}></Grid>   
            <Grid item xs={2.75}></Grid>
            <Grid item xs={3.25}></Grid>
          </Grid>
          <Grid>
            <Grid item xs={0.5}></Grid>
            <Grid item display={'flex'}></Grid>
            <Grid item display={'flex'}></Grid>
            <Grid item display={'flex'}></Grid>
            <Grid item display={'flex'}></Grid>
            <Grid item display={'flex'}></Grid>
            <Grid item xs={0.5}display={'flex'}></Grid>

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
