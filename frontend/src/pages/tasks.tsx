import { useEffect, useState } from "react";
import TaskPopup from "../components/taskPopup";
import { api } from "../service/api";

function Tasks() {
  interface tasksProps {
    id: string;
    name: string;
    description: string;
    deadline: string;
    price: string;
    status: number;
    recipient: string;
  }

  const [tasks, setTasks] = useState<tasksProps[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<tasksProps[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<number | null>(null);
  const [popupTaskId, setPopupTaskId] = useState<string | null>(null);

  const closePopup = () => setPopupTaskId(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    async function fetchTasks() {
      const response = await api.get("/list-tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const sortTasks = response.data.sort((a: tasksProps, b: tasksProps) => {
        const order = { 3: 1, 1: 2, 2: 3 };
        return order[a.status as 1 | 2 | 3] - order[b.status as 1 | 2 | 3];
      });

      setTasks(sortTasks);
      setFilteredTasks(sortTasks);
    }

    fetchTasks();
  }, []);

  function filterTasksByStatus(status: number | null){
    setSelectedStatus(status);
    if (status === null) {
      setFilteredTasks(tasks);
    } else {
      setFilteredTasks(tasks.filter((task) => task.status === status));
    }
  };

  return (
    <>
      <div className="w-full h-full relative overflow-scroll overflow-x-hidden">
        <h1 className="font-outfit font-bold text-xl text-carbon-black mx-4 mb-4">
          Suas Tarefas
        </h1>
        <div className="w-full px-4 relative my-2 p-2 shadow-md">
          <nav className="flex flex-row items-center justify-between space-x-2">

            <div className={`p-2 rounded-lg flex flex-row items-center justify-center space-x-2 cursor-pointer select-none 
                ${selectedStatus === 3 ? "bg-red-600" : "bg-red-400"}`}
                onClick={() => filterTasksByStatus(3)}>
              <div className="w-4 h-4 bg-red-700 rounded-full"></div>
              <h1 className="text-off-white">Atrasadas</h1>
            </div>

            <div className={`p-2 rounded-lg flex flex-row items-center justify-center space-x-2 cursor-pointer select-none 
                ${selectedStatus === 1 ? "bg-yellow-600" : "bg-yellow-400"}`}
                onClick={() => filterTasksByStatus(1)}>
              <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
              <h1 className="text-off-white">Pendentes</h1>
            </div>

            <div className={`p-2 rounded-lg flex flex-row items-center justify-center space-x-2 cursor-pointer select-none 
                ${selectedStatus === 2 ? "bg-green-800" : "bg-green-400"}`}
                onClick={() => filterTasksByStatus(2)}>
              <div className="w-4 h-4 bg-green-600 rounded-full"></div>
              <h1 className="text-off-white">Concluídas</h1>
            </div>

            <div className="p-2 rounded-lg flex flex-row items-center justify-center space-x-2 cursor-pointer select-none bg-gray-400"
              onClick={() => filterTasksByStatus(null)}>
              <h1 className="text-off-white">Todas</h1>
            </div>
          </nav>
        </div>

        <section className="h-screen m-4 py-4 font-outfit font-semibold space-y-4 md:h-full">
          {filteredTasks.map((item) => (
            <article
              key={item.id}
              className="w-full bg-slate-400 bg-opacity-30 rounded-md shadow-signature flex flex-col md:min-h-24 md:max-h-24 last:mb-28 cursor-pointer"
              onClick={() => setPopupTaskId(item.id)}
            >
              <div className="flex flex-col mx-4 my-2">
                <div className="flex flex-row justify-between items-center">
                  <h1 className="text-carbon-black text-lg">{item.name}</h1>

                  <div
                    className={`p-1 rounded-lg flex flex-row items-center justify-center space-x-2 cursor-pointer select-none ${
                      item.status === 1
                        ? "bg-yellow-400"
                        : item.status === 2
                        ? "bg-green-400"
                        : "bg-red-400"
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${
                        item.status === 1
                          ? "bg-yellow-500"
                          : item.status === 2
                          ? "bg-green-600"
                          : "bg-red-700"
                      }`}
                    ></div>
                    <h1 className="text-off-white text-xs">
                      {item.status === 1
                        ? "Pendente"
                        : item.status === 2
                        ? "Concluída"
                        : "Atrasada"}
                    </h1>
                  </div>
                </div>
                <span className="text-carbon-black text-xs">
                  {item.recipient}
                </span>
              </div>
              <div className="flex flex-row items-center justify-between mx-4 mb-2 md:mt-2">
                <span className="text-carbon-black text-sm">
                  {new Date(item.deadline).toLocaleDateString("pt-BR")}
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
          <div className="h-16 md:h-2"></div>
        </section>
      </div>
    </>
  );
}

export default Tasks;
