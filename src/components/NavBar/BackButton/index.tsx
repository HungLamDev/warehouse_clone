import IconButton from '@mui/material/IconButton';
import React from 'react'
import { BiArrowBack } from 'react-icons/bi';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { clearArrayDeleteAndPrint } from '../../../redux/ArrayDeleteAndPrint';
import { clearArrayRowUps } from '../../../redux/ArrayRowUp';
import { clearArrayRowDowntoUp } from '../../../redux/ArrayRowDowntoUps';
import { clearItemsMaterialTable } from '../../../redux/array';
import { clearArrayRowDowns } from '../../../redux/ArrayRowDowns';
interface BackButtonProps {
    navigate: string,
    state?: any,
    cancelRequest?: any
}

const BackButton = (props: BackButtonProps) => {
    const { navigate, state, cancelRequest } = props
    const nag = useNavigate()
    const dispatch = useDispatch()
    const ArrayRowUps = useSelector((state: any) => state.ArrayRowUps.items);
    const ArrayRowDowns = useSelector((state: any) => state.ArrayRowDowns.items);
    const ArrayRowDowntoUp = useSelector((state: any) => state.ArrayRowDowntoUp.items);
    const ArrayDeleteAndPrint = useSelector((state: any) => state.ArrayDeleteAndPrint.items);
    const MaterialTableChecked = useSelector((state: any) => state.MaterialTableChecked.items);
    const MaterialTable = useSelector((state: any) => state.MaterialTable.items);
    const back = () => {
        if (
          ArrayRowUps.length != 0 ||
          ArrayRowDowns.length != 0 ||
          ArrayRowDowntoUp.length != 0 ||
          ArrayDeleteAndPrint.length != 0 ||
          MaterialTableChecked.length != 0 ||
          MaterialTable.length != 0) {
            dispatch(clearArrayDeleteAndPrint())
            dispatch(clearArrayRowUps())
            dispatch(clearArrayRowDowns())
            dispatch(clearArrayRowDowntoUp())
            //dispatch(clearItemsMaterialTableChecked())
            dispatch(clearItemsMaterialTable())
        }
        nag(navigate, { state: state })
        if( typeof cancelRequest === "function"){
          cancelRequest()
        }
      }
    return (
        <IconButton className={'back-button'} onClick={back}>
            <BiArrowBack/>
        </IconButton>
  
  )
}

export default BackButton