const express = require('express')
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(cors())

dotenv.config()
const url = process.env.MONGO_URI
const client = new MongoClient(url);
const dbName = process.env.DB_NAME;



app.get('/', async (req, res) => {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    res.json(findResult)
})

app.post('/', async (req, res) => {
    await client.connect();
    const password = req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(password)
    res.send({success: true, result: findResult})
})

app.delete('/', async (req, res) => {
    await client.connect();
    const password = req.body
    console.log(password)
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.deleteOne(password)
    res.send({success: true, result: findResult})
})

app.listen(port, () => {
    console.log(`Listening example app on port ${port}`)
})

