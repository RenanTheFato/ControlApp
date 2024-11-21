import Logo from "../public/logo.svg?react";

import { BsGraphUpArrow } from "react-icons/bs";
import { BsGraphDownArrow } from "react-icons/bs";
import { IoHome } from "react-icons/io5";
import { FaClipboardList } from "react-icons/fa";
import { VscGraph } from "react-icons/vsc";
import { FaCrown } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { useEffect, useState } from "react";

import { api } from "../service/api";
import { authData } from "../hooks/authorization";
import TaskPopup from "../components/taskPopup";

interface tasksProps {
  id: string,
  name: string,
  description: string,
  deadline: string,
  price: string,
  status: number,
  recipient: string,
}

function Dashboard() {
  
  authData();

  const [tasks, setTasks] = useState<tasksProps[]>([])
  const [popupTaskId, setPopupTaskId] = useState<string | null>(null);
  const [sumPrice, setSumPrice] = useState<Number | null>(null);
  const [tasksCount, setTasksCount] = useState<Number | null>(null);
  const [pricePercentage, setPricePercentage] = useState<Number | null>(null);
  const [priceDifference, setPriceDifference] = useState<Number | null>(null);
  const [uncompletedTasks, setUncompletedTasks] = useState<Number | null>(null);
  const [completedTasks, setCompletedTasks] = useState<Number | null>(null);
  const [percentageUncompletedTasks, setPercentageUncompletedTasks] = useState<Number | null>(null);
  const [percentageCompletedTasks, setPercentageCompletedTasks] = useState<Number | null>(null);
  const closePopup = () => setPopupTaskId(null);

  useEffect(() => {
    async function fetchTasks() {
      const token = localStorage.getItem('authToken');

      const response = await api.get("/list-tasks", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setTasks(response.data)

      const now = new Date();
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(now.getDate() - 30);

      const sixtyDaysAgo = new Date();
      sixtyDaysAgo.setDate(now.getDate() - 60);

      const recentTasks = response.data.filter((task: tasksProps) => {
        const dueDate = new Date(task.deadline);
        return dueDate >= thirtyDaysAgo && dueDate <= now;
      });

      const previousTasks = response.data.filter((task: tasksProps) => {
        const dueDate = new Date(task.deadline);
        return dueDate >= sixtyDaysAgo && dueDate < thirtyDaysAgo;
      });

      const recentTotal = recentTasks.reduce((total: number, task: tasksProps) => {
        return total + parseFloat(task.price);
      }, 0);

      const previousTotal = previousTasks.reduce((total: number, task: tasksProps) => {
        return total + parseFloat(task.price);
      }, 0);

      const difference = recentTotal - previousTotal;
      const percentageChange = previousTotal > 0 ? (difference / previousTotal) * 100 : 0;

      setSumPrice(recentTotal);
      setPriceDifference(difference)
      setPricePercentage(percentageChange);

      const tasksCount = response.data.length;

      const uncompletedTasks = response.data.filter((task: tasksProps) => task.status === 1);
      const completedTasks = response.data.filter((task: tasksProps) => task.status === 2);

      const percentageUncompletedTasks = Number((uncompletedTasks.length / tasksCount) * 100);
      const percentageCompletedTasks = Number((completedTasks.length / tasksCount) * 100);

      setUncompletedTasks(uncompletedTasks.length)
      setCompletedTasks(completedTasks.length)
      setPercentageUncompletedTasks(percentageUncompletedTasks)
      setPercentageCompletedTasks(percentageCompletedTasks)
      setTasksCount(tasksCount);

    };

    fetchTasks();
  }, []);

  return (
    <>
      <div className="w-full min-h-screen bg-off-white flex">

        <section className="w-full fixed bottom-4 left-0 right-10 flex flex-row z-10 md:relative md:max-h-screen md:top-0 md:w-auto md:h-screen">
          <nav className="w-full bg-off-white rounded shadow-signature mx-10 flex justify-between items-center md:w-72 md:flex-col md:items-start md:m-0 md:mr-2 md:space-y-1 md:justify-normal md:h-full">

            <div className="ml-2 rounded items-center bg-bay-of-many-900 flex md:border-b-2 md:border-blue-200 md:w-full md:overflow-hidden md:ml-0">
              <button className="text-off-white p-4 md:flex md:flex-row md:items-center md:space-x-2 md:w-full">
                <IoHome />
                <p className="hidden text-white md:visible md:block">Home</p>
              </button>
            </div>

            <div className="p-4 items-center flex md:border-b-2 md:border-blue-200 md:w-full md:overflow-hidden md:ml-0">
              <button className="text-carbon-black md:flex md:flex-row md:items-center md:space-x-2 md:w-full">
                <FaClipboardList />
                <p className="hidden text-carbon-black md:visible md:block">Tarefas</p>
              </button>
            </div>

            <div className="p-4 items-center flex md:border-b-2 md:border-blue-200 md:w-full md:overflow-hidden md:ml-0">
              <button className="text-carbon-black md:flex md:flex-row md:items-center md:space-x-2 md:w-full">
                <VscGraph />
                <p className="hidden text-carbon-black md:visible md:block">Estatísticas</p>
              </button>
            </div>

            <div className="p-4 items-center flex md:border-b-2 md:border-blue-200 md:w-full md:overflow-hidden md:ml-0">
              <button className="text-carbon-black md:flex md:flex-row md:items-center md:space-x-2 md:w-full">
                <FaCrown />
                <p className="hidden text-carbon-black md:visible md:block">Planos</p>
              </button>
            </div>

            <div className="p-4 items-center flex md:border-b-2 md:border-blue-200 md:w-full md:overflow-hidden md:ml-0">
              <button className="text-carbon-black md:flex md:flex-row md:items-center md:space-x-2 md:w-full">
                <FaUser />
                <p className="hidden text-carbon-black md:visible md:block">Seu Perfil</p>
              </button>
            </div>

            <div className="p-4 mr-2 items-center flex md:border-b-2 md:border-blue-200 md:w-full md:overflow-hidden md:mr-0">
              <button className="text-carbon-black md:flex md:flex-row md:items-center md:space-x-2 md:w-full">
                <FaGear />
                <p className="hidden text-carbon-black md:visible md:block">Configurações</p>
              </button>
            </div>
          </nav>
        </section>

        <main className="w-full h-full m-4 flex flex-col space-y-6 shadow-signature md:m-0 md:flex-grow md:overflow-y-auto md:min-h-screen">
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
                  Tarefas Totais: {Number(tasksCount)}
                </h1>

                <div className="flex flex-col space-y-2 font-outfit">
                  <span className="text-xs">
                    Concluídas: {Number(completedTasks)} [{Number(percentageCompletedTasks).toFixed(2) + "%"}]
                  </span>
                  <span className="text-xs">
                    Pendentes: {Number(uncompletedTasks)} [{Number(percentageUncompletedTasks).toFixed(2) + "%"}]
                  </span>
                </div>
              </div>

              <div className="w-full flex flex-col px-4 py-3 font-outfit space-y-1 border-l-2 border-l-carbon-black">
                <span className="text-left text-sm">Saldo Esperado</span>
                <div className="flex flex-row items-center justify-between">
                  <span className="font-semibold">{Number(sumPrice)}</span>
                  <div className="flex flex-row items-center justify-between">
                    <span
                      className={`text-center mx-2 ${Number(priceDifference) >= 1 ? "text-green-600" : "text-red-400"
                        }`}
                    >
                      {Number(priceDifference) >= 1 ? <BsGraphUpArrow /> : <BsGraphDownArrow />}
                    </span>
                    <span
                      className={`text-center text-xs ${Number(priceDifference) >= 1 ? "text-green-600" : "text-red-400"
                        }`}
                    >
                      [{Number(pricePercentage).toFixed(2)}]
                    </span>
                  </div>
                </div>
                <span className="text-xs">Últimos 30 dias</span>
              </div>
            </div>
          </section>

          <div className="flex flex-col md:flex-row">
            <section className="md:w-full m-4 py-4 font-outfit font-semibold space-y-4">
              <h1 className="text-carbon-black -mt-6 mb-6 md:mb-2">Principais Tarefas</h1>
              {tasks.slice(0, 3).map((item) => (
                <article key={item.id}
                  className="w-full bg-zinc-500 bg-opacity-30 rounded-md shadow-signature flex flex-col md:min-h-24 md:max-h-24 cursor-pointer"
                  onClick={() => setPopupTaskId(item.id)}>
                  <div className="flex flex-col mx-4 my-2">
                    <h1 className="text-carbon-black text-lg">
                      {item.name}
                    </h1>
                    <span className="text-carbon-black text-xs">
                      {item.recipient}
                    </span>
                  </div>
                  <div className="flex flex-row items-center justify-between mx-4 mb-2 md:mt-2">
                    <span className="text-carbon-black text-sm">
                      {new Date(item.deadline).toLocaleDateString('pt-BR')}
                    </span>
                    <span className="text-carbon-black text-sm font-semibold">
                      R$: {parseFloat(item.price)}
                    </span>
                  </div>
                  {popupTaskId === item.id && (
                    <TaskPopup
                      isOpen={true}
                      taskName={item.name}
                      taskDescription={item.description}
                      taskDeadline={item.deadline}
                      taskRecipient={item.recipient}
                      taskPrice={item.price}
                      taskStatus={item.status}
                      onClose={closePopup}
                    />
                  )}
                </article>
              ))}
            </section>

            <section className="md:w-full m-4 py-4 font-outfit font-semibold space-y-4 md:mb-0">
              <h1 className="text-carbon-black -mt-6 mb-6 md:mb-2">Avisos</h1>
              <article className="w-full bg-zinc-500 bg-opacity-30 rounded-md shadow-signature flex flex-col md:min-h-24 md:max-h-24">
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

              <article className="w-full bg-zinc-500 bg-opacity-30 rounded-md shadow-signature flex flex-col md:min-h-24 md:max-h-24">
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

              <article className="w-full bg-zinc-500 bg-opacity-30 rounded-md shadow-signature flex flex-col md:min-h-24 md:max-h-24">
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
        </main>

      </div>
    </>
  );
}

export default Dashboard;
