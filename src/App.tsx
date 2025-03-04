import "./App.scss";
import { useEffect, useState } from 'react'

import { Route, Routes, useNavigate } from 'react-router-dom'
import LoginScreen from './screens/LoginScreen'
import ErrorScreen from './screens/ErrorScreen'
import { useSelector } from 'react-redux'

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
      <Route path="/login" element={<LoginScreen />}/>
      <Route path="/*" element={<ErrorScreen />}/>

    </Routes>
   </section>
  )
}

export default App
