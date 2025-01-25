//Importing express and middlewares and database connection
import express from "express";
import connectToDB from "./middlewares/connectToDB.js";
import logger from "./middlewares/logger.js";
import notFound from "./middlewares/notfound.js";

//Importing Routers
import postRouter from "./routers/postRouters.js";

const app = express();
const port = process.env.PORT | 5000;

app.listen(port, () => console.log(`server is running on port ${port}`));

connectToDB();
//using middlewares
app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//serving static files
import { fileURLToPath } from "url";
import path from "path";
const __filepath = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filepath);
app.use("/", express.static(path.join(__dirname, "public")));

//main page
app.get("/api", (req, res) => {
  res.send("Hello World!");
});
//Post router
app.use("/api/posts", postRouter);

app.get("/index", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

//not found middleware
app.all("*",notFound);
