import React from 'react'
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const RegisterLabel = () => {

    const { t } = useTranslation();
    const dataUser = useSelector((state: any) => state.UserLogin.user);


  return (
    <FullScreenContainerWithNavBar>
        
    </FullScreenContainerWithNavBar>
  )
}

export default RegisterLabel
