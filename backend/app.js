import express from "express";
import dotenv from "dotenv";
import { notFound } from "./src/middlewares/notFound.js";
import { handleError } from "./src/middlewares/handleError.js";
import booksRoute from "./src/resources/books/books.routes.js";
import cors from 'cors'

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

//middleware
app.use(express.json());
app.use(cors());

// set port, listen for requests
const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// api routes
app.use("/books", booksRoute);

app.use(notFound);
app.use(handleError);


app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
