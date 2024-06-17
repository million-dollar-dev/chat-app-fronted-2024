import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast, {Toaster} from "react-hot-toast";
import websocketService from "../services/websocket";

const RegisterPage = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  
  const handleRegister = async(e) => {
    e.preventDefault()
    e.stopPropagation()

    if (username.length === 0 || password.length === 0 || repeatPassword.length === 0) {
      toast.error('Please fill all form')
      return
    }

    if (!(password == repeatPassword)) {
      toast.error('Make sure passwords match')
      return
    }

    const registerData = {
            "action": "onchat",
            "data": {
                "event": "REGISTER",
                "data": {
                    "user": username,
                    "pass": password
                }
            }
    }
    
    websocketService.send(registerData);

        websocketService.socket.onmessage = (message) => {
            const response =  JSON.parse(message.data)
            console.log(response);
            if (response.status === 'success') {
                navigate('/')
                toast.success('Register successfully')
            } else {
                setPassword('')
                setRepeatPassword('')
                toast.error(response.mes)
            }
        }
  }

  return (
    <div className='mt-5'>
      <Toaster
          position="top-center"
          reverseOrder={true}
      />
      <div className='bg-white w-full max-w-sm mx-2 rounded overflow-hidden p-4 mx-auto'>
      <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
          Register
        </h2>
        <h3 className="mt-2 text-center text-xl font-extrabold text-gray-900">
          Welcome to Chat App!
        </h3>
        {/*<pre>{JSON.stringify(data, undefined, 2)}</pre>*/}
        <div className="grid gap-4 mt-5">
          <div className="flex flex-col gap-1">
            <label htmlFor='name'>Username :</label>
            <input
                type='text'
                id='username'
                name='username'
                placeholder='Enter your username'
                className='bg-slate-100 px-2 py-1 focus:outline-primary'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor='email'>Repeat Password :</label>
            <input
                type='password'
                id='repeatPassword'
                name='reatPassword'
                placeholder='Repeat your password'
                className='bg-slate-100 px-2 py-1 focus:outline-primary'
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                required
            />
          </div>
          <button className='bg-primary text-lg px-4 py-1 hover:bg-secondary rounded mt-2 text-white leading-relaxed tracking-wide'
                  onClick={handleRegister}
          >
            Register
          </button>
        </div>
        <p className='my-3 text-center'>Already have account ? <Link to={"/login"} className='hover:text-primary font-semibold'>Login</Link></p>


      </div>
    </div>
  );
};

export default RegisterPage;