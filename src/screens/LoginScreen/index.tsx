import "./style.scss";
import LoginForm from "./LoginForm";
import Typography from '@mui/material/Typography';
import { useTranslation } from "react-i18next";
import ChooseFactory from "./ChooseFactory";
import ChooseLanguage from "./chooseLanguage";


const LoginScreen = () => {
  const { t } = useTranslation();
  return (
    <section id={"login-screen"}>
      <div className="marquee-container">
        <div className="marquee-content">
          <Typography variant="subtitle2" sx={{ color: 'white', opacity: 0.8, width: '100%', textAlign: 'left' }}>{t("msgHelp")}: H.Vân (0788968791)</Typography>
        </div>
      </div>
      <div className={"blur-backdrop"}></div>
      <div className="chooseContainer">
        <ChooseFactory/>
        <ChooseLanguage/>
      </div>
      <LoginForm />
      <Typography className="textsizemini" variant="caption" sx={{
        position: 'absolute',
        bottom: 1,
        color: '#FDE767',
        opacity: 0.5,
        fontWeight: '700',
        width: '100%',
        textAlign: 'center',
        "@media screen and (max-height: 450px)": {
          display: 'none'
        },
      }}>Powered by IT-Software LHG<br /> © 2024 LACTY CO II.,LTD. All rights reserved. </Typography>

      <Typography className="textsizemini" variant="caption" sx={{
        top: 1,
        position: 'absolute',
        color: '#FDE767',
        opacity: 0.5,
        fontWeight: '700',
        width: '100%',
        textAlign: 'left',
        "@media screen and (max-height: 450px)": {
          display: 'none'
        },
      }}>  Version: {import.meta.env.VITE_APP_VERSION} </Typography>
    </section>
  );
};

export default LoginScreen;
