import React from 'react'
import { Container } from '@material-ui/core'
import Navbar from './component/Navbar/Navbar';
import Home from './component/Home/Home';
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import Auth from './component/Auth/Auth';

function App() {

  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/auth' element={<Auth />} />
        </Routes>
      </Container>
    </BrowserRouter>
  )
}

export default App