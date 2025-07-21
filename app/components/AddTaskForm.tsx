import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { useState, useEffect, FormEvent, useRef } from 'react'
import axios from 'axios'

import TaskType from "./../types/Task"

interface AddTaskFormProps{

  setOpen: Function
  setRefreshTable: Function
  refreshTable: Boolean
  editMode: Boolean
  setEditMode: Function
  task: TaskType

}

export default function AddTaskForm(props: AddTaskFormProps){

  const [users, setUsers] = useState([]);

  const formRef = useRef(null)

  function createTask(e: FormEvent){

    e.preventDefault()

    const data = JSON.stringify({
      
      query: `

        mutation{

          createTask(title: "${e.target.title.value}", ownerId: "${e.target.ownerId.value}", type: "${e.target.type.value}", description: "${e.target.description.value}") {

            id
            
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

    })

    props.setOpen(false)
    props.setRefreshTable(!props.refreshTable)

  }

  function editTask(e: FormEvent){

    e.preventDefault()

    const data = JSON.stringify({
      
      query: `

        mutation{

          updateTask(id: "${props.task.id}", title: "${e.target.title.value}", ownerId: "${e.target.ownerId.value}", type: "${e.target.type.value}", description: "${e.target.description.value}") {

            id
            
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

    axios.request(config)

    props.setOpen(false)
    props.setRefreshTable(!props.refreshTable)

  }

  function submitForm(e: FormEvent){

    if(props.editMode){

      editTask(e)

    }else{
    
      createTask(e)

    }

  }

  function renderActionButton(){

    if(props.editMode){

      return(
        
          <button
            type="submit"
            className="mt-3 inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-500 sm:mt-0 sm:w-auto ml-4"

          >
            Editar
          </button>
          
      )

    }else{

      return(
        
          <button
            type="submit"
            className="mt-3 inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-green-500 sm:mt-0 sm:w-auto ml-4"
          >
            Adicionar
          </button>
          
      )

    }

  }

  useEffect(() => {

    console.log("owner id: " + props.task.owner.id)

    const data = JSON.stringify({
      
      query: `

        query{

          users{

            id
            name
            surName

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

      setUsers(res.data.data.users)

      if(props.editMode){

        formRef.current.title.value = props.task.title
        formRef.current.description.value = props.task.description
        formRef.current.ownerId.value = props.task.owner.id
        formRef.current.type.value = props.task.type

      }else{

        formRef.current.title.value = ""
        formRef.current.description.value = ""
        formRef.current.ownerId.value = res.data.data.users[0].id
        formRef.current.type.value = "Trabalho"

      }

    })

  }, []);

  return(

    <form onSubmit={submitForm} ref={formRef}>

      <div className="mt-4 pb-2 grid gap-x-6 gap-y-8 grid-cols-6">
        
        {/* Título */}
        <div className="col-span-full">

          <label className="block text-sm/6 font-medium text-gray-900">
            Título da tarefa
          </label>

          <div className="mt-2">

            <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
              
              <input
                required
                name="title"
                type="text"
                placeholder="Tarefa"
                className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
              />

            </div>

          </div>

        </div>
        {/* Título */}

        {/* Descrição */}
        <div className="col-span-full">

          <label className="block text-sm/6 font-medium text-gray-900">
            Descrição
          </label>

          <div className="mt-2">
            <textarea
              name="description"
              rows={3}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              defaultValue={''}
            />
          </div>
          
        </div>
        {/* Descrição */}

        {/* Autor e Categoria */}
        <div className='flex col-span-full grid-cols-6 gap-4'>

            <div className="flex-1">

              <label className="block text-sm/6 font-medium text-gray-900">
                Autor
              </label>

              <div className="mt-2 grid grid-cols-1">
              
                <select
                    name="ownerId"
                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                >

                  {users.map((user) => {
                    
                    return <option key={user.id} value={user.id}>{user.name + ' ' + user.surName}</option>

                  })}
                  
                </select>

                <ChevronDownIcon
                    aria-hidden="true"
                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                />

              </div>

            </div>

            <div className="flex-1">

              <label className="block text-sm/6 font-medium text-gray-900">
                Categoria
              </label>

              <div className="mt-2 grid grid-cols-1">

                <select
                  name="type"
                  className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                >

                  <option value="Trabalho">Trabalho</option>
                  <option value="Pessoal">Pessoal</option>
                  <option value="Estudos">Estudos</option>

                </select>

                <ChevronDownIcon
                    aria-hidden="true"
                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                />

              </div>

            </div>

        </div>
        {/* Autor e Categoria */}

        {/* Botões */}
        <div className="col-span-full flex justify-end border-t pt-4 border-gray-200">

          <button
            type="button"
            onClick={() => props.setOpen(false)}
            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
          >
            Cancelar
          </button>
                      
          {renderActionButton()}

        </div>
        {/* Botões */}

      </div>

    </form>

  )
}
