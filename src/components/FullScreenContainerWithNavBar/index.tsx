import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import React from 'react'
interface FullScreenContainerWithNavBarProps {
    title: string;
    children?: JSX.Element | JSX.Element[];
    navigate: string;
    sideBarDisable: boolean;
    sideBarNavigate:string;
    state?: any;
    onShowScan?: any;
    hidden?: any;
    cancelRequest: any
}

const FullScreenContainerWithNavBar = (props : FullScreenContainerWithNavBarProps) => {
    const {
         children, 
         title,
         navigate,
         sideBarDisable,
         sideBarNavigate,
         state,
         onShowScan,
         hidden, 
         cancelRequest
    } = props
  return (
   <Box className = {"fit-screen dark-bg-primary"}>
    <Stack typle={{height : '100dvh'}}>
        <NavBar>
            
        </NavBar>
    </Stack>
    
   </Box>
  )
}

export default FullScreenContainerWithNavBar