/// <reference types="vite-plugin-svgr/client" />
import Logo from '../public/logo.svg?react';

function LoginForm(){
  return(
    <>
    <div className="w-full min-h-screen bg-off-white flex justify-center">
      <main className="w-full m-10 text-white flex flex-col items-center justify-center">

        <div className="w-full flex justify-center">
        <Logo className='fill-carbon-black w-32 h-32 justify-center items-center sm:w-40 sm:h-40 md:w-40 md:h-40 2xl:w-52 2xl:h-52'/>
        </div>

        <div className="w-full h-full bg-slate-600 my-2 rounded-lg sm:w-96 lg:w-80 2xl:w-1/4 2xl:h-1/2">
          <form className='p-4'>
          <div className='w-full h-10 flex justify-center items-center'>
            <h1 className='text-4xl font-bold'>Login</h1>
          </div>
          <input type='email' placeholder='Insira seu email...'/>
          <input type='password' placeholder='Insira sua senha...'/>          
          <button type='submit'>Acessar</button>
          </form>
        </div>

      </main>
    </div>
    </>
  );
};

export default LoginForm;