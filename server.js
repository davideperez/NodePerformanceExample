const express = require('express')
const cluster = require('cluster')
const os = require('os')

const app = express()

cluster.schedulingPolicy = cluster.SCHED_RR

function delay(duration) {
    const startTime = Date.now()
    while(Date.now() - startTime < duration) {
        //event loop is blocked...
    }
}

app.get('/', (req, res) => {
    res.send(`Performance Example: ${process.pid}`)
    //JSON.stringify({}) => "{}"
    //JSON.parse("{}") => {}
    //[5,2,3,4].sort() (for very large arrays or very large objects it can block our code)
})

app.get('/timer', (req, res) => {
    delay(9000) //delay the response
    res.send(`Ding Ding Ding: ${process.pid}`)
})


console.log("Running a server.")

if (cluster.isMaster){
    console.log('Master has been started...')
    const NUM_WORKERS = os.cpus().length
    for (let i = 0; i < NUM_WORKERS; i++) {
        cluster.fork()
    }
} else {
    console.log('Worker process started.')
    app.listen(3000)
}