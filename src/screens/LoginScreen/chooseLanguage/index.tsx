import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ILanguageItem } from './interface';
import englishIcon from "../../../assets/english.png"
import chineseIcon from "../../../assets/chinese.png"
import vietnameseIcon from "../../../assets/vietnamese.png"
import burmeseIcon from "../../../assets/burmese.png"
import { getAppLang, setAppLang } from '../../../utils/localStorage';
import { LanguageName } from './type';
import { Box, FormControl, MenuItem, Select, Stack, Typography } from '@mui/material';

const ChooseLanguage = () => {
  const {t} = useTranslation()
  const {i18n} = useTranslation();

  const myArray: ILanguageItem[] = [
    {
      language: t("btnEnglish"),
      icon: englishIcon,
      value: "EN"
    },
    {
      language: t("btnChina"),
      icon: chineseIcon,
      value: "TW"
    },
    {
      language: t('btnVietnames'),
      icon: vietnameseIcon,
      value: "VN"
    },
    {
      language: t("tsmMyanmar"),
      icon: burmeseIcon,
      value: "MM"
    },
  ];
  const appLang = getAppLang();
  const [selectedValue, setSelectedValue] = useState<LanguageName>(appLang? appLang : "VN");
  const handleClickItem = (lng: LanguageName) => {
    i18n.changeLanguage(lng)
    setSelectedValue(lng)
    i18n.changeLanguage(lng);
    setAppLang(lng)
  }
  return (
    <Box className={"choose-language"}>
      <FormControl>
        <Select size="medium" value={selectedValue} sx={{minWidth: '8.2rem'}}>
          {myArray.map(({language,icon, value}, index: number )=> {
            return (
              <MenuItem 
              key={index}
              value={value}
              onClick={() => handleClickItem(value)}
              >
                <Stack direction={"row"}
                justifyContent={"center"}
                alignContent={"center"}
                spacing={1}>
                  <img src={icon} alt="" style={{
                    width: "1.5rem",
                    height: "1.5rem",
                  }} />
                  <Typography className='textsize'>{(language)}</Typography>
                </Stack>
              </MenuItem>

            )
          })}

        </Select>

      </FormControl>

    </Box>
  )
}

export default ChooseLanguage
