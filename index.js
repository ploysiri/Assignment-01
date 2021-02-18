const MongoClient = require('mongodb').MongoClient
const express = require('express')

const app = express()
const url = 'mongodb+srv://superadmin:ploysiri+3012@cluster0.jgurt.mongodb.net/sample_weatherdata?retryWrites=true&w=majority'
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true })

async function connect() {
    await client.connect()
}
connect()

app.get('/weather', async(req, res)=> {
    try {
        const position = req.query.position
        const callLetters = req.query.callLetters
        const airTemperature = req.query.airTemperature
        const ts = req.query.ts
        const db = client.db('sample_weatherdata') 
        const collection = db.collection('data')
 
        let query = {}
        if (position){
            query.position = position
        }
        if (callLetters){
            query.callLetters = callLetters
        }
        if (airTemperature){
            query.airTemperature = airTemperature
        }
        if (ts){
            query.ts = ts
        }
        const cursor = collection.find(query).limit(10)
        let weather = []
        await cursor.forEach(doc => weather.push(doc.name))
        res.send(weather)

    }catch(e) {
        console.error(e)
    }
})

app.listen(3000, console.log('Start application at port 3000'))
