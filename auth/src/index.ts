import mongoose from "mongoose";

import { app } from "./app";

const port = process.env.PORT ?? 3000;

const start = async () => {
  if (!process.env.JWT_KEY) throw new Error("JWT_KEY must be defined");

  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
  } catch (err) {
    console.error(err);
  }

  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
};

start();
