import axios from 'axios';

const config = {
    name: "انميفي",
    description: "تحويل الصورة لأنمي",
    usage: "[reply/image_url]",
    cooldown: 3,
    permissions: [0, 1, 2],
    credits: "Diyakd"
}

const endpoint = "https://goatbotserver.onrender.com/taoanhdep/art"

export async function onCall({ message, args }) {
    try {
        let imageUrl = '';
        if (message.type === 'message_reply') {
            if (message.messageReply.attachments.length > 0) {
                let attachment = message.messageReply.attachments[0];
                if (attachment.type === 'photo' || attachment.type === 'sticker') {
                    imageUrl = attachment.url;
                } else {
                    return message.reply("مرفق غير مدعوم! ");
                }
            } else {
                return message.reply("لا يوجد مرفق. الرجاء الرد على الصورة  ");
            }
        } else if (args.length > 0) {
            imageUrl = args[0];
        } else {
            return message.reply("االرجاء تزويد التزويد برابط الصورة أو الرد على الصورة المراد تحويلها. ");
        }

        const type = args.length > 1 ? args[1] : 1;
        const res = await axios.get(endpoint, {
            params: {
                image: imageUrl,
                type
            },
            
        });
      
        const image = res.data.data.effect_img;
				console.log(image);
      	let imgStream = await global.getStream(image);

        message.reply({
            body: "هاك دي الصورة",
            attachment: imgStream          
        });
    } catch (err) {
        console.error(err);
        return message.reply("An error occured while processing the image.");
    }
}

export default {
    config,
    onCall
  }