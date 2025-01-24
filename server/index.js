//Importing express and middlewares and database connection
import express from "express";
import connectToDB from "./middlewares/connectToDB.js";
import logger from "./middlewares/logger.js";
import notFound from "./middlewares/notfound.js";

//Importing Routers
import postRouter from "./routers/postRouters.js";

const app = express();
const port =process.env.PORT|5000;

app.listen(port, () => console.log(`server is running on port ${port}`));

connectToDB();
//using middlewares
app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//main page
app.get("/api", (req, res) => {
  res.send("Hello World!");
});
//Post router
app.use("/api/posts", postRouter);

//not found middleware
app.use(notFound)
