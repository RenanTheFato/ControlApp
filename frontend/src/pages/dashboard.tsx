import Logo from "../public/logo.svg?react";

import { Link, Outlet, useLocation } from 'react-router-dom';

import { IoHome } from "react-icons/io5";
import { FaClipboardList } from "react-icons/fa";
import { VscGraph } from "react-icons/vsc";
import { FaCrown } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { authData } from "../hooks/authorization";


function Dashboard() {

  authData();

  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;


  return (
    <>
      <div className="w-full min-h-screen bg-off-white flex">

        <section className="w-full fixed bottom-4 left-0 right-10 flex flex-row z-10 md:relative md:top-0 md:w-auto md:h-screen">
          <nav className="w-full bg-off-white rounded shadow-signature mx-10 flex justify-between items-center md:w-72 md:flex-col md:items-start md:m-0 md:mr-2 md:space-y-1 md:justify-normal md:h-full">

            <div className={`ml-2 rounded items-center flex md:border-b-2 md:border-blue-200 md:w-full md:overflow-hidden md:ml-0 ${isActive("/dashboard") ? "bg-bay-of-many-900" : ""}`}>
              <Link to="/dashboard" className={`p-4 md:flex md:flex-row md:items-center md:space-x-2 md:w-full ${isActive("/dashboard") ? "text-white" : "text-carbon-black"}`}>
                <IoHome />
                <p className="hidden md:visible md:block">Home</p>
              </Link>
            </div>

            <div className={`p-4 items-center flex md:border-b-2 md:border-blue-200 md:w-full md:overflow-hidden md:ml-0 ${isActive("/dashboard/tasks") ? "bg-bay-of-many-900 rounded" : ""}`}>
              <Link to="tasks" className={`md:flex md:flex-row md:items-center md:space-x-2 md:w-full ${isActive("/dashboard/tasks") ? "text-white" : "text-carbon-black"}`}>
                <FaClipboardList />
                <p className="hidden md:visible md:block">Tarefas</p>
              </Link>
            </div>

            <div className={`p-4 items-center flex md:border-b-2 md:border-blue-200 md:w-full md:overflow-hidden md:ml-0 ${isActive("/statistics") ? "bg-bay-of-many-900" : ""}`}>
              <Link to="/statistics" className={`md:flex md:flex-row md:items-center md:space-x-2 md:w-full ${isActive("/statistics") ? "text-white" : "text-carbon-black"}`}>
                <VscGraph />
                <p className="hidden md:visible md:block">Estatísticas</p>
              </Link>
            </div>

            <div className={`p-4 items-center flex md:border-b-2 md:border-blue-200 md:w-full md:overflow-hidden md:ml-0 ${isActive("/plans") ? "bg-bay-of-many-900" : ""}`}>
              <Link to="/plans" className={`md:flex md:flex-row md:items-center md:space-x-2 md:w-full ${isActive("/plans") ? "text-white" : "text-carbon-black"}`}>
                <FaCrown />
                <p className="hidden md:visible md:block">Planos</p>
              </Link>
            </div>

            <div className={`p-4 items-center flex md:border-b-2 md:border-blue-200 md:w-full md:overflow-hidden md:ml-0 ${isActive("/profile") ? "bg-bay-of-many-900" : ""}`}>
              <Link to="/profile" className={`md:flex md:flex-row md:items-center md:space-x-2 md:w-full ${isActive("/profile") ? "text-white" : "text-carbon-black"}`}>
                <FaUser />
                <p className="hidden md:visible md:block">Seu Perfil</p>
              </Link>
            </div>

            <div className={`p-4 mr-2 items-center flex md:border-b-2 md:border-blue-200 md:w-full md:overflow-hidden md:mr-0 ${isActive("/settings") ? "bg-bay-of-many-900" : ""}`}>
              <Link to="/settings" className={`md:flex md:flex-row md:items-center md:space-x-2 md:w-full ${isActive("/settings") ? "text-white" : "text-carbon-black"}`}>
                <FaGear />
                <p className="hidden md:visible md:block">Configurações</p>
              </Link>
            </div>
          </nav>
        </section>

        <main className="w-full h-full  flex flex-col space-y-6 shadow-signature md:m-0 md:flex-grow md:overflow-y-auto md:min-h-screen">
          <div className="w-full p-4 flex flex-row shadow-lg justify-between items-center">
            <h1 className="font-outfit text-xl text-carbon-black">
              Bem Vindo {"Renan"} !
            </h1>
            <Logo className="fill-carbon-black w-16 h-16" />
          </div>

            <Outlet />
            
        </main>
      </div>
    </>
  );
}

export default Dashboard;
