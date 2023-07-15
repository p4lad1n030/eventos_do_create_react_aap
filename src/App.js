import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import das views da aplicação
import Login from './view/login/login';
import Register from './view/cadastro/cadastro';
import Home from './view/home/index';
import Recovery from './view/recuperarsenha/recuperar';
import NotFound from './view/notfound/naoencontado';
import Cadastrarevento from './view/cadastrarevento/cadastrarevento';
import  Detalhesevento  from "./view/detalhesevento/detalhesevento";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home />}></Route>
        <Route path='/:param' element={<Home />}></Route>
        <Route path='/cadastro' element={<Register />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/recuperarsenha' element={<Recovery />}></Route>
        <Route path='/detalhesevento/:id' element={<Detalhesevento />}></Route>
        <Route path='/cadastrarevento' element={<Cadastrarevento />}></Route>
        <Route path='*' element={<NotFound />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
