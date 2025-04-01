import axios from 'axios';
import React, { useEffect, useState }  from 'react'
import { config } from '../../../utils/api';
import { useTranslation } from "react-i18next"
import lhgIcon from "../../../assets/LHG.png"
import lyvIcon from "../../../assets/LYV.png"
import lvlIcon from "../../../assets/LYM.png"  
import lymIcon from "../../../assets/LYM.png"  
import { get } from 'lodash';
import { getFactory, setFactory } from '../../../utils/localStorage';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
export type FactoryName = "LHG" | "LYV" | "LVL" | "LYM";
export interface IFactoryItem {
  factoryName: string;
  icon:string;
  value: FactoryName
}
export let connect_string = ''
export const checkPermissionPrint = async (UserId: string) => {
  const url = connect_string + ""
  const data = {
    user_id1 : UserId,
  }
  try{
    const response = await axios.post(url, data,config)
    return response.data

  } catch (error
  ){
    return false
  }
}
const ChooseFactory = () => {
  const { t } = useTranslation();
  //List Factory
  const myArray: IFactoryItem[] = [
    {
      factoryName: t('btnLHG'),
      icon: lhgIcon,
      value: "LHG"
    },
    {
      factoryName: t('btnLYV'),
      icon: lyvIcon,
      value: "LYV"
    },
    {
      factoryName: t('btnLVL'),
      icon: lvlIcon,
      value: "LVL"
    },
    {
      factoryName: t('btnLYM'),
      icon: lymIcon,
      value: "LYM"
    },
  ];
  const appFactory = getFactory() === null ? setFactory("LHG") : getFactory();
  const [selectedValue, setSelectedValue] = useState<FactoryName>(appFactory ? appFactory : "LHG");


  useEffect(() => {

    // BE https: /192.168.30.101:6969/
    // FE https://192.168.30.101:8081/
    if (selectedValue === "LHG") {
      connect_string = 'https://192.168.30.100:8989/'
    }
    if (selectedValue === "LYV") {
     //connect_string = 'https://192.168.30.231:8081/' 
      //connect_string = 'https://192.168.30.100:8989/'
      connect_string = 'https://192.168.30.101:6969/'

    }
  })
  const handleClickItem = (lng: FactoryName)=> {
    setSelectedValue(lng)
    setFactory(lng)
  }
  return (
    <Box className={"chooose-factory"}>
      <FormControl>
        <Select size="medium" value={selectedValue} sx={{ minWidth: '8.2rem'}}>
          {
            myArray.map(({factoryName, icon , value},index:number) => {
              return(
                <MenuItem key={index} value={value} onClick={()=> {
                  handleClickItem(value)
                }}>
                  <Stack direction="row" justifyContent={"center"} alignItems={"center"} spacing={1}>
                    <img src={icon} alt="" style={{
                      width: '1.7rem',
                      height:"1.2rem"
                    }}/>  
                    <Typography className='textsize'>
                      {(factoryName)}
                    </Typography>

                  </Stack>
                </MenuItem>
              )

            })
          }

        </Select>
      </FormControl>

    </Box>
  )
}

export default ChooseFactory
