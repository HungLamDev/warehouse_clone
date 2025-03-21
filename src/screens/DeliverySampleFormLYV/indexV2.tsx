import React from 'react'
import FullScreenContainerWithNavBar from '../../components/FullScreenContainerWithNavBar'
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { Box, Grid, Stack } from '@mui/material';
import Sidebar from "./SideBar/Sidebar"
import { BiBox } from 'react-icons/bi';
const DeliverySampleLYVScreen = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const stockout = location.state && location.state.data;
  return (
    <FullScreenContainerWithNavBar
    hidden={true}
    sideBarDisable={true}
    sideBarNavigate='/history-delivery-sample-lyv'
    title={t("lblStock_Out") + " " + t("btnAccounting_Sample")}
    navigate="/"
   >
    <Stack>
        <Stack>
            {/* phần Merge BOM*/}
            <Sidebar>
                <div>
                    <Box>
                        <Stack>
                        <Stack>
                        <Stack>
                            <Grid container>
                                <Grid item xs={12} display={'flex'} justifyContent={'flex-end'} > </Grid>
                                <Grid item xs={12} display={'flex'}  > </Grid>
                                <Grid item xs={12} display={'flex'}  > </Grid>



                            </Grid>
                        </Stack>

                        </Stack>

                        </Stack>
                        

                    </Box>
                    <Stack>

                    </Stack>
                </div>
            </Sidebar>

        </Stack>
    </Stack>

    </FullScreenContainerWithNavBar>
    
  )
}

export default DeliverySampleLYVScreen
