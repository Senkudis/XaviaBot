import lyricsFinder from 'lyrics-finder';


const config = {
  name: "كلمات",
  aliases: ["lyc2", "lyric", "شارة"],
  version: "1.1.0",
  description: "ايجاد كلمات الأغاني",
  usage: "[اسم الأغنية]",
  cooldown: 3,
  permissions: [0, 1, 2],
  credits: "XaviaTeam | Diyakd",
  dependencies: ["lyrics-finder"]
}

async function onCall({ message, args }) { 
  try {
  
    let lyrics = await lyricsFinder(args.join(" ")) || "لم يتم العثور على نتائج!";

message.reply(`${lyrics}`),
  message.react("🎼");
    

  } catch (e) {
        console.error(e);
        message.react("❌")
    }
}
          
         
        
    


export default {
  config,
  onCall,
};