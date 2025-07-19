import { RectangleStackIcon, CheckBadgeIcon, ExclamationTriangleIcon, ChartPieIcon } from '@heroicons/react/24/solid'

export default function Indicators(){

    return(

        <section className="flex-row grid grid-cols-4 gap-4">

          <article
            className="col-span-1 flex items-center gap-4 rounded-lg border border-gray-400 bg-white p-6 sm:justify-between"
          >
            
            <span className="rounded-full bg-blue-100 p-3 text-blue-600 order-last">

                <RectangleStackIcon className="size-7" />
              
            </span>

            <div>

              <p className="text-2xl font-medium text-gray-900">43</p>

              <p className="text-sm text-gray-500">Total de Tarefas</p>

            </div>

          </article>

          <article
            className="col-span-1 flex items-center gap-4 rounded-lg border border-gray-400 bg-white p-6 sm:justify-between"
          >
            
            <span className="rounded-full bg-green-100 p-3 text-green-600 order-last">

                <CheckBadgeIcon className="size-7" />
              
            </span>

            <div>

              <p className="text-2xl font-medium text-gray-900">38</p>

              <p className="text-sm text-gray-500">Tarefas Concluídas</p>
              
            </div>

          </article>

          <article
            className="col-span-1 flex items-center gap-4 rounded-lg border border-gray-400 bg-white p-6 sm:justify-between"
          >
            
            <span className="rounded-full bg-red-100 p-3 text-red-600 order-last">

                <ExclamationTriangleIcon className="size-7" />
              
            </span>

            <div>

              <p className="text-2xl font-medium text-gray-900">5</p>

              <p className="text-sm text-gray-500">Tarefas Pendentes</p>
              
            </div>
            
          </article>

          <article
            className="col-span-1 flex items-center gap-4 rounded-lg border border-gray-400 bg-white p-6 sm:justify-between"
          >
            
            <span className="rounded-full bg-yellow-100 p-3 text-yellow-600 order-last">

                <ChartPieIcon className="size-7" />
              
            </span>

            <div>

              <p className="text-2xl font-medium text-gray-900">19%</p>

              <p className="text-sm text-gray-500">Taxa de Reabertura</p>
              
            </div>
            
          </article>

        </section>

    )

}