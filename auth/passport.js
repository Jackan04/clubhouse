import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { verifyUser } from "../middleware/authentication.js";
import db from "../db/db.js";

passport.use(new LocalStrategy(verifyUser));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.getUserById(id);
    user ? done(null, user) : done(null, null);
  } catch (err) {
    done(err);
  }
});
