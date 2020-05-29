const express = require("express");
const line = require("@line/bot-sdk");

const line_config = {
    ChannelAccessToken: process.env.LINE_ACCESS_TOKEN,
    ChannelSecret: process.env.LINE_CHANNEL_SECRET
};

const PORT = process.env.PORT || 3000;

const app = express();

app.post("/", function (req, res) {

});

app.listen(PORT, line.middleware(line_config), (req, res, next) => {
    res.sendStatus(200);
    let events_processed = [];

    req.body.events.forEach((event) => {
        // この処理の対象をイベントタイプがメッセージで、かつ、テキストタイプだった場合に限定。
        if (event.type == "message" && event.message.type == "text") {
            // ユーザーからのテキストメッセージが「こんにちは」だった場合のみ反応。
            if (event.message.text === "こんにちは" || event.message.text === "hi" || event.message.text === "Hi") {
                // replyMessage()で返信し、そのプロミスをevents_processedに追加。
                events_processed.push(bot.replyMessage(event.replyToken, {
                    type: "text",
                    text: "これはこれは"
                }));
            }
        }
    });
    
    // すべてのイベント処理が終了したら何個のイベントが処理されたか出力。
    Promise.all(events_processed).then(
        (response) => {
            console.log(`${response.length} event(s) processed.`);
        }
    );
});