import { useEffect, useState } from "react"
import axios from "axios"

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'

interface tableProps{

  setOpenTask: Function
  setTaskId: Function
  refreshTalbe: Boolean

}

export default function TasksTable(props: tableProps){

  const [tasks, setTasks] = useState([]);
  
  function triggerModal(taskId: String){

    props.setOpenTask(true)
    props.setTaskId(taskId)

  }
  
  useEffect(() => {

    const data = JSON.stringify({
      
      query: `

        query{

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

      console.log(res.data.data.tasks)

      console.log(res.data.data.user)


      setTasks(res.data.data.tasks)

    })

  }, [props.refreshTalbe]);
  
  return (

    <div>

        <ul role="list" className="divide-y divide-gray-100">

          {tasks.map((task) => (

              <li key={task.id} className="">

                <a onClick={() => triggerModal(task.id)} className='flex justify-between align-middle gap-x-6 py-5 cursor-pointer'>
              
                  <div className="flex min-w-0 gap-x-4">

                      <div className="flex-col content-center">

                        <img alt="" src={task.owner.photoUrl} className="size-15 rounded-full border"/>

                      </div>
                                          
                      <div className="min-w-0 flex-auto">

                        <p className="mt-1 truncate text-xs/5 text-gray-500">{task.createdAt}</p>
                        <p className="text-sm/6 font-semibold text-gray-900">{task.title}</p>
                        <p className="mt-1 truncate text-xs/5 text-gray-500">{task.description}</p>

                      </div>

                  </div>

                  <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">

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

          <div className="flex flex-1 justify-between sm:hidden">
              <a
              href="#"
              className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
              Previous
              </a>
              <a
              href="#"
              className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
              Next
              </a>
          </div>

          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
              <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
                  <span className="font-medium">97</span> results
              </p>
              </div>
              <div>
              <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md shadow-xs">
                  <a
                  href="#"
                  className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  >
                  <span className="sr-only">Previous</span>
                  <ChevronLeftIcon aria-hidden="true" className="size-5" />
                  </a>
                  {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
                  <a
                  href="#"
                  aria-current="page"
                  className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                  1
                  </a>
                  <a
                  href="#"
                  className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  >
                  2
                  </a>
                  <a
                  href="#"
                  className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                  >
                  3
                  </a>
                  <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-gray-300 ring-inset focus:outline-offset-0">
                  ...
                  </span>
                  <a
                  href="#"
                  className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                  >
                  8
                  </a>
                  <a
                  href="#"
                  className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  >
                  9
                  </a>
                  <a
                  href="#"
                  className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  >
                  10
                  </a>
                  <a
                  href="#"
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