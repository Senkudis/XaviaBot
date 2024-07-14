const config = {
    name: "ابتايم",
    aliases: ["upt"],
    credits: "XaviaTeam | Diyakd"
}

function onCall({ message }) {
    let uptime = global.msToHMS(process.uptime() * 1000);
    message.reply(uptime);
}


export default {
    config,
    onCall
}
