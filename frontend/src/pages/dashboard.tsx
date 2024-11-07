import Logo from "../public/logo.svg?react";

import { BsGraphUpArrow } from "react-icons/bs";
import { BsGraphDownArrow } from "react-icons/bs";
import { IoHome } from "react-icons/io5";
import { FaClipboardList } from "react-icons/fa";
import { VscGraph } from "react-icons/vsc";
import { FaCrown } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { useEffect } from "react";

function Dashboard() {
  const number = -1;

  useEffect(() => {
    const handleScroll = (event: any) => {
      event.preventDefault();
      window.scrollBy({
        top: event.deltaY * 0.2,
        behavior: "smooth",
      });
    };

    window.addEventListener("wheel", handleScroll);
    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="w-full min-h-screen bg-off-white flex">
        
        <section className="w-full fixed bottom-4 left-0 right-10 flex flex-row z-10 2xl:relative 2xl:max-h-screen 2xl:top-2 2xl:w-auto">
          <nav className="w-full bg-off-white rounded shadow-signature mx-10 flex justify-between items-center 2xl:w-72 2xl:flex-col 2xl:items-start 2xl:mx-2 2xl:space-y-1 2xl:justify-normal">

            <div className="ml-2 rounded items-center bg-bay-of-many-900 flex 2xl:border-b-2 2xl:border-blue-200 2xl:w-full 2xl:overflow-hidden 2xl:ml-0">
              <button className="text-off-white p-4 2xl:flex 2xl:flex-row 2xl:items-center 2xl:space-x-2 2xl:w-full">
                <IoHome />
                <p className="hidden text-white 2xl:visible 2xl:block">Home</p>
              </button>
            </div>

            <div className="p-4 items-center flex 2xl:border-b-2 2xl:border-blue-200 2xl:w-full 2xl:overflow-hidden 2xl:ml-0">
              <button className="text-carbon-black 2xl:flex 2xl:flex-row 2xl:items-center 2xl:space-x-2 2xl:w-full">
                <FaClipboardList />
                <p className="hidden text-carbon-black 2xl:visible 2xl:block">Tarefas</p>
              </button>
            </div>

            <div className="p-4 items-center flex 2xl:border-b-2 2xl:border-blue-200 2xl:w-full 2xl:overflow-hidden 2xl:ml-0">
              <button className="text-carbon-black 2xl:flex 2xl:flex-row 2xl:items-center 2xl:space-x-2 2xl:w-full">
                <VscGraph />
                <p className="hidden text-carbon-black 2xl:visible 2xl:block">Estatísticas</p>
              </button>
            </div>

            <div className="p-4 items-center flex 2xl:border-b-2 2xl:border-blue-200 2xl:w-full 2xl:overflow-hidden 2xl:ml-0">
              <button className="text-carbon-black 2xl:flex 2xl:flex-row 2xl:items-center 2xl:space-x-2 2xl:w-full">
                <FaCrown />
                <p className="hidden text-carbon-black 2xl:visible 2xl:block">Planos</p>
              </button>
            </div>

            <div className="p-4 items-center flex 2xl:border-b-2 2xl:border-blue-200 2xl:w-full 2xl:overflow-hidden 2xl:ml-0">
              <button className="text-carbon-black 2xl:flex 2xl:flex-row 2xl:items-center 2xl:space-x-2 2xl:w-full">
                <FaUser />
                <p className="hidden text-carbon-black 2xl:visible 2xl:block">Seu Perfil</p>
              </button>
            </div>



            <div className="p-4 mr-2 items-center flex 2xl:border-b-2 2xl:border-blue-200 2xl:w-full 2xl:overflow-hidden 2xl:mr-0">
              <button className="text-carbon-black 2xl:flex 2xl:flex-row 2xl:items-center 2xl:space-x-2 2xl:w-full">
                <FaGear />
                <p className="hidden text-carbon-black 2xl:visible 2xl:block">Configurações</p>
              </button>
            </div>
          </nav>
        </section>
        
        <main className="w-full h-full m-4 flex flex-col space-y-6 shadow-signature 2xl:m-2">
          <div className="w-full p-4 flex flex-row shadow-lg justify-between items-center">
            <h1 className="font-outfit text-xl text-carbon-black">
              Bem Vindo {"Renan"} !
            </h1>
            <Logo className="fill-carbon-black w-16 h-16" />
          </div>

          <section className="m-4 flex flex-col space-y-4">
            <h1 className="font-outfit font-semibold text-lg text-carbon-black">
              Visão Geral
            </h1>
            <div className="w-full rounded bg-zinc-500 bg-opacity-30 flex flex-row shadow-lg">
              <div className="w-full px-4 py-3 flex flex-col space-y-1 font-outfit">
                <h1 className="text-carbon-black font-semibold">
                  Tarefas Totais: {"16"}
                </h1>

                <div className="flex flex-col space-y-2 font-outfit">
                  <span className="text-xs">
                    Concluídas: {"12"} [{"75%"}]
                  </span>
                  <span className="text-xs">
                    Pendentes: {"12"} [{"25%"}]
                  </span>
                </div>
              </div>

              <div className="w-full flex flex-col px-4 py-3 font-outfit space-y-1 border-l-2 border-l-carbon-black">
                <span className="text-left text-sm">Saldo Esperado</span>
                <div className="flex flex-row items-center justify-between">
                  <span className="font-semibold">{"R$: 120,00"}</span>
                  <div className="flex flex-row items-center justify-between">
                    <span
                      className={`text-center mx-2 ${number >= 1 ? "text-green-600" : "text-red-400"
                        }`}
                    >
                      {number >= 1 ? <BsGraphUpArrow /> : <BsGraphDownArrow />}
                    </span>
                    <span
                      className={`text-center text-xs ${number >= 1 ? "text-green-600" : "text-red-400"
                        }`}
                    >
                      [50%]
                    </span>
                  </div>
                </div>
                <span className="text-xs">Últimos 30 dias</span>
              </div>
            </div>
          </section>

          <div className="flex flex-col 2xl:flex-row">
            <section className="2xl:w-full m-4 py-4 font-outfit font-semibold space-y-4">
              <h1 className="text-carbon-black -mt-6 mb-6 2xl:mb-2">Principais Tarefas</h1>

              <article className="w-full  bg-zinc-500 bg-opacity-30 rounded-md shadow-signature flex flex-col 2xl:min-h-24 2xl:max-h-24">
                <div className="flex flex-col mx-4 my-2">
                  <h1 className="text-carbon-black text-lg">
                    {"{Titulo da Tarefa}"}
                  </h1>
                  <span className="text-carbon-black text-xs">
                    {"{Destinatário}"}
                  </span>
                </div>
                <div className="flex flex-row items-center justify-between mx-4 mb-2 2xl:mt-2">
                  <span className="text-carbon-black text-sm">
                    {"{Data de Entrega}"}
                  </span>
                  <span className="text-carbon-black text-sm font-semibold">
                    {"{Valor}"}
                  </span>
                </div>
              </article>

              <article className="w-full bg-zinc-500 bg-opacity-30 rounded-md shadow-signature flex flex-col 2xl:min-h-24 2xl:max-h-24">
                <div className="flex flex-col mx-4 my-2">
                  <h1 className="text-carbon-black text-lg">
                    {"{Titulo da Tarefa}"}
                  </h1>
                  <span className="text-carbon-black text-xs">
                    {"{Destinatário}"}
                  </span>
                </div>
                <div className="flex flex-row items-center justify-between mx-4 mb-2 2xl:mt-2">
                  <span className="text-carbon-black text-sm">
                    {"{Data de Entrega}"}
                  </span>
                  <span className="text-carbon-black text-sm font-semibold">
                    {"{Valor}"}
                  </span>
                </div>
              </article>

              <article className="w-full bg-zinc-500 bg-opacity-30 rounded-md shadow-signature flex flex-col 2xl:min-h-24 2xl:max-h-24">
                <div className="flex flex-col mx-4 my-2">
                  <h1 className="text-carbon-black text-lg">
                    {"{Titulo da Tarefa}"}
                  </h1>
                  <span className="text-carbon-black text-xs">
                    {"{Destinatário}"}
                  </span>
                </div>
                <div className="flex flex-row items-center justify-between mx-4 mb-2 2xl:mt-2">
                  <span className="text-carbon-black text-sm">
                    {"{Data de Entrega}"}
                  </span>
                  <span className="text-carbon-black text-sm font-semibold">
                    {"{Valor}"}
                  </span>
                </div>
              </article>
            </section>
            
            
            <section className="2xl:w-full m-4 py-4 font-outfit font-semibold space-y-4 2xl:mb-0">
              <h1 className="text-carbon-black -mt-6 mb-6 2xl:mb-2">Avisos</h1>
              <article className="w-full bg-zinc-500 bg-opacity-30 rounded-md shadow-signature flex flex-col 2xl:min-h-24 2xl:max-h-24">
                <div className="flex flex-col mx-4 my-2">
                  <h1 className="text-carbon-black text-lg">
                    {"{Titulo do Aviso}"}
                  </h1>
                  <span className="text-carbon-black text-xs text-justify">
                    {
                      "{Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius quia optio molestias, neque numquam nisi quaerat esse suscipit delectus consectetur qui rerum fugiat, saepe officiis perspiciatis repudiandae ut at ad?}"
                    }
                    <br />
                  </span>
                </div>
              </article>

              <article className="w-full bg-zinc-500 bg-opacity-30 rounded-md shadow-signature flex flex-col 2xl:min-h-24 2xl:max-h-24">
                <div className="flex flex-col mx-4 my-2">
                  <h1 className="text-carbon-black text-lg">
                    {"{Titulo do Aviso}"}
                  </h1>
                  <span className="text-carbon-black text-xs text-justify">
                    {
                      "{Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius quia optio molestias, neque numquam nisi quaerat esse suscipit delectus consectetur qui rerum fugiat, saepe officiis perspiciatis repudiandae ut at ad?}"
                    }
                    <br />
                  </span>
                </div>
              </article>

              <article className="w-full bg-zinc-500 bg-opacity-30 rounded-md shadow-signature flex flex-col 2xl:min-h-24 2xl:max-h-24">
                <div className="flex flex-col mx-4 my-2">
                  <h1 className="text-carbon-black text-lg">
                    {"{Titulo do Aviso}"}
                  </h1>
                  <span className="text-carbon-black text-xs text-justify">
                    {
                      "{Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius quia optio molestias, neque numquam nisi quaerat esse suscipit delectus consectetur qui rerum fugiat, saepe officiis perspiciatis repudiandae ut at ad?}"
                    }
                    <br />
                  </span>
                </div>
              </article>
            </section>
          </div>

          <footer className="w-full bg-gray-200 text-center p-4 mt-2 z-20 2xl:m-0">
            <p className="text-gray-600 font-outfit text-sm">
              © {new Date().getFullYear()} Domain's Productions. Todos os
              direitos reservados.
            </p>
          </footer>
        </main>

      </div>
    </>
  );
}

export default Dashboard;
