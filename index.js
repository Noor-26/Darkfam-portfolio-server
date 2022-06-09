const express = require('express');
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT || 5000
const app = express()
const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion, ObjectId} = require('mongodb');

//middlewere
app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.okboq.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const handleProject = async () => {
    try{
            await client.connect()
            const projectCollection = client.db("Portfolio").collection("projects");

            app.get('/projects' ,async (req,res) => {
                const getProjects = await projectCollection.find().toArray()
                res.send(getProjects)
            })
            app.post('/projects',async (req,res) => {
                const project = req.body
                console.log(project)
                const addproject = await projectCollection.insertOne(project)
                res.send(addproject)
            })

    }finally{

    }
}
handleProject()
app.get('/',(req,res) => {
    res.send('Success the surver is running')
})

app.listen(port,() => {
    console.log('Connections to the port done'); 
})