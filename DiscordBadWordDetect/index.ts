import {Client, Message, Intents} from "discord.js";
import fs from "fs";

const client = new Client({
  intents: [
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILDS,
  ],

});

const FilterMSG = (msg: string) => {
  const filter: string = msg.
  replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "").
  replace(/[" "]/gi, "").
  replace(/[0-9]/g, "").
  replace(/[ㅏ-ㅣ]/g, "");

  return filter;

}

const SerachMSG = async (msg: string, message: Message) =>
{
  const data: Array<string> = fs.readFileSync("./data/WordData.txt").toString().split("\n");

  const filter: string = FilterMSG(msg);

  for(let i = 0; i < data.length; i++)
  {
    const word = data[i].replace(/["\r"]/gi, "");

    if(filter.indexOf(word) != -1)
    {
      if(!word) continue;

      await message.reply( `해당 단어에서 "${word}"라는 단어를 발견 했습니다.`);

    }

  }

}

client.on("ready", () => {
  console.log(`Notice : Bot is Listening!!`);

});

client.on("message", (msg: Message) => {
  if(msg.author.bot) return;
    SerachMSG(msg.content, msg);

});

client.login("token");
