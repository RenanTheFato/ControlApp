import Logo from '../public/logo.svg?react'

import { BsGraphUpArrow } from "react-icons/bs";
import { BsGraphDownArrow } from "react-icons/bs";

const number = -1;

function Dashboard(){
  return(
    <>
      <div className="w-full min-h-screen bg-off-white flex">
        <main className="w-full max-h-[100vh] m-4 flex flex-col space-y-6 shadow-signature">
          <div className="w-full p-4 flex flex-row shadow-lg justify-between items-center">
            <h1 className="font-outfit text-xl text-carbon-black">
              Bem Vindo {'Renan'} !
            </h1>
              <Logo className='fill-carbon-black w-16 h-16'/>
          </div>
          <section className='w-full p-4 bg-off-white flex flex-col space-y-4'>
            <h1 className='font-outfit text-lg text-carbon-black'>Visão Geral</h1>
            <div className='w-full h-[16vh] rounded bg-zinc-500 bg-opacity-30 flex flex-row shadow-lg'>

              <div className=' w-full px-4 py-3 flex flex-col space-y-1 font-outfit'>
                <h1 className='text-carbon-black font-semibold'>
                  Tarefas Totais: {'16'}
                </h1>
                <div className='flex flex-col space-y-2 font-outfit'>
                  <span className='text-xs'>Concluídas: {'12'} [{'75%'}]</span>
                  <span className='text-xs'>Pendentes: {'12'} [{'25%'}]</span>
                </div>
              </div>

              <div className='w-full flex flex-col px-4 py-3 font-outfit space-y-1 border-l-2 border-l-carbon-black'>
                <span className='text-left text-sm'>Saldo Esperado</span>
                <div className='flex flex-row items-center justify-between'>
                  <span className='font-semibold'>{'R$: 120,00'}</span>
                  <div className='flex flex-row items-center justify-between'>
                  <span className={`text-center mx-2 ${number >= 1 ? 'text-green-600' : 'text-red-400' }`}>{number >= 1 ? <BsGraphUpArrow /> : <BsGraphDownArrow />}</span>
                  <span className={`text-center text-xs ${number >= 1 ? 'text-green-600' : 'text-red-400' }`}>[50%]</span>
                  </div>
                </div>
                <span className='text-xs'>Últimos 30 dias</span>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

export default Dashboard;