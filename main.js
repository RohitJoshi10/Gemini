const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Add this line
const app = express();
const db = require("./db");

app.use(cors()); // Add this line
app.use(express.json());
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

const genAI = new GoogleGenerativeAI(process.env.API_KEY, { fetch });
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const generate = async (prompt) => {
  try {
    const result = await model.generateContent(prompt);
    console.log(result.response.text());
    return result.response.text();
  } catch (error) {
    console.log(error);
  }
};

app.get("/api/ask", async (req, res) => {
  try {
    const data = req.query.question; // Change to req.query
    const result = await generate(data);
    res.send({
      result: result,
    });
  } catch (error) {
    res.send("error" + error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
