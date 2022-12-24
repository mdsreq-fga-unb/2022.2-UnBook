import express from "express";

const app = express();

app.use(express.json());

app.get("/", (request, response) =>
  response.json({ message: "Hello, UnBookers!" })
);

app.listen(3000, () => console.log("Server is Running!!!"));
