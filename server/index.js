import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config'; 
import cors from 'cors';
import issueRoutes from './routes/issueRoutes.js';
import authRoutes from './routes/authRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    process.exit(1); 
  }
};

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.use('/api/issues', issueRoutes);
  app.use('/api/auth', authRoutes);
  
  app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  });
});


// import express, { json } from "express";
// import { connect } from "mongoose";
// import cors from "cors";
// import "dotenv/config";
// import authRoutes from "./routes/authRoutes.js";
// import issueRoutes from "./routes/issueRoutes.js";

// const app = express();

// app.use(cors());
// app.use(json()); 

// connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB Connected Successfully"))
//   .catch((err) => console.error("MongoDB Connection Error:", err));

// app.use("/api/auth", authRoutes); 
// app.use("/api/issues", issueRoutes); 

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
