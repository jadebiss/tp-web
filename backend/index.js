const express = require("express");
const { MongoClient } = require("mongodb");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 5000;

app.use(express.static("public"));

const mongoUrl = "mongodb+srv://mmjadbis_db_user:1234@tp-web.wjsfo0r.mongodb.net/?appName=tp-web";
const client = new MongoClient(mongoUrl);

async function connectMongoDB() {
  try {
    console.log("Attempting to connect to MongoDB...");
    await client.connect();
    console.log("✓ Successfully connected to MongoDB!");
    console.log("✓ BDD is now connected and ready!");
    return client.db("tp-web");
  } catch (error) {
    console.error("✗ MongoDB connection error:", error);
    process.exit(1);
  }
}

let db;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, async () => {
  db = await connectMongoDB();
  console.log(`\n🚀 Server is running at http://localhost:${port}`);
  console.log(`📊 Database Status: CONNECTED\n`);
});