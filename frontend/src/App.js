import React from 'react'
import Header from './components/header/Header';
import FrameA from './components/frame1/FrameA';
import FrameB from './components/frame2/FrameB';
import FrameC from './components/frame3/FrameC';
import FrameD from './components/frame4/FrameD';
import Footer from './components/footer/Footer';
import './App.css';

const App = () =>{
  return (
    <div className='gradient'>
    <Header/> 
    <FrameA/>
    <FrameB/>
    <FrameC/>
    <FrameD/>
    <Footer/>
    </div>
    )
}

export default App;
