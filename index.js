const express = require("express");
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");
const port = process.env.PORT || 5000;
require("dotenv").config();

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.7ky8m.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const coffeCollection = client.db("coffewala").collection("coffe");

    app.post("/addItems", async (req, res) => {
      const data = req.body;
      const result = await coffeCollection.insertOne(data);
      res.send(result);
    });

    app.get("/getItems", async (req, res) => {
      const query = {};
      const cursor = coffeCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });
  } finally {
  }
}
run().catch((err) => console.error(err));

app.get("/", async (req, res) => {
  res.send("Welcome to CoffeeWala Server!!!");
});

app.listen(port, () => {
  console.log(`Listening From Port ${port}`);
});
