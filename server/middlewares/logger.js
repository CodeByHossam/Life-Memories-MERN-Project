import fs from "fs";
const promises = fs.promises;

import { fileURLToPath } from "url";
import path from "path";
const __filepath = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filepath);
const logdir = path.join(__dirname, "..", "/logs");


async function eventlog(message, filename) {
  try {
    // Ensure the logs directory exists
    if (!fs.existsSync(logdir)) {
      await promises.mkdir(logdir, { recursive: true });
    }
    await promises.appendFile(filename,message)
  
  } catch (error) {
    console.log("error:",error)
  }
}

async function logger(req, res, next) {
  const msg=`[${new Date()}] ${req.method} ${req.url} \n`
  const filename= path.join(__dirname, "..", "/logs","reqLogs.log");

  await eventlog(msg, filename);
  console.log(`[${new Date()}] ${req.method} ${req.url}`);
  next();
}

export default logger;
