import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const { t } = useTranslation();
    const dispatch =  useDispatch();
    const navigate = useNavigate();

     const currencies = [
        {
            value: 'No',
             label: t('massWarehouse'),
        },
        { 
            value:  'sample',
            label: t('btnAccounting_Sample')
        },
        {
            value: 'Fitting',
            label: t('btnAccounting_Sole')
        }, {
            value: 'Inventory',
            label: t('btnAccounting_Inventory')
        },
        {
            value: 'Decorate',
            label: t('btnAccounting_Decorate')
        }
     ];
     const [username, setUsername] = React.useState('');
     const [password, setPassword] = React.useState('');
     const [showPassword, setShowPassword] = React.useState(false);
     
  return (
    <div>
      
    </div>
  )
}

export default LoginForm
