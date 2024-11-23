import { BsGraphUpArrow } from "react-icons/bs";
import { BsGraphDownArrow } from "react-icons/bs";
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

interface warnProps {
  id: string,
  title: string,
  subject: string,
}

function MainInfos() {

  authData();

  const [tasks, setTasks] = useState<tasksProps[]>([])
  const [warns, setWarns] = useState<warnProps[]>([])
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

    const token = localStorage.getItem('authToken');

    async function fetchTasks() {

      const response = await api.get("/list-tasks", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setTasks(response.data);

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

    async function fetchWarns() {
      const response = await api.get("/list-warns", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setWarns(response.data)
    };

    fetchWarns();
    fetchTasks();
  }, []);

  return (
    <>
      <section className="m-4 flex flex-col space-y-4 ">
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
          {warns.slice(0, 3).map((item) => (
            <article key={item.id} className="w-full bg-zinc-500 bg-opacity-30 rounded-md shadow-signature flex flex-col md:min-h-24 md:max-h-24">
              <div className="flex flex-col mx-4 my-2">
                <h1 className="text-carbon-black text-lg">
                  {item.title}
                </h1>
                <span className="text-carbon-black text-xs text-justify">
                  {item.subject}
                  <br />
                </span>
              </div>
            </article>
          ))}
          <div className="h-8 md:h-2"></div>
        </section>
      </div>
    </>
  )
}

export default MainInfos;