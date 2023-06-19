import React from 'react';
import { Routes, Route } from "react-router-dom";
// paginas da aplicação
import Home from '../login/login';
import Register from '../cadastro/cadastro';

const Index = () => {
  return (
    <>
    <Routes>
    <Route exact path="/" element={<Home />}></Route>
    <Route path="/cadastro" element={<Register />}></Route>
    </Routes>
    </>
    
  );
}

export default Index;
