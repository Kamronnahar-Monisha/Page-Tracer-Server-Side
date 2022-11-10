const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//mongodb connection uri and client
const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.nomds.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


// async function for CRUD operation
const run = async () => {
    try {
        const serviceCollection = client.db('pageTracer').collection('services');
        const reviewCollection = client.db('pageTracer').collection('reviews');

        // get api for services
        app.get('/services', async (req, res) => {
            const size = parseInt(req.query.size);
            const query = {};
            const cursor = serviceCollection.find(query);
            let services;
            if (size) {
                services = await cursor.limit(size).toArray();
            }
            else {
                services = await cursor.toArray();
            }
            res.send(services);
        })
        //get api for specific service by id
        app.get('/services/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const service = await serviceCollection.findOne(query);
            res.send(service);
        })
        // get api for specific review by id
        app.get('/orders', async (req, res) => {
            const serviceId = req.query.serviceId;
            const userEmail = req.query.userEmail;
            let query = {};
            if (serviceId) {
                query = { serviceId };
            }
            if (userEmail) {
                query = {
                    email:userEmail
                };
            }
            const cursor = reviewCollection.find(query);
            const reviews = await cursor.toArray();
            res.send(reviews);
        })


        // post api for inserting single user document
        app.post('/services', async (req, res) => {
            const user = req.body;
            const result = await usersCollection.insertOne(user);
        })
        // post api for inserting single review
        app.post('/orders', async (req, res) => {
            const review = req.body;
            const result = await reviewCollection.insertOne(review);
            res.send(result);
        })


    }
    finally {

    }
}
run().catch(console.dir);


//root api 
app.get('/', (req, res) => {
    res.send('Welcome to mongodb practice server side');
})

app.listen(port, () => {
    console.log(`server side is listing at port ${port}`);
})