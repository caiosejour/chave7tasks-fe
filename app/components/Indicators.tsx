import { useEffect, useState } from "react"
import axios from "axios"
import { RectangleStackIcon, CheckBadgeIcon, ExclamationTriangleIcon, ChartPieIcon } from '@heroicons/react/24/solid'

interface IndicatorsProps{

  refreshTable: boolean

}

export default function Indicators(props: IndicatorsProps){

    const [stats, setStats] = useState({

      allTasks: "0",
      completedTasks: "0",
      conclusionRate: "0%",
      pendingTasks: "0"

    });

    useEffect(() => {

      const data = JSON.stringify({
        
        query: `

          query{

              stats {

                  allTasks
                  completedTasks
                  conclusionRate
                  pendingTasks

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

        // console.log(res.data.data.stats)
        setStats(res.data.data.stats)

      })

    }, [props.refreshTable]);

    return(

        <section className="flex-row grid grid-cols-4 gap-4">

          <article
            className="lg:col-span-1 md:col-span-2 col-span-4 flex items-center gap-4 rounded-lg border border-gray-400 bg-white p-6 justify-between"
          >
            
            <span className="rounded-full bg-blue-100 p-3 text-blue-600 order-last">

                <RectangleStackIcon className="size-7" />
              
            </span>

            <div>

              <p className="text-2xl font-medium text-gray-900">{stats.allTasks}</p>

              <p className="text-sm text-gray-500">Total de Tarefas</p>

            </div>

          </article>

          <article
            className="lg:col-span-1 md:col-span-2 col-span-4 flex items-center gap-4 rounded-lg border border-gray-400 bg-white p-6 justify-between"
          >
            
            <span className="rounded-full bg-green-100 p-3 text-green-600 order-last">

                <CheckBadgeIcon className="size-7" />
              
            </span>

            <div>

              <p className="text-2xl font-medium text-gray-900">{stats.completedTasks}</p>

              <p className="text-sm text-gray-500">Tarefas Concluídas</p>
              
            </div>

          </article>

          <article
            className="lg:col-span-1 md:col-span-2 col-span-4 flex items-center gap-4 rounded-lg border border-gray-400 bg-white p-6 justify-between"
          >
            
            <span className="rounded-full bg-red-100 p-3 text-red-600 order-last">

                <ExclamationTriangleIcon className="size-7" />
              
            </span>

            <div>

              <p className="text-2xl font-medium text-gray-900">{stats.pendingTasks}</p>

              <p className="text-sm text-gray-500">Tarefas Pendentes</p>
              
            </div>
            
          </article>

          <article
            className="lg:col-span-1 md:col-span-2 col-span-4 flex items-center gap-4 rounded-lg border border-gray-400 bg-white p-6 justify-between"
          >
            
            <span className="rounded-full bg-yellow-100 p-3 text-yellow-600 order-last">

                <ChartPieIcon className="size-7" />
              
            </span>

            <div>

              <p className="text-2xl font-medium text-gray-900">{stats.conclusionRate}</p>

              <p className="text-sm text-gray-500">Taxa de Conclusão</p>
              
            </div>
            
          </article>

        </section>

    )

}