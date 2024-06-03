import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import {createWebSocket} from "../services/websocket";
import toast, {Toaster} from "react-hot-toast";

const RegisterPage = () => {
  const [data, setData] = useState({
    name: "",
    password: "",
  });

  const [socket, setSocket] = useState(null);
  const connectSocketTest = () => {
    console.log('connected');
    if (!socket) {
      const newSocket = createWebSocket((message) => {
        console.log('Received message:', message);
      });
      setSocket(newSocket);
    }
  }

  useEffect(() => {
    if (socket) {
      toast.success(' connected');
    }
  }, [socket]);

  const handleOnChange = (e) => {
    const {name, value} = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value
      };
    });
  };

  return (

    <div className='mt-5'>
      <Toaster
          position="top-center"
          reverseOrder={true}
      />
      <div className='bg-white w-full max-w-sm mx-2 rounded overflow-hidden p-4 mx-auto'>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Welcome to Chat App!
        </h2>
        <pre>{JSON.stringify(data, undefined, 2)}</pre>
        <div className="grid gap-4 mt-5">
          <div className="flex flex-col gap-1">
            <label htmlFor='name'>Name :</label>
            <input
                type='text'
                id='name'
                name='name'
                placeholder='Enter your name'
                className='bg-slate-100 px-2 py-1 focus:outline-primary'
                value={data.name}
                onChange={handleOnChange}
                required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor='email'>Password :</label>
            <input
                type='password'
                id='password'
                name='password'
                placeholder='Enter your password'
                className='bg-slate-100 px-2 py-1 focus:outline-primary'
                value={data.password}
                onChange={handleOnChange}
                required
            />
          </div>
          <button className='bg-primary text-lg px-4 py-1 hover:bg-secondary rounded mt-2 text-white leading-relaxed tracking-wide'
                  onClick={connectSocketTest}
          >
            Register
          </button>
        </div>
        <p className='my-3 text-center'>Already have account ? <Link to={"/email"} className='hover:text-primary font-semibold'>Login</Link></p>
      </div>
    </div>
  );
};

export default RegisterPage;