const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3002;
const clientId = "44a61fa4-3712-40ce-aad7-f1f9b5bd8667";
const clientSecret = "xsl5zldfe5";
const redirectUri = "http://127.0.0.1:4000";
let accessToken;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/auth/code", async (req, res) => {
  const { code } = req.body;
  if (!code) {
    return res.status(400).send("Authorization code is missing");
  }

  try {
    const response = await axios.post(
      "https://api.upstox.com/v2/login/authorization/token",
      new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "210297",
        code,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      }
    );
    accessToken = response.data.access_token;
    res.json({ access_token: accessToken });
    console.log("Access token is saved:", accessToken);
  } catch (error) {
    console.error(
      "Error exchanging code for tokens:",
      error.response ? error.response.data : error.message
    );
    res.status(500).send("Error exchanging code for tokens");
  }
});

// fetch All Stocks here
app.get("/market-quote", async (req, res) => {
  try {
    if (!accessToken) {
      return res.status(401).send("Access token is missing");
    }

    const url =
      "https://api.upstox.com/v2/market-quote/quotes?instrument_key=NSE_EQ%7CINE848E01016,NSE_EQ|INE040A01034,NSE_EQ|INE002A01018,NSE_EQ|INE090A01021,NSE_EQ|INE062A01020,NSE_EQ|INE238A01034,NSE_EQ|INE237A01028,NSE_EQ|INE296A01024,NSE_EQ|INE009A01021,NSE_EQ|INE018A01030,NSE_EQ|INE467B01029,NSE_EQ|INE154A01025,NSE_EQ|INE397D01024";

    const headers = {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    };

    const response = await axios.get(url, { headers });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res
      .status(error.response ? error.response.status : 500)
      .send("Error fetching market quotes");
  }
});

// /Nifty 50 requests;
app.get("/nifty_50", async (req, res) => {
  try {
    if (!accessToken) {
      return res.status(401).send("Access token is missing");
    }
    const url =
      "https://api.upstox.com/v2/market-quote/quotes?instrument_key=NSE_INDEX%7CNifty%2050";
    const headers = {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    };
    const response = await axios.get(url, { headers });
    res.json(response.data);
    console.log(response.data);
  } catch (error) {
    console.error(error);
    res
      .status(error.response ? error.response.status : 500)
      .send("Error fetching market quotes");
  }
});

// /Nifty Bank requests;
app.get("/nifty_bank", async (req, res) => {
  try {
    if (!accessToken) {
      return res.status(401).send("Access token is missing");
    }
    const url =
      "https://api.upstox.com/v2/market-quote/quotes?instrument_key=NSE_INDEX%7CNifty%20Bank";
    const headers = {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    };
    const response = await axios.get(url, { headers });
    res.json(response.data);
    console.log(response.data);
  } catch (error) {
    console.error(error);
    res
      .status(error.response ? error.response.status : 500)
      .send("Error fetching market quotes");
  }
});

//nifty_fin

app.get("/nifty_fin", async (req, res) => {
  try {
    if (!accessToken) {
      return res.status(401).send("Access token is missing");
    }
    const url =
      "https://api.upstox.com/v2/market-quote/quotes?instrument_key=NSE_INDEX%7CNifty%20Fin%20Service";
    const headers = {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    };
    const response = await axios.get(url, { headers });
    res.json(response.data);
    console.log(response.data);
  } catch (error) {
    console.error(error);
    res
      .status(error.response ? error.response.status : 500)
      .send("Error fetching market quotes");
  }
});
app.listen(port, () => {
  console.log(`Server running at https://13.127.217.135:${port}`);
});
