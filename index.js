require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // await client.connect();
    const db = client.db("Salman_Sahed");
    const projectCollection = db.collection("projects");
    const contactsCollection = db.collection("contact-form");

    // Home Route
    app.get("/", (req, res) => {
      res.send("Salman  Sahed Server API");
    });

    // Get Project Data
    app.get("/projects", async (req, res) => {
      const cursor = projectCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    // Get Single Project Data
    app.get("/projects/:id", async (req, res) => {
      const { id } = req.params;
      const query = { _id: new ObjectId(id) };
      const result = await projectCollection.findOne(query);
      res.send(result);
    });

    // Post Contact Form Data
    app.post("/contact-form", async (req, res) => {
      const data = req.body;
      const result = await contactsCollection.insertOne(data);
      res.send(result);
    });

    // await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
