/// <reference types="vite-plugin-svgr/client" />
import Logo from '../public/logo.svg?react';
import { FiMail } from "react-icons/fi";
import { IoMdLock } from "react-icons/io";

function LoginForm(){
  return(
    <>
    <div className="w-full min-h-screen bg-off-white flex justify-center">
      <main className="w-full m-10 text-white flex flex-col items-center justify-center">

        <div className="w-full flex justify-center">
        <Logo className='fill-carbon-black w-32 h-32 justify-center items-center 2xl:w-48 2xl:h-48'/>
        </div>

        <div className="w-full h-full bg-[#D9D9D9] bg-opacity-30 my-2 rounded-lg shadow-signature sm:w-96 xl:h-[22rem] 2xl:w-[28rem] 2xl:h-1/2">
          <form className='p-4'>

          <div className='w-full h-10 flex justify-center items-center'>
            <h1 className='text-4xl font-outfit font-semibold text-carbon-black 2xl:text-5xl 2xl:mt-6'>Login</h1>
          </div>

          <div className="w-full h-full flex flex-col space-y-10 my-5 2xl:mt-10 2xl:space-y-12">
            <div className="w-full flex flex-row relative">
              <FiMail className='text-carbon-black absolute text-xl top-2.5 mx-1 2xl:text-2xl'/>
              <input type='email'className='w-full p-2 px-8 bg-transparent text-carbon-black font-outfit outline-none border-b-carbon-black border-b-2 placeholder:text-carbon-black 2xl:text-xl' placeholder='Insira seu email...'/>
            </div>
            <div className="w-full flex flex-row relative">
              <IoMdLock className='text-carbon-black absolute text-xl top-2.5 mx-1 2xl:text-2xl'/>
              <input type='password' className='w-full p-2 px-8 bg-transparent text-carbon-black font-outfit outline-none border-b-carbon-black border-b-2 placeholder:text-carbon-black 2xl:text-xl' placeholder='Insira sua senha...'/>
            </div>
          </div>

          <button type='submit' className='bg-azure-radiance-950 w-full p-2 my-2 rounded-lg font-outfit text-lg 2xl:text-xl 2xl:my-4'>Acessar</button>
          
          <div className='w-full mt-5 relative'>
            <span className='text-carbon-black 2xl:text-lg'>Não tem uma conta?</span>
            <span className='text-azure-radiance-600 absolute right-0 hover:cursor-pointer 2xl:text-lg'>Crie já a sua!</span>
          </div>

          </form>
        </div>

      </main>
    </div>
    </>
  );
};

export default LoginForm;