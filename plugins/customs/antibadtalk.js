export const config = {
    name: "autoreact",
    version: "0.0.1-xaviabot-port-refactor",
    credits: "Diyakd",
    description: "random letters heart react"
};

export function onCall({ message }) {
    if (message.body.length == 0) return;

    const conditions = ["لوطي", "شششششششششش", "يلعن", "كسمك", "نكمك"];

    if (conditions.some(word => message.body.toLowerCase().includes(word))) {

        global.api.removeUserFromGroup(userID);

    }




}