const express = require("express");
const cors = require("cors");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const key = require("../config");
const chalk = require("chalk");
const morgan = require("morgan");
let user = {};

const { GOOGLE } = key;

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});

// GoogleStrategy
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE.clientID,
      clientSecret: GOOGLE.clientSecret,
      callbackURL: "/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log(chalk.blue(JSON.stringify(profile)));
      user = { ...profile };
      cb(null, profile);
    }
  )
);

const app = express();
app.use(morgan("dev"));
app.use(cors());

app.get(
  "auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }, (req, res) => {
    res.redirect("/profile");
  })
);

app.get("/user", (req, res) => {
  console.log("getting user data!");
  res.send(user);
});

app.get("auth/logout", (req, res) => {
  console.log("logging out!");
  user = {};
  res.redirect("/");
});

app.use(passport.initialize());

app.listen(5000, () => {
  console.log(chalk.green("listening on port 5000"));
});
