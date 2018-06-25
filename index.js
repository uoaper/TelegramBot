// import TelegramBot from 'node-telegram-bot-api'
// import config from 'config'

const TelegramBot = require('node-telegram-bot-api');
const config = require('config');
const pg = require('pg');
const conString = "postgres://postgres:2017Variankalove@localhost:5432/telegrambot";

const client = new pg.Client(conString);

client.connect();

const  TOKEN = config.get("token");

const bot = new TelegramBot(TOKEN, { polling: true});

bot.on('message', msg => {
    const { chat: { id }} = msg;
    bot.sendMessage(id, 'Pong');
   // console.log(msg);

});

bot.onText(/\/idi (.+)/, (msg, [source, match]) =>
{
    const { chat: { id }} = msg;
    bot.sendMessage(id, match);

    const text = msg.text.substr(4);
        // [0]["text"];

    console.log(text);

    client.query('INSERT INTO test(text) VALUES ($1)', [text]);
  //  console.log(msg);

}
);