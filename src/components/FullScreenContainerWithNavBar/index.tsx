import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import FormControlLabel from '@mui/material/FormControlLabel';
import NavBar from "../NavBar";
interface FullScreenContainerWithNavBarProps {
  title: string;
  children?: JSX.Element | JSX.Element[];
  navigate: string;
  sideBarDisable: boolean;
  sideBarNavigate: string
  state?: any
  onShowScan?: any,
  hidden?: any,
  cancelRequest?: any
}

const FullScreenContainerWithNavBar = (props: FullScreenContainerWithNavBarProps) => {
  // className={"dark-bg-secondary"} borderBottom={"1px solid white"}
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
    <Box className={"fit-screen dark-bg-primary"} >
      <Stack style={{ height: '100dvh' }}>
        <NavBar
          state={state}
          title={title}
          navigate={navigate}
          sideBarDisable={sideBarDisable}
          sideBarNavigate={sideBarNavigate}
          onShowScan={onShowScan}
          hidden={hidden}
          cancelRequest={cancelRequest} />
        {/*Start children*/}
        {children}
        {/*End children*/}
      </Stack>
    </Box>
  );
};

export default FullScreenContainerWithNavBar;
