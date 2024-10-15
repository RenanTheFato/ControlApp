/// <reference types="vite-plugin-svgr/client" />
import { useState } from "react";
import Logo from "../public/logo.svg?react";
import { FaUser } from "react-icons/fa6";
import { FiMail } from "react-icons/fi";
import { IoMdLock } from "react-icons/io";
import { MdLightMode } from "react-icons/md";
import { FaMoon } from "react-icons/fa";

function SingUpForm() {
  const [darkMode, setDarkMode] = useState(false);

  function toggleTheme() {
    setDarkMode(!darkMode);
  }

  return (
    <>
      <div className={`${darkMode && "dark"}`}>
        <div
          className='w-full min-h-screen bg-off-white flex justify-center transition-colors duration-200 dark:bg-carbon-black'
        >
          <div className="right-6 absolute my-4">
            <button
              onClick={toggleTheme}
              className="text-carbon-black transition-all duration-200 ease-in-out dark:text-slate-50 2xl:text-xl"
            >
              {darkMode ? <MdLightMode /> : <FaMoon />}
            </button>
          </div>
          <main className="w-full mx-10 my-4 text-white flex flex-col items-center justify-center">
            <div className="w-full flex justify-center">
              <Logo className="fill-carbon-black w-32 h-32 justify-center items-center 2xl:w-48 2xl:h-48 dark:fill-off-white" />
            </div>

            <div className="w-full max-h-[80vh] bg-[#D9D9D9] bg-opacity-30 my-2 rounded-lg shadow-signature sm:w-96 2xl:w-[28rem] dark:shadow-azure-radiance-600">
              <form className="p-4 overflow-hidden">
                <div className="w-full h-10 flex justify-center items-center">
                  <h1 className="text-4xl font-outfit font-semibold text-carbon-black 2xl:text-5xl 2xl:mt-6 dark:text-off-white">
                    Cadastro
                  </h1>
                </div>

                <div className="w-full h-full flex flex-col space-y-6 my-5 2xl:mt-10 2xl:space-y-12">
                  <div className="w-full flex flex-row relative">
                    <FaUser className="text-carbon-black absolute text-xl top-2.5 mx-1 2xl:text-2xl dark:text-off-white" />
                    <input
                      type="text"
                      className="w-full p-2 px-8 bg-transparent text-carbon-black font-outfit outline-none border-b-carbon-black border-b-2 placeholder:text-carbon-black 2xl:text-xl dark:text-off-white dark:border-b-off-white dark:placeholder:text-off-white"
                      placeholder="Insira seu nome de usuário..."
                    />
                  </div>
                  <div className="w-full flex flex-row relative">
                    <FiMail className="text-carbon-black absolute text-xl top-2.5 mx-1 2xl:text-2xl dark:text-off-white" />
                    <input
                      type="email"
                      className="w-full p-2 px-8 bg-transparent text-carbon-black font-outfit outline-none border-b-carbon-black border-b-2 placeholder:text-carbon-black 2xl:text-xl dark:text-off-white dark:border-b-off-white dark:placeholder:text-off-white"
                      placeholder="Insira seu email..."
                    />
                  </div>
                  <div className="w-full flex flex-row relative">
                    <IoMdLock className="text-carbon-black absolute text-xl top-2.5 mx-1 2xl:text-2xl dark:text-off-white" />
                    <input
                      type="password"
                      className="w-full p-2 px-8 bg-transparent text-carbon-black font-outfit outline-none border-b-carbon-black border-b-2 placeholder:text-carbon-black 2xl:text-xl dark:text-off-white dark:border-b-off-white dark:placeholder:text-off-white"
                      placeholder="Crie sua senha..."
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="bg-bay-of-many-900 w-full p-2 mb-4 mt-2 rounded-lg font-outfit text-lg 2xl:text-xl 2xl:my-4"
                >
                  Cadastrar
                </button>

                <div className="w-full my-2 flex justify-between items-center">
                  <span className="text-carbon-black 2xl:text-lg dark:text-off-white">
                    Já tem uma conta?
                  </span>
                  <span className="text-azure-radiance-900 hover:cursor-pointer 2xl:text-lg dark:text-azure-radiance-300">
                    Faça login!
                  </span>
                </div>
              </form>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
export default SingUpForm;
