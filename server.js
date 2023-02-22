const express = require('express')

const app = express()

function delay(duration) {
    const startTime = Date.now()
    while(Date.now() - startTime < duration) {
        //event loop is blocked...
    }
}

app.get('/', (req, res) => {
    res.send('Performance Example')
})

app.get('/timer', (req, res) => {
    delay(9000) //delay the response
    res.send('Ding Ding Ding!')
})

app.listen(3000)