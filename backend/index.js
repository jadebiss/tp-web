const express = require("express");
const { MongoClient } = require("mongodb");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 5000;


app.use(express.static)








// MongoDB connection
const mongoUrl = "mongodb+srv://mmjadbis_db_user:1234@tp-web.wjsfo0r.mongodb.net/?appName=tp-web";
const client = new MongoClient(mongoUrl);

async function connectMongoDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB!");
    return client.db("tp-web");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}

let db;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, async () => {
  db = await connectMongoDB();
  console.log(`Server is running at http://localhost:${port}`);
});