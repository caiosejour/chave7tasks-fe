import axios from "axios";

export default async function returnTasks(){

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

    return await axios.request(config)

}