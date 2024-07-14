const config = {
    name: "ادمن",
    aliases: ["ads","مسؤول"],
    version: "1.0.1",
    description: "عرض قائمة، أواضافة او ازالة دور مسؤول من المجموعة",
    permissions: [0, 1, 2],
    cooldown: 5,
    credits: "Diyakd"
}

async function onCall({ message, args, data, userPermissions }) {
    const { type, messageReply, mentions, senderID, threadID, reply } = message;

    try {
        const threadInfo = data.thread.info;
        const { adminIDs } = threadInfo;
        //const { id } = adminIDs;
      const isGroupAdmin = userPermissions.some(p => p == 1);

        let query = args[0]?.toLowerCase();
        switch (query) {
            case "اضف":
                {
                    if (!adminIDs.some(e => e.id == global.botID)) return reply("محتاج البوت يكون أدمن!");
                  if (!isGroupAdmin) return reply("ما عندك صلاحيات كافية عشان تنفذ الأمر دا ❌");

                    let success = [];
                    if (type == "message_reply") {
                        let userID = messageReply.senderID;
                        if (adminIDs.some(e => e.id == userID)) return reply('الزول دا أصلاً أدمن 😐');
                        global.api.changeAdminStatus(threadID, userID, true);
                        success.push({
                            id: userID,
                            name: (await global.controllers.Users.getInfo(userID))?.name || userID
                        });
                    } else if (Object.keys(mentions).length > 0) {
                        for (const userID in mentions) {
                            if (adminIDs.some(e => e.id == global.botID)) continue ;
                            global.api.changeAdminStatus(threadID, userID, true);
                            success.push({
                                id: userID,
                                name: mentions[userID].replace(/@/g, '')
                            });
                        }
                    } else return reply("كدي تاقي أو رد على رسالته ");

                    
                    reply({
                        body: `تمت إضافة ${success.map(user => user.name).join(", ")} بدور مسؤول في المجموعة`,
                        mentions: success.map(user => ({ tag: user.name, id: user.id }))
                    });;

                    break;
                }
            case "remove":
            case "حذف":
            case "delete":
            case "ازيل":
                {
                    if (!adminIDs.some(e => e.id == global.botID)) return reply("البوت محتاج يكون أدمن!");
                  if (!isGroupAdmin) return reply("You don't have enough permission to use this command");

                    let success = [];
                    if (type == "message_reply") {
                        let userID = messageReply.senderID;
                        if (!adminIDs.some(e => e.id == userID)) return reply("This user is not an admin");
                        global.api.changeAdminStatus(threadID, userID, false);
                        success.push({
                            id: userID,
                            name: (await global.controllers.Users.getInfo(userID))?.name || userID
                        });
                    } else if (Object.keys(mentions).length > 0) {
                        for (const userID in mentions) {
                            if (adminIDs.some(e => e.id == global.botID)) continue;
                            global.api.changeAdminStatus(threadID, userID, false);
                            success.push({
                                id: userID,
                                name: mentions[userID].replace(/@/g, '')
                            });
                        }
                    } else return reply("كدي تاقي او رد على رسالته ");

                    
                    reply({
                        body: `تمت إقالة ${success.map(user => user.name).join(", ")} من منصب المسؤول`,
                        mentions: success.map(user => ({ tag: user.name, id: user.id }))
                    });;

                    break;
                }
            default:
                {
                    
                 // let name = (await global.controllers.Users.getName(adminIDs[0]));
                  //      let admins = info.name;
                            
                    
                 //   admins = await Promise.all(admins);
            //    let aID =  global.api.getThreadInfo(threadID, (err, info.adminIDs));
                  const { MODERATORS } = global.config;
                 const adminlist = adminIDs.map(e => e.id);
                  let msg = "مسؤولي المجموعة:\n";
                  let mtn = "";
                  for (let i = 0; i < adminlist.length; i++) {
                  let Name = (await global.controllers.Users.getName(adminlist[i])) || "مستخدم فيسبوك";
   								msg += `◆ ${Name} - ${adminlist[i]}\n`;
     					//		mtn += `[{ tag: ${Name}, id: ${adminlist[i]} }]`;

}
console.log(adminlist)

                  reply({
                  body:  msg, 
             //     mentions: [{ tag: Name, id: adminlist[i] }]
                  });
                    break;
                }
        }
    } catch (error) {
        reply(`${error}`);
        console.log(error);
    }

    return;
}

export default {
    config,
    onCall
  }