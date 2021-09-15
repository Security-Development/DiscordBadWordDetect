import {Client, Message, Intents} from "discord.js";
import fs from "fs";

const SC = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi;
const B = /[" "]/gi;
const N = /[0-9]/g;
const CON = /[ㅏ-ㅣ]/g;
const COL = /[ㄱ-ㅎ]/g;
const E = /[a-z]/g;

const client = new Client({
  intents: [
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILDS,
  ],

});


var a: Array<string> = [];
const SerachMSG = (msg: string, message:Message) =>
{
  const data: Array<string> = fs.readFileSync("./data/WordData.txt").toString().split("\n");

  var filter: string = msg;

  for(let i = 0; i < data.length; i++)
  {
    const word = data[i].replace(/["\r"]/gi, "");

    if(filter.indexOf(word) != -1)
    {
      if(!word) continue;
      a.push(`문장에서 "${word}" 비속어가 발견 되었습니다.`);
    }

  }

  a.filter((element, index) => {
    return a.indexOf(element) === index;
  });

}

client.on("ready", () => {
  console.log(`Notice : Bot is Listening!!`);

});

client.on("message", (msg: Message) => {
  if(msg.author.bot) return;
    var message = msg.content.replace(SC, "");
    SerachMSG(message, msg);

    message = message.replace(E, "");
    SerachMSG(message, msg);

    message = message.replace(COL, "");
    SerachMSG(message, msg);

    message = message.replace(N, "");
    SerachMSG(message, msg);

    message = message.replace(CON, "");
    SerachMSG(message, msg);

    message = message.replace(B, "");
    SerachMSG(message, msg);


    var d: Array<string> = [];

    a.forEach(dd => {
      if (!d.includes(dd)) {
        d.push(dd);
      }
    });

    d.forEach(aaaa => {
      msg.reply(aaaa);
    });

    a = [];

});
client.login("token");
