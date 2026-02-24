import express from "express";
import dotenv from "dotenv";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import passport from "passport";
import pool from "./db/pool.js";
import "./auth/passport.js";
import authRouter from "./routes/authRouter.js";
import indexRouter from "./routes/indexRouter.js";
import messageRouter from "./routes/messageRouter.js";
import userRouter from "./routes/userRouter.js";
import { isAuthenticated } from "./middleware/authentication.js";

const app = express();
dotenv.config();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const pgSession = connectPgSimple(session);

const pgSessionStore = new pgSession({
  pool: pool,
  tableName: "session",
});

app.use(
  session({
    store: pgSessionStore,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
  }),
);
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.currentUser = req.user ?? null;
  next();
});

app.use("/", indexRouter);
app.use("/messages", isAuthenticated, messageRouter);
app.use("/auth", authRouter);
app.use("/users", userRouter);

app.use((err, req, res, next) => {
  console.error(err);

  const statusCode = err.statusCode || 500;

  res.status(statusCode).render("error", {
    title: "Error",
    errorMessage: "An unexpected error occurred. Please try again.",
  });
});

app.use((req, res) => {
  res.status(404).render("404", { title: "404 - Page Not Found" });
});

const PORT = process.env.PORT;
app.listen(PORT, (error) => {
  if (error) {
    console.error("Error", error);
  }

  console.log(`Server running on port ${PORT}`);
});
