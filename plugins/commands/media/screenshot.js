import pkg from 'fs-extra';
import axios from 'axios';
import { resolve } from 'path';

const { readFileSync, createReadStream, unlinkSync, existsSync } = pkg;
const config = {
  name: "سكرين",
  aliases: ["ss","موقع"],
  version: "1.1.0",
  description: "لقطة شاشة لموقع ما عن طريق الرابط",
  usage: "[url]",
  cooldown: 3,
  permissions: [0, 1, 2],
  credits: "Isai Ivanov | Diyakd",
  dependencies: [
		 "fs-extra",
		"path",
        "url"
    ]
};
//async function onLoad() {
  // const path = resolve("plugins/commands/cache/pornlist.txt");

 //   if (!existsSync(path)) return await //global.downloadFile("https://raw.githubusercontent.com/blocklistproject/Lists/master/porn.txt", path);
//    else return;
//}

async function onCall({ message , args }) {
    let query = args.join(" ")
    const { senderID, threadID } = message;
  //  if (!global.moduleData.pornList) global.moduleData.pornList = readFileSync("plugins/commands/cache/pornlist.txt", "utf-8").split('\n').filter(site => site && !site.startsWith('#')).map(site => site.replace(/^(0.0.0.0 )/, ''));
 //   const urlParsed = url.parse(query);
    //    if (global.moduleData.pornList.some(pornURL => urlParsed.host == pornURL)) return message.reply("The site you entered is not secure!! (NSFW PAGE)");
     //   try {
        const path = resolve(`plugins/commands/cache`, `${threadID}-${senderID}s.png`);
        const url = `https://image.thum.io/get/width/1920/crop/720/fullpage/noanimate/${args[0]}`;
  			const writer = pkg.createWriteStream(path);
 				const response = axios({
          method: 'GET',
          url: url,
     		  responseType: 'stream'
        })
        .then(function (response) {
  			response.data.pipe(writer)
          
           })
  		
     function greet() {
       message.reply({ attachment: createReadStream(path) });
    }
setTimeout(greet, 5000);
     function del() {
       if (global.isExists(path)) global.deleteFile(path);
}
setTimeout(del, 15000)

 //   }
  //  catch {
  //      return message.reply("This url is not found, the format is not correct ?");
      
//    }
  }
    

export default {
  config,
  onCall,
  
};