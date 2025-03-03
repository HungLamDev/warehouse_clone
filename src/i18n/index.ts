import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import tranlation_EN from './EN.json';
import tranlation_VN from './VN.json';
import tranlation_TW from './TW.json';
import tranlation_MM from './MM.json';
// import { getAppLang } from '../utils';



const resources = {
    EN: {
        all: tranlation_EN
    },
    VN: {
        all: tranlation_VN
    }, 
    TW: {
        all: tranlation_TW
    }, 
    MM: {
        all: tranlation_MM
    },

}


const appLang = "VN" //getAppLang();
const defaulyNS = "all";
const lngDefault = appLang? appLang : "VN";




i18n.use(initReactI18next).init({
    resources,
    lng: lngDefault,
    fallbackLng: lngDefault,
    ns:['all'],
    defaultNS: defaulyNS,
    interpolation: {
        escapeValue: false
    }
});

export default i18n;