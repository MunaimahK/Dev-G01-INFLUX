require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const userrouter = require("./router/user-router");
const axios = require("axios");
const url = require("url");
const { error } = require("console");
const port = process.env.PORT || 3001;

const app = express();
app.use(express.json());

/*
// establish connection to mongoDB
//mongoose.connect('mongodb://localhost:27017/test-users',{
    mongoose.connect('mongodb://localhost:27017/test-users',{
    }).then((res) => {
        console.log('DB Connected')
    })
    .catch((err) => {
        console.log(err)
    })
    
*/
app.get("/influx/auth/login", async (req, res) => {
  const url =
    "https://discord.com/api/oauth2/authorize?client_id=1179068530273034290&redirect_uri=http%3A%2F%2Flocalhost%3A3001%2Fapi%2Fauth%2Fdiscord%2Fredirect&response_type=code&scope=identify%20email";
  return res.redirect(url);
});
app.get("/api/auth/discord/redirect", async (req, res) => {
  try {
    // console.log(req.query)
    const { code } = req.query;
    // console.log(req.query)

    if (code) {
      const formData = new url.URLSearchParams({
        client_id: process.env.DISCORD_OAUTH_CLIENT_ID,
        client_secret: process.env.DISCORD_OAUTH_SECRET,
        grant_type: "authorization_code",
        code: code.toString(),
        redirect_uri: "http://localhost:3001/api/auth/discord/redirect",
      });
      //  console.log(formData)

      const output = await axios.post(
        "https://discord.com/api/v10/oauth2/token",
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      if (output.data) {
        const access = output.data.access_token;
        const userinfo = await axios.get(
          "https://discord.com/api/v10/users/@me",
          {
            headers: {
              Authorization: `Bearer ${access}`,
            },
          }
        );
        //   console.log(output.data, userinfo.data)

        const formData1 = new url.URLSearchParams({
          client_id: process.env.DISCORD_OAUTH_CLIENT_ID,
          client_secret: process.env.DISCORD_OAUTH_SECRET,
          grant_type: "refresh_token",
          refresh_token: output.data.refresh_token,
        });

        const refresh = await axios.post(
          "https://discord.com/api/v10/oauth2/token",
          formData1,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        console.log(output.data, userinfo.data, refresh.data);
      }
    }

    /*  const response = await axios.post('https://discord.com/api/v10/oauth2/token', {
            client_id: process.env.DISCORD_OAUTH_CLIENT_ID,
            client_secret: process.env.DISCORD_OAUTH_SECRET 
        })*/
    //  return res.redirect('http://localhost:3001/api/auth/discord/redirect/influx/dashboard')

    res.status(200).json({
      Message: "Success",
    });
  } catch {
    // console.log(error);
    res.status(500).json({
      message: "catch",
    });
  }
});

app.use("/user", userrouter);
console.log(process.env.DISCORD_OAUTH_SECRET);
app.listen(process.env.PORT, () => {
  console.log("Server is running");
});

const App = () => {
  return <div>Hello</div>;
};

export default App();
