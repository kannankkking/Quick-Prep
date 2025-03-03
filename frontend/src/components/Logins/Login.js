import React from 'react';
import img from '../../images/Logins.jpg';
import { useNavigate } from 'react-router-dom';

const Logins = () => {
    const navigate = useNavigate();
    const Redirect = () => {
        navigate('/Userlogin');
    };
    const adminlogin =()=>{
        navigate("/AdminLogin")
    }

    return (
     <div className='relative overflow-hidden '>
  <img 
    className='w-full object-cover  min-h-screen md:max-h-screen ' 
    src={img} 
    alt='Loginpage' 
  />
  <div 
    className='absolute bottom-20 md:bottom-72 text-xl md:text-3xl text-white font-serif flex flex-col items-center gap-5  w-full md:w-auto'
  >
    <h1 className= 'text-blue-500 md:text-blue-300 font-bold text-2xl md:text-4xl text-center md:text-left'>
      QUICK PREP HUB
    </h1>
    <button
      onClick={Redirect}
      className='bg-transparent   rounded-lg p-2 w-56 md:w-72 text-center hover:bg-blue-300 transition-all transform hover:translate-x-4'
    >
      User Login
    </button>
    <button 
      onClick={adminlogin}
      className='bg-transparent  rounded-lg p-2 w-56 md:w-72 text-center hover:bg-red-300 transition-all transform hover:translate-x-4'
    >
      Admin Login
    </button>
  </div>
</div>

    );
};

export default Logins;
