import { useEffect, useState } from "react";
import TaskPopup from "../components/taskPopup";
import { api } from "../service/api";

function Tasks() {

  interface tasksProps {
    id: string,
    name: string,
    description: string,
    deadline: string,
    price: string,
    status: number,
    recipient: string,
  }

  const [tasks, setTasks] = useState<tasksProps[]>([])
  const [popupTaskId, setPopupTaskId] = useState<string | null>(null);
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


    };
    fetchTasks();
  }, []);
  return (
    <>
      <div className="w-full h-screen relative">
        <h1 className="font-outfit font-bold text-xl text-carbon-black mx-4 mb-4">Suas Tarefas</h1>
        <div className="w-full px-4 relative my-2 p-2 shadow-md">
          <nav className="flex flex-row justify-between items-center">

            <div className="bg-yellow-400 p-2 rounded-lg flex flex-row items-center justify-center space-x-2 cursor-pointer select-none">
              <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
              <h1 className="text-off-white">
                Pendentes
              </h1>
            </div>

            <div className="bg-green-400 p-2 rounded-lg flex flex-row items-center justify-center space-x-2 cursor-pointer select-none">
              <div className="w-4 h-4 bg-green-600 rounded-full"></div>
              <h1 className="text-off-white">
                Concluídas
              </h1>
            </div>

            <div className="bg-red-400 p-2 rounded-lg flex flex-row items-center justify-center space-x-2 cursor-pointer select-none">
              <div className="w-4 h-4 bg-red-700 rounded-full"></div>
              <h1 className="text-off-white">
                Atrasadas
              </h1>
            </div>
          </nav>
        </div>

        <section className="md:w-full m-4 py-4 font-outfit font-semibold space-y-4">
          {tasks.map((item) => (
            <article key={item.id}
              className="w-full bg-slate-400 bg-opacity-30 rounded-md shadow-signature flex flex-col md:min-h-24 md:max-h-24 cursor-pointer"
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

      </div>
    </>
  )
}

export default Tasks;