import "./App.scss";
import { useEffect, useState } from 'react'
import { Navigate, Outlet, Route, Routes, useNavigate } from 'react-router-dom'
import LoginScreen from './screens/LoginScreen'
import ErrorScreen from './screens/ErrorScreen'
import Homesrceen from './screens/HomeSreen'
import Stockin from './screens/StockinScreenv2/StockinForm'

import { useSelector } from 'react-redux'
import StampPrintScreen from "./screens/StampPrintScreenv2"
import RegisterLabel from "./screens/StampPrintScreenv2/RegisterLabel"
import DeliverySampleLYVScreen from "./screens/DeliveryScreen/DeliverySampleFormLYV/indexV2"
const ProtectedRoutes = ({ authenticate }: { authenticate: boolean }) => {

  if (!authenticate) {
    return <Navigate to={"/login"} replace />;
  }
  return <Outlet />;
};
function App() {
  const dataUser = useSelector((state: any) => state.UserLogin.user);
  const navigate = useNavigate();
  const [authenticate, setAuthenticate] = useState(false)

  useEffect(() => {
    if (dataUser != '') {
      setAuthenticate(true)
      navigate("/");
    }
  }, [dataUser]);


  return (
   <section className={"App"}>
    <Routes>
      <Route  element={<ProtectedRoutes authenticate={authenticate} />}>
         <Route path ="/" element={<Homesrceen/>} />
         <Route path={"/stamp-print"} element={<StampPrintScreen />}></Route>
         <Route path={"/stock-in"} element={<Stockin />}></Route> 
         <Route path={"/register-label"} element={<RegisterLabel />}></Route>
         <Route path={"/delivery-sample-lyv"} element={<DeliverySampleLYVScreen />}></Route>
      </Route>

      <Route path="/login" element={<LoginScreen />}/>
      <Route path="/*" element={<ErrorScreen />}/>

    </Routes>
   </section>
  )
}

export default App
