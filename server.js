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
    //JSON.stringify({}) => "{}"
    //JSON.parse("{}") => {}
    //[5,2,3,4].sort() (for very large arrays or very large objects it can block our code)
})

app.get('/timer', (req, res) => {
    delay(9000) //delay the response
    res.send('Ding Ding Ding!')
})

app.listen(3000)