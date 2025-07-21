'use client'

import Navbar from "./components/Nav"
import Indicators from "./components/Indicators"
import Table from "./components/Table"
import AddTaskForm from "./components/AddTaskForm"
import ViewTaskContent from "./components/ViewTaskContent"

import { useState, FormEvent } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { RectangleStackIcon, ViewfinderCircleIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline'

import TaskType from "./types/Task"

export default function Home(){

  const [open, setOpen] = useState(false)
  const [openTask, setOpenTask] = useState(false)
  const [refreshTalbe, setRefreshTable] = useState(false)

  const [taskId, setTaskId] = useState('')
  const [task, setTask] = useState<TaskType>({

    "id": "",
    "title": "",
    "description": "",
    "owner": {

      "id": "",
      "name": "",
      "surName": "",
      "photoUrl": ""

    },
    "status": "",
    "type": "",
    "createdAt": ""

  });
  const [editMode, setEditMode] = useState(false);

  const [filter, setFilter] = useState("All");

  function changeFilter(e: FormEvent){
    
    setFilter(e.target.value)

  }

  function openAddTaskModal(){
    
    setEditMode(false)
    setOpen(true)

  }
  
  return(

    <div>
      
      <Navbar/>

      <div className="p-4 md:mx-20 mx-0 mt-4">

        <Indicators refreshTable={refreshTalbe}/>

        {/* Add Task Button */}
        <section className="mt-10 flex justify-between align-center">

          <div>

            <select
              name="categorie"
              id="categorie"
              className="text-blue-500 text-sm py-3 pr-2 cursor-pointer"
              onChange={changeFilter}
            >
                
              <option value="All">Todos</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Pessoal">Pessoal</option>
              <option value="Estudos">Estudos</option>

            </select>

          </div>

          <a
            className="flex rounded-sm border border-blue-500 px-8 py-3 text-sm font-medium text-blue-500 hover:bg-blue-500 hover:text-white hover:border-blue-500"
            href="#"
            onClick={() => openAddTaskModal()}
          >

            <PlusIcon aria-hidden="true" className="size-5 mr-4" />

            Adicionar tarefa

          </a>

        </section>
        {/* Add Task Button */}

        {/* Tasks */}
        <section className="mt-4">

            <Table setOpenTask={setOpenTask} setTaskId={setTaskId} refreshTalbe={refreshTalbe} filter={filter}/>
            
        </section>
        {/* Tasks */}

      </div>

      {/* Modal para adicionar tarefa */}
      <Dialog open={open} onClose={setOpen} className="relative z-10">

        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">

          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in my-auto mx-0 w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                
                <div className="flex justify-between">

                  <div className="flex items-start">
                  
                    <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:size-10">
                      <RectangleStackIcon aria-hidden="true" className="size-6 text-blue-600" />
                    </div>

                    <div className="mt-0 ml-4 text-left">
                      
                      <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                        {editMode ? "Editar tarefa" : "Adicionar nova tarefa"}
                      </DialogTitle> 

                      <p className="mt-1 text-sm/6 text-gray-600">
                        Preencha com os dados da tarefa
                      </p>

                    </div>

                  </div>

                  <div className="flex items-start">

                    <XMarkIcon onClick={() => setOpen(false)} aria-hidden="true" className="size-5 cursor-pointer hover:text-gray-400" />

                  </div>

                </div>

                <AddTaskForm setOpen={setOpen} setRefreshTable={setRefreshTable} refreshTable={refreshTalbe} setEditMode={setEditMode} editMode={editMode} task={task}/>

              </div>

            </DialogPanel>

          </div>
          
        </div>

      </Dialog>
      {/* Modal para adicionar tarefa */}

      {/* Modal para visualizar tarefa */}
      <Dialog open={openTask} onClose={setOpenTask} className="relative z-10">

        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">

          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in my-auto mx-0 w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >

              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                
                <div className="flex justify-between">
                  
                  <div className="flex items-start">
                    
                    <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:size-10">
                      <ViewfinderCircleIcon aria-hidden="true" className="size-6 text-greren-600" />
                    </div>

                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      
                      <DialogTitle as="h3" className="text-base font-semibold text-gray-90 sm:mt-2 sm:ml-0 ml-3 mt-0">
                        Visualizar tarefa
                      </DialogTitle> 

                    </div>

                  </div>

                  <div className="flex items-start">

                    <XMarkIcon onClick={() => setOpenTask(false)} aria-hidden="true" className="size-5 cursor-pointer hover:text-gray-400" />

                  </div>

                </div>

                <ViewTaskContent setOpen={setOpen} setOpenTask={setOpenTask} setRefreshTable={setRefreshTable} refreshTable={refreshTalbe} taskId={taskId} setTask={setTask} task={task} setEditMode={setEditMode}/>

              </div>

            </DialogPanel>

          </div>
          
        </div>

      </Dialog>
      {/* Modal para visualizar tarefa */}

    </div>
  );

}
