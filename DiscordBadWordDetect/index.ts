import {Client, Message, Intents, MessageEmbed } from "discord.js";
import fs from "fs";

const RegExpType: Array<RegExp> = [
  /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
  /[" "]/gi,
  /[0-9]/g,
  /[ㄱ-ㅎ]/g,
  /[ㅏ-ㅣ]/g,
  /[a-z]/g
];

var strMessage = "";

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
      a.push(`문장에서 "${word}" 비속어가 발견 되었습니다.\n`);
    }

  }

  a.filter((element, index) => {
    return a.indexOf(element) === index;
  });

}

const FilterMSG = (msg: Message, type: RegExp)=> {
  strMessage = strMessage.replace(type, "");
  SerachMSG(strMessage, msg);
}

client.on("ready", () => {
  console.log(`Notice : Bot is Listening!!`);

});

client.on("message", (msg: Message) => {
  if(msg.author.bot) return;
  strMessage = msg.content;
  Object.values(RegExpType).forEach(data => {
    FilterMSG(msg, data);
    console.log(strMessage+"\n");
  });

    var arr: Array<string> = [];

    a.forEach(dd => {
      if (!arr.includes(dd)) {
        arr.push(dd);
      }
    });

    let str: string = "";

    arr.forEach(data => {
      str += data;
    });

    if(str == "")return;

    const embed = new MessageEmbed()
    .setAuthor(`${msg.author.username}님께 안내를 드립니다.`, msg.author.displayAvatarURL({format: "png"}))
    .setColor('#f9aB25')
    .setThumbnail("https://scontent-ssn1-1.xx.fbcdn.net/v/t1.6435-1/cp0/p50x50/70969678_1359232067587109_5802521046191964160_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=dbb9e7&_nc_ohc=-Psh2UUUCCYAX9UJ_sF&_nc_ht=scontent-ssn1-1.xx&oh=5150f36aaaa69b7d5f39bbd81a2246dc&oe=61683087")
    .setTitle('현재 당신의 채팅에서 욕설이 감지 되었습니다.')
    .setDescription(`욕설을 하시는지 학생회에서 모니터링 중입니다.`)
    .addFields({name: '감지된 욕설', value: `${str}`})
    .setImage(msg.author.displayAvatarURL({format: "png"}))
    .setFooter('질문사항은 ~~으로 연락 주시기 바랍니다.', "https://cdn-icons-png.flaticon.com/512/3179/3179517.png");

    msg.reply({embeds: [embed]});

    a = [];

});

client.login("token");
