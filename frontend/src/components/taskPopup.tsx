import { IoMdClose } from "react-icons/io";

interface props {
  isOpen: boolean,
  taskName: string,
  taskDescription: string,
  taskRecipient: string,
  taskDeadline: string,
  taskStatus: number,
  taskPrice: string,
  onClose: () => void
}

function TaskPopup({ isOpen, taskName, taskDescription, taskRecipient, taskDeadline, taskPrice, taskStatus, onClose }: props) {

  if (isOpen) {
    return (
      <>
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-20 flex items-center justify-center cursor-default"
          onClick={onClose}>
          <div className="w-3/4 h-1/2 bg-off-white font-outfit flex flex-col shadow-signature rounded relative md:w-2/4 2xl:w-2/4"
            onClick={(e) => e.stopPropagation()}>

            <div className="font-bold text-xl text-carbon-black my-4 mx-2 flex flex-row items-center relative">
              <span>{taskName}</span>
              <button className="absolute right-0 bg-red-600 p-1 rounded-md flex items-center justify-center cursor-pointer"
                onClick={onClose}
              >
                <IoMdClose size={'25px'} />
              </button>
            </div>

            <div className="p-2 relative text-justify font-bold">Descrição:
              <span className="text-sm font-normal break-words">
                {taskDescription}
              </span>
            </div>

            <div className="p-2">Destinatário:
              <span className="text-sm font-normal"> {taskRecipient}</span>
            </div>

            <div className="bottom-2 left-2 absolute text-sm">Data de Entrega:
              <span className="text-sm font-normal"> {new Date(taskDeadline).toLocaleDateString('pt-BR')}</span>
            </div>

            <div className="p-2">Status:
              <span className="text-sm font-normal"> {taskStatus === 1 ? 'Pendente'
                : taskStatus === 2 ? 'Atrasada'
                  : taskStatus === 3 ? 'Concluída'
                    : 'Erro ao obter status'}
              </span>
            </div>

            <div className="bottom-2 right-2 absolute text-sm">Preço:
              <span className="text-sm font-normal"> R${taskPrice}</span>
            </div>
          </div>
        </div>
      </>
    )
  }

  return null;
}

export default TaskPopup;