import Image from 'next/image'

import { useEffect, useState } from "react"
import axios from "axios"

import FotoCaio from "@/app/assets/fotoCaio.jpg";

interface ViewTaskContentProps{

  taskId: String

}

export default function ViewTaskContent(props: ViewTaskContentProps){

  const [task, setTask] = useState({

    "id": "",
    "title": "",
    "description": "",
    "ownerId": "",
    "status": "",
    "type": "",
    "createdAt": ""

  });

  useEffect(() => {

    console.log('ID da tarefa: ' + props.taskId)

    const data = JSON.stringify({
      
      query: `

        query{

          task(id:"${props.taskId}"){

            id
            title
            description
            ownerId
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

      console.log(res.data.data.task)
      setTask(res.data.data.task)

    })

  }, []);

  return(

    <form>

      <div className="mt-4 pb-2 grid gap-x-6 gap-y-8 grid-cols-6">
        
        {/* Tarefa */}
        <div className="col-span-full mt-4">

          <p className='text-base font-semibold text-gray-900'>Tarefa</p>

          <p className='mt-1 text-sm/6 text-gray-600'>{task.title}</p>
          
        </div>
        {/* Tarefa */}

        {/* Descrição */}
        <div className="col-span-full">

          <p className='text-base font-semibold text-gray-900'>Descrição</p>

          <p className='mt-1 text-sm/6 text-gray-600'>{task.description}</p>
          
        </div>
        {/* Descrição */}


        {/* Autor e Categoria */}
        <div className='flex col-span-full grid-cols-6 gap-4'>

            <div className="flex-1">

              <div className="flex min-w-0 gap-x-4">

                <div className="flex-col content-center">

                  <Image alt="" src={FotoCaio} className="size-12 rounded-full" />

                </div>
                                    
                <div className="min-w-0 flex-auto">

                  <p className="text-sm/6 font-semibold text-gray-900">{task.ownerId}</p>
                  <p className="mt-1 truncate text-xs/5 text-gray-500">Criado em {task.createdAt}</p>

                </div>

              </div>

            </div>

            <div className="flex-1 pr-2">

              <div className="flex sm:flex-col sm:items-end">

                  <p className="text-sm/6 text-gray-900">{task.type}</p>

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

            </div>

        </div>
        {/* Autor e Categoria */}

      </div>

    </form>
  )
}
