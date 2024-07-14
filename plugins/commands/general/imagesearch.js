import * as fs from 'fs';
import * as google from "googlethis";
import cloudscraper from 'cloudscraper';



const config = {
  name: "صور",
  aliases: ["بحث"],
  version: "1.1.0",
  description: "ابحث عن الصور",
  usage: "[search query]",
  cooldown: 3,
  permissions: [0, 1, 2],
  credits: "Isai Ivanov | Diyakd",
  dependencies: [
    "axios",
		 "fs-extra",
		"googlethis",
        "cloudscraper"
    ]
};

async function onCall({ message , args}) {
    let query = args.join(" ");
  	if (!query) {
      message.reply("اكتب المطلوب البحث عنه!")
    }
      else {
    
    message.reply(`[ 🔎 جار البحث عن  ${query}... ]`)
      }
    let result = await google.image(query, {safe: true});
    if(result.length === 0) {
    message.reply(`البحث عن الصور لم يدلي بأي نتائج ❌.`)
    return;
  }
  let streams = [];
  let counter = 0;
  
  console.log(result)
  for(let image of result) {
    // Only show 10 images
    if(counter >= 15)
      break;
      
    console.log(`${counter}: ${image.url}`);
    // Ignore urls that does not ends with .jpg or .png
    let url = image.url;
    let title = image.origin.title;
    if(!url.endsWith(".jpg") && !url.endsWith(".png") && !url.endsWith(". webp") && !url.endsWith(".jpeg"))
  
      continue;
    
   let path = `plugins/commands/cache/search-image-${counter}.jpg`;
    let hasError = false;
    await cloudscraper.get({uri: url, encoding: null})
      .then((buffer) => fs.writeFileSync(path, buffer))
      .catch((error) => {
        console.log(error)
        hasError = true;
      });
      
    if(hasError)
      continue;
    
    console.log(`Pushed to streams: ${path}`) ;
    streams.push(fs.createReadStream(path).on("end", async () => {
      if(fs.existsSync(path)) {
        fs.unlink(path, (err) => {
          if(err) return console.log(err);
            
          console.log(`Deleted file: ${path}`);
        });
      }
    }));
    
    counter += 1;
  }
  let msg = {
    body: `[ Results ]\nQuery : ${query}\nFound : ${result.length} image${result.length > 1 ? 's' : ''}\nOnly showing : 10 images`,
    attachment: streams
  };
  message.reply(msg)
    
}

export default {
  config,
  onCall,
};