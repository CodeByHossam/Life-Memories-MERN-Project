import mongoose from "mongoose";
async function connectToDB() {
  try {
    await mongoose.connect(
      // "mongodb://localhost:27017/lifeMemoriesDB"

      "mongodb+srv://enghossam00:w8pgle6oTSO1CBR9@cluster0.svxxh.mongodb.net/lifeMemories?retryWrites=true&w=majority&appName=Cluster0"
       
    );

    console.log("MongoDB connection established successfully");
  } catch (error) {
    console.log("Error connecting to the database");
  }
}

export default connectToDB;
