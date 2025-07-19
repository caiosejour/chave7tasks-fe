import { ChevronDownIcon } from '@heroicons/react/16/solid'

export default function AddTaskForm(){
  return(

    <form>

      <div className="mt-4 pb-2 grid gap-x-6 gap-y-8 grid-cols-6">
        
        {/* Título */}
        <div className="col-span-full">

          <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
            Título da tarefa
          </label>

          <div className="mt-2">

            <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
              
              <input
                id="username"
                name="username"
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
          <label htmlFor="about" className="block text-sm/6 font-medium text-gray-900">
            Descrição
          </label>
          <div className="mt-2">
            <textarea
              id="about"
              name="about"
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

              <label htmlFor="country" className="block text-sm/6 font-medium text-gray-900">
                Autor
              </label>

              <div className="mt-2 grid grid-cols-1">
              
                <select
                    id="country"
                    name="country"
                    autoComplete="country-name"
                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                >

                    <option>Caio</option>
                    <option>Laryssa</option>
                    <option>Lucas</option>

                </select>

                <ChevronDownIcon
                    aria-hidden="true"
                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                />

              </div>

            </div>

            <div className="flex-1">

              <label htmlFor="country" className="block text-sm/6 font-medium text-gray-900">
                Categoria
              </label>

              <div className="mt-2 grid grid-cols-1">

                <select
                    id="country"
                    name="country"
                    autoComplete="country-name"
                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                >

                    <option>Trabalho</option>
                    <option>Pessoal</option>
                    <option>Estudo</option>

                </select>

                <ChevronDownIcon
                    aria-hidden="true"
                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                />

              </div>

            </div>

        </div>
        {/* Autor e Categoria */}

        {/* Status */}
        <div className="col-span-full">
          
            <fieldset>

                <legend className="text-sm/6 font-semibold text-gray-900">Status</legend>

                <div className="mt-6 space-y-6">

                    <div className="flex items-center gap-x-3">
                      
                        <input
                          defaultChecked
                          id="pendente"
                          name="status"
                          type="radio"
                          className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                        />

                        <label htmlFor="push-everything" className="block text-sm/6 font-medium text-gray-900">
                          Pendente
                        </label>

                    </div>

                    <div className="flex items-center gap-x-3">

                        <input
                          id="concluido"
                          name="status"
                          type="radio"
                          className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                        />

                        <label htmlFor="push-email" className="block text-sm/6 font-medium text-gray-900">
                          Concluído
                        </label>

                    </div>

                </div>

            </fieldset>
          
        </div>
        {/* Status */}

      </div>

    </form>
  )
}
