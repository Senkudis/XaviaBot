const config = {
    name: "القروب",
    aliases: ["infobox","مجموعة","قروب","معلومات"],
    permissions: [0, 1, 2],
    description: "عرض معلومات المجموعة",
    usage: "<>",
    credits: "Diyakd"
}
import { join } from 'path'
import fs from 'fs'
async function streamURL(url) {
    const dest = join(`${global.cachePath}/1.png`);
     if (isURL(url)) {
                    await downloadFile(dest, url);
                } else {
                    await saveFromBase64(dest, url);
                }
  console.log('dcmmmmm')
    setTimeout(j => fs.unlinkSync(j), 60 * 1000, dest);
    return fs.createReadStream(dest);
};
async function onCall({ message, data }) {
    const { threadID, senderID } = message;
    const { Threads, Users } = global.controllers;
    var info = (await Threads.get(threadID)).info
    const oldImage = info.imageSrc || null;
  //console.log(oldImage)
    var listad = '';
    var gendernam = [];
    var gendernu = [];
    for (let i = 0; i < info.members.length; i++) {
        var gioitinhone = (await Users.get(info.members[i].userID)).info.gender;
        var nName = (await Users.get(info.members[i].userID)).info.name;

        if (gioitinhone == "MALE") { gendernam.push(i + gioitinhone) }
        else if (gioitinhone == "FEMALE") { gendernu.push(gioitinhone) }
    };
    for (let i = 0; i < info.adminIDs.length; i++) {
        const name = (await Users.getName(info.adminIDs[i].id));

        listad += '' + `•` + name + '\n';
    }
    var prefix = data?.thread?.data?.prefix || global.config.PREFIX
    message.reply({
      body:`
 ⭐️إسم القروب: ${info.name}
 👥️عدد الأعضاء: ${info.members.length}
 🐰الإيموجي: ${info.emoji}
 📝نظام الموافقة: ${info.approvalMode}
 📍بادئة الأوامر: ${prefix}
 🛗عدد الأعضاء: ${info.members.length}
 🤵عدد الأولاد: ${gendernam.length}
 🤵‍♀️عدد البنات: ${gendernu.length}
 💂عدد الأدمنز: ${info.adminIDs.length}
    \n يشمل: \n ${listad}
    \n💬العدد الإجمالي للرسائل: ${info.messageCount}`,
      attachment: await streamURL(oldImage)
    })
}

export default {
    config,
    onCall
  }