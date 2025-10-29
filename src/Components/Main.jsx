import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import GeminiChat from './GeminiChat';

const Main = () => {
    return (
        <div className=''>
            <Navbar></Navbar>
            <div className="min-h-[calc(100vh-422px)]">

            <Outlet></Outlet>
            </div>
            <GeminiChat></GeminiChat>
            <Footer></Footer>
        </div>
    );
};

export default Main;