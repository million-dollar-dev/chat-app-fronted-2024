import React from 'react';
import {Outlet} from "react-router-dom";
import Sidebar from "../components/Sidebar";


const Home = () => {
  return (
    <div className='grid lg: grid-cols-[300px,1fr] h-screen max-h-screen'>
      <section className='bg-white'>
        <Sidebar></Sidebar>
      </section>

       <section>
           <Outlet></Outlet>
       </section>
    </div>
  );
};

export default Home;