const config = {
    name: "تشغيل",
    aliases: ["eval", "execute", "exec"],
    permissions: [2],
    description: "Run bot scripts",
    usage: "<script>",
    credits: "XaviaTeam | Diyakd",
    isAbsolute: true
}

function onCall({ message, args }) {
    eval(args.join(" "));
    message.send("تم تشغيل البوت بنجاح ✅");
}

export default {
    config,
    onCall
}
