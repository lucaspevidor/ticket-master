import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";

import {
  signInRouter,
  signOutRouter,
  signUpRouter,
  currentUserRouter,
} from "./routes";

import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors";

const app = express();
app.set("trust proxy", true);
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);

app.all("*", () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
