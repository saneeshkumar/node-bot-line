const express = require("express");
const line = require("@line/bot-sdk");

const line_config = {
    channelAccessToken: process.env.LINE_ACCESS_TOKEN,
    channelSecret: process.env.LINE_CHANNEL_SECRET
};

const PORT = process.env.PORT || 3000;

const app = express();
app.listen(PORT, function () {
    console.log(`listening on port ${PORT}...`);
});

const bot = new line.Client(line_config);

app.get("/", function (req, res) {
    return res.status(200).send({
        success: 'true',
        message: 'Home Page!!!',
    });
});

app.post('/bot/webhook', line.middleware(line_config), (req, res, next) => {
    // 先行してLINE側にステータスコード200でレスポンスする。
    res.sendStatus(200);

    // すべてのイベント処理のプロミスを格納する配列。
    let events_processed = [];

    // イベントオブジェクトを順次処理。
    req.body.events.forEach((event) => {

        console.log("Event Type: ", event.type, typeof(event.type));
        console.log("Event Message Type: ", event.message.type, typeof(event.message.type));
        console.log("Event Message Text: ", event.message.text, typeof(event.message.text));
        // この処理の対象をイベントタイプがメッセージで、かつ、テキストタイプだった場合に限定。
        if (event.type === "message" && event.message.type === "text") {
            // ユーザーからのテキストメッセージが「こんにちは」だった場合のみ反応。
            if (event.message.text == "こんにちは") {
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