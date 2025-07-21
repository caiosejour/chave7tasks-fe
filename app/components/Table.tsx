import { useEffect, useState } from "react"

import axios from "axios"

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'

interface tableProps{

  setOpenTask: Function
  setTaskId: Function
  refreshTalbe: Boolean
  filter: String

}

export default function TasksTable(props: tableProps){

  const [tasks, setTasks] = useState([])

  const [offset, setOffset] = useState<Number>(0)
  const [totalTasks, setTotalTasks] = useState<Number>(0)
  
  function triggerModal(taskId: String){

    props.setOpenTask(true)
    props.setTaskId(taskId)

  }

  function changeOffset(operation: String){

    if(operation === "+"){

      if(!((+offset + 11) > (+totalTasks))){

        setOffset(+offset + 10)

      }

    }else{

      if(!(+offset == 0)){

        setOffset(+offset - 10)

      }

    }

  }

  function getTasks(){

    const data = JSON.stringify({
      
      query: `

        query{

            tasks(filter:"${props.filter}", offset: ${offset}, limit: 10){

              tasks{

                id
                title
                description
                owner{

                  name
                  surName
                  photoUrl

                }
                status
                type
                createdAt

              }
                
              totalFiltered

            }

        }

      `,
      variables: {}

    });

    const config = {

      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:4000',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data

    };

    axios.request(config).then(res => {

      setTasks(res.data.data.tasks.tasks)
      setTotalTasks(res.data.data.tasks.totalFiltered)

    })

  }

  //Muda o filtro e reseta a paginação
  useEffect(() => {

    setOffset(0)

    getTasks()

  },[props.filter])
  
  //Muda o paginação sem remover o filtro
  useEffect(() => {

    getTasks()

  }, [props.refreshTalbe, offset]);
  
  return (

    <div className="">

        <ul role="list" className="divide-y divide-gray-100">

          {tasks.map((task) => (

              <li key={task.id} className="">

                <a onClick={() => triggerModal(task.id)} className='flex justify-between align-middle gap-x-6 py-5 cursor-pointer hover:bg-gray-100 px-4'>
              
                  <div className="flex min-w-0 gap-x-4">

                      <div className="flex-col content-center">

                        <img alt="" src={task.owner.photoUrl} className="size-15 rounded-full border max-w-min"/>

                      </div>
                                          
                      <div className="min-w-0 flex-auto">

                        <p className="mt-1 truncate text-xs/5 text-gray-500">{task.createdAt}</p>
                        <p className="text-sm/6 font-semibold text-gray-900">{task.title}</p>
                        <p className="mt-1 truncate text-xs/5 text-gray-500">{task.description}</p>

                      </div>

                  </div>

                  <div className="shrink-0 flex flex-col items-end">

                      <p className="text-sm/6 text-gray-900">{task.type}</p>

                      <p className="mt-1 truncate text-xs/5 text-gray-500">{task.owner.name + ' ' + task.owner.surName}</p>

                      {(task.status == "Pendente") ? (

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

                </a>

              </li>

          ))}

        </ul>

        {/* Paginação */}
        <div className="flex items-center justify-between py-4">

          <div className="flex flex-1 items-center justify-between">
              <div>
              <p className="text-sm text-gray-700">
                  Mostrando de <span className="font-medium">{(+offset + 1)}</span> a <span className="font-medium">{(+offset + 10)}</span> de{' '}
                  <span className="font-medium">{totalTasks.toString()}</span> resultados
              </p>

              </div>
              <div>

                <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md shadow-xs">
                    
                    <a
                    onClick={() => changeOffset("-")}
                    className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    >

                      <span className="sr-only">Previous</span>
                      <ChevronLeftIcon aria-hidden="true" className="size-5" />

                    </a>
                    
                    <a
                    onClick={() => changeOffset("+")}
                    className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    >

                      <span className="sr-only">Next</span>
                      <ChevronRightIcon aria-hidden="true" className="size-5" />

                    </a>

                </nav>
                
              </div>
          </div>
          
        </div>
        {/* Paginação */}


    </div>
  )
}