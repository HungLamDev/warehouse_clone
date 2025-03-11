import IconButton from '@mui/material/IconButton';
import { TbListSearch } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const SideBarToggleButton = ({sideBarDisable, sideBarNavigate}:{sideBarDisable:boolean, sideBarNavigate: string}) => {
  const nag = useNavigate()

  return (
    <IconButton
    hidden={sideBarDisable}
    onClick={() => nag(sideBarNavigate)}
    className={'sidebar-toggle-button'}
    >
      <TbListSearch style={{ display: sideBarDisable ? 'none' : 'block' }} />
    </IconButton>
  );
};

export default SideBarToggleButton;
