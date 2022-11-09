const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//mongodb connection uri and client
const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.nomds.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


// async function for CRUD operation
const run = async ()=>{
    try{
        const serviceCollection = client.db('pageTracer').collection('services');
        
        // get api for services
        app.get('/services',async(req,res)=>{
            const query ={};
            const cursor = serviceCollection.find(query);
            const services = await cursor.limit(3).toArray();
            res.send(services);
        })

        // post api for inserting single user document
        app.post('/services',async(req,res)=>{
            const user = req.body;
            const result = await usersCollection.insertOne(user);
            console.log(result);
        })

    }
    finally{

    }
}
run().catch(console.dir);


//root api 
app.get('/',(req,res)=>{
    res.send('Welcome to mongodb practice server side');
})

app.listen(port,()=>{
    console.log(`server side is listing at port ${port}`);
})