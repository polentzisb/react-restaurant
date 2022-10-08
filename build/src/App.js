import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import About from './components/about';
import Contact from './components/contact';
import Footer from './components/footer';
import Home from './components/home';
import NavbarMain from './components/navbar';
import Menu from './components/menu';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<NavbarMain /> }>
            <Route index element={ <Home /> } />
            <Route path='about' element={ <About /> } />
            <Route path='contact' element={ <Contact /> } />
            <Route path='menu' element={ <Menu /> } />
            <Route path='*' element={ <Navigate replace to='/'/> }/>
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>

    </div>
    
  );
}

export default App;
