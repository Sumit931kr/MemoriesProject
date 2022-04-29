import React, { useState } from 'react'
import { Container } from '@material-ui/core'
import { BrowserRouter, Routes, Route, } from "react-router-dom";

import Navbar from './component/Navbar/Navbar';
import Home from './component/Home/Home';
import Auth from './component/Auth/Auth';
import Alertgreen from './component/Alert/alertgreen';
import Alertred from './component/Alert/alertred';


function App() {
  const [alertsuccess, setalertsuccess] = useState(null)
  const [alertdanger, setalertdanger] = useState(null)

  
  const showalertdanger = (message) => {
    setalertdanger({ msg: message })

    setTimeout(() => {
      setalertdanger(null);
    }, 2000)
  }

  const showalertsuccess = (message) => {
    setalertsuccess({ msg: message })

    setTimeout(() => {
      setalertsuccess(null);
    }, 2000);
  }


  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <Navbar />
        <Alertgreen alertsuccess={alertsuccess} />
        <Alertred alertdanger={alertdanger} />
        <Routes>
          <Route path='/' element={<Home showalertdanger={showalertdanger} showalertsuccess={showalertsuccess} />} />
          <Route path='/auth' element={<Auth showalertdanger={showalertdanger} showalertsuccess={showalertsuccess} />} />
        </Routes>
      </Container>
    </BrowserRouter>
  )
}

export default App