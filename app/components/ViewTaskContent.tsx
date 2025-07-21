import { useEffect, Dispatch, SetStateAction } from "react"
import axios from "axios"

import { TrashIcon, PencilSquareIcon } from '@heroicons/react/24/outline'

import TaskType from "./../types/Task"

interface ViewTaskContentProps{

  setOpenTask: Dispatch<SetStateAction<boolean>>
  setOpen: Dispatch<SetStateAction<boolean>>
  setRefreshTable: Dispatch<SetStateAction<boolean>>
  refreshTable: boolean
  taskId: string
  setTask: Dispatch<SetStateAction<TaskType>>
  task: TaskType
  setEditMode: Dispatch<SetStateAction<boolean>>

}

export default function ViewTaskContent(props: ViewTaskContentProps){

  function concludeTask(){

    const data = JSON.stringify({
      
      query: `

        mutation{

          updateTask(id:"${props.taskId}", status: "Concluído"){

            id

          }

        }

      `,
      variables: {}

    });

    const config = {

      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://chave7tasks-ev6vlwhnu-caiosejours-projects.vercel.app/',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data

    };

    axios.request(config).then(res => {

      props.setRefreshTable(!props.refreshTable)

    })

    props.setOpenTask(false)

  }

  function reopenTask(){

    const data = JSON.stringify({
      
      query: `

        mutation{

          updateTask(id:"${props.taskId}", status: "Pendente"){

            id

          }

        }

      `,
      variables: {}

    });

    const config = {

      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://chave7tasks-ev6vlwhnu-caiosejours-projects.vercel.app/',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data

    };

    axios.request(config).then(res => {

      props.setRefreshTable(!props.refreshTable)

    })

    props.setOpenTask(false)

  }

  function editTask(){

    props.setEditMode(true)
    props.setOpenTask(false)
    props.setOpen(true)


  }

  function deleteTask(){

    const data = JSON.stringify({
      
      query: `

        mutation{

          deleteTask(id:"${props.taskId}")

        }

      `,
      variables: {}

    });

    const config = {

      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://chave7tasks-ev6vlwhnu-caiosejours-projects.vercel.app/',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data

    };

    axios.request(config).then(res => {

      props.setRefreshTable(!props.refreshTable)

    })
    
    props.setOpenTask(false)

  }

  function renderActionButton(){

    if(props.task.status == "Pendente"){

      return(
        
        <button
          type="button"
          onClick={() => concludeTask()}
          className="mt-3 ml-2 inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-green-500 sm:ml-3 sm:w-auto"
        >

          Concluir

        </button>
      )

    }else{

      return(
        
        <button
          type="button"
          onClick={() => reopenTask()}
          className="mt-3 ml-2 inline-flex w-full justify-center rounded-md bg-yellow-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-yellow-500 sm:ml-3 sm:w-auto"
        >

          Reabrir

        </button>
      )

    }

  }

  useEffect(() => {

    console.log('ID da tarefa: ' + props.taskId)

    const data = JSON.stringify({
      
      query: `

        query{

          task(id:"${props.taskId}"){

            id
            title
            description
            owner{

              id
              name
              surName
              photoUrl

            }
            status
            type
            createdAt

          }

        }

      `,
      variables: {}

    });

    const config = {

      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://chave7tasks-ev6vlwhnu-caiosejours-projects.vercel.app/',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data

    };

    axios.request(config).then(res => {

      console.log(res.data.data.task)
      props.setTask(res.data.data.task)

    })

  }, []);

  return(

    <form>

      <div className="mt-4 pb-2 grid gap-x-6 gap-y-8 grid-cols-6">
        
        {/* Tarefa */}
        <div className="col-span-full mt-4">

          <p className='text-base font-semibold text-gray-900'>Tarefa</p>

          <p className='mt-1 text-sm/6 text-gray-600'>{props.task.title}</p>
          
        </div>
        {/* Tarefa */}

        {/* Descrição */}
        <div className="col-span-full">

          <p className='text-base font-semibold text-gray-900'>Descrição</p>

          <p className='mt-1 text-sm/6 text-gray-600'>{props.task.description}</p>
          
        </div>
        {/* Descrição */}

        {/* Autor e Categoria */}
        <div className='flex col-span-full grid-cols-6 gap-4'>

            <div className="flex-1">

              <div className="flex min-w-0 gap-x-4">

                <div className="flex-col content-center">

                  <img alt="" src={props.task.owner.photoUrl} className="size-15 rounded-full border max-w-min" />


                </div>
                                    
                <div className="min-w-0 flex-auto">

                  <p className="text-sm/6 font-semibold text-gray-900">{props.task.owner.name + ' ' + props.task.owner.surName}</p>
                  <p className="mt-1 truncate text-xs/5 text-gray-500">Criado em {props.task.createdAt}</p>

                </div>

              </div>

            </div>

            <div className="flex-1 pr-2">

              <div className="flex flex-col items-end">

                  <p className="text-sm/6 text-gray-900">{props.task.type}</p>

                  {(props.task.status == "Pendente") ? (

                    <div className="mt-1 flex items-center gap-x-1.5">

                        <div className="flex-none rounded-full bg-red-500/20 p-1">
                          <div className="size-1.5 rounded-full bg-red-500" />
                        </div>

                        <p className="text-xs/5 text-gray-500">Pendente</p>

                    </div>

                  ) : (

                    <div className="mt-1 flex items-center gap-x-1.5">

                        <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                          <div className="size-1.5 rounded-full bg-emerald-500" />
                        </div>

                        <p className="text-xs/5 text-gray-500">Concluído</p>

                    </div>

                  )}

              </div>

            </div>

        </div>
        {/* Autor e Categoria */}

        {/* Botões */}
        <div className="col-span-full flex justify-between border-t pt-4 border-gray-200">
          
          <button
            type="button"
            onClick={() => props.setOpenTask(false)}
            className="mt-3 inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 w-auto"
          >

            Cancelar

          </button>

          <div className="flex">

            <button
              type="button"
              onClick={() => deleteTask()}
              className="mt-3 ml-2 inline-flex w-full justify-center rounded-md border border-red-600 px-3 py-2 text-sm font-semibold text-red-600 shadow-xs hover:bg-red-600 hover:text-white sm:ml-3 sm:w-auto"
            >

              <TrashIcon aria-hidden="true" className="size-5" />

            </button>

            <button
              type="button"
              onClick={() => editTask()}
              className="mt-3 ml-2 inline-flex w-full justify-center rounded-md border border-blue-600 text-blue-600 px-3 py-2 text-sm font-semibold shadow-xs hover:bg-blue-600 hover:text-white sm:ml-3 sm:w-auto"
            >

              <PencilSquareIcon aria-hidden="true" className="size-5" />

            </button>

            {renderActionButton()}

          </div>
          
          
        </div>
        {/* Botões */}

      </div>

    </form>
  )
}
