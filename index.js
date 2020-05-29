const express = require("express");
const line = require("@line/bot-sdk");

const line_config = {
    ChannelAccessToken: process.env.LINE_ACCESS_TOKEN,
    ChannelSecret: process.env.LINE_CHANNEL_SECRET
};

const PORT = process.env.PORT || 3000;

const app = express();

app.post("/", function(req, res) {
    
});

app.listen(PORT, line.middleware(line_config), (req, res, next) => {
    res.sendStatus(200);
    console.log(req.body);
});