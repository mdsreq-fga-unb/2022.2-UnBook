import { app } from "./config/app";

app.listen(3000, () => console.log("Server is Running!!!"));

app.get("/", (request, response) =>
  response.json({ message: "Hello, UnBookers!" })
);
