/// <reference types="vite-plugin-svgr/client" />
import Logo from '../public/logo.svg?react';
import { FiMail } from "react-icons/fi";

function LoginForm(){
  return(
    <>
    <div className="w-full min-h-screen bg-off-white flex justify-center">
      <main className="w-full m-10 text-white flex flex-col items-center justify-center">

        <div className="w-full flex justify-center">
        <Logo className='fill-carbon-black w-32 h-32 justify-center items-center sm:w-40 sm:h-40 md:w-40 md:h-40 2xl:w-52 2xl:h-52'/>
        </div>

        <div className="w-full h-full bg-[#D9D9D9] bg-opacity-30 my-2 rounded-lg shadow-signature sm:w-96 lg:w-80 2xl:w-1/4 2xl:h-1/2">
          <form className='p-4'>

          <div className='w-full h-10 flex justify-center items-center'>
            <h1 className='text-4xl font-bold text-carbon-black'>Login</h1>
          </div>

          <div className="w-full h-full flex flex-col space-y-10 my-5">
            <FiMail className='text-carbon-black'/>
            <input type='email'className='p-2 bg-transparent outline-none border-b-carbon-black border-b-2 placeholder:text-carbon-black' placeholder='Insira seu email...'/>
            <input type='password' className='p-2 bg-transparent outline-none border-b-carbon-black border-b-2 placeholder:text-carbon-black' placeholder='Insira sua senha...'/>          

          </div>
          <button type='submit' className='text-azure-radiance-500'>Acessar</button>
          </form>
        </div>

      </main>
    </div>
    </>
  );
};

export default LoginForm;