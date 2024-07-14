import { config as lotteryConfig } from "../../lottery.js";

const config = {
    name:"لوتري",
    description: "¯\_(ツ)_/¯",
    usage: "[info/bet] [number bet] [money]",
    cooldown: 5,
    permissions: [0, 1, 2],
    credits: "XaviaTeam | Diyakd"
}

const langData = {
    "ar_SY": {
        "anErrorHasOccurred": "حدث خطأ ",
        "invalidNumberBet": "حدث خطأ! الرهانات حوالي 1 - {limitNumber}",
        "invalidBet": "حدث خطأ! أقل مبلغ رهان هو {minBet}",
        "notEnoughMoney": "ليس لديك ما يكفي من المال للمراهنة ",
        "alreadyBet": "لقد قمت بالفعل بوضع رهانك ",
        "lotteryInfo": "💵== Lottery Info ==💵\n- عدد اللاعبين : {allPlayers}\n- إجمالي المكافأة : {bonus}\n- وقت النهاية : {time}\n\n- الرقم الذي تراهن عليه : {yourNumberBet}\n- مبلغ الرهان الخاص بك : {yourBet}",
        "confirmBet": '🍓== Confirm ==🍓\n أنت تراهن على الرقم : {numberBet}\nبأموال : {bet}\n\nتفاعل ب👍لتاكيد',
        "betSuccess": "لقد قمت بوضع رهان بنجاح  {numberBet} مع رهان  {bet}"
    }
}

async function confirm({ message, getLang, eventData, data }) {
    try {
        const { reaction, userID } = message;
        if (reaction !== '👍') return;
        const userData = data.user;
        if(userData.data.lottery) return;

        const { numberBet, bet } = eventData;
        global.controllers.Users.decreaseMoney(userID, bet);

        userData.data.lottery = {
            numberBet,
            bet
        }

        global.controllers.Users.updateData(userID, userData.data);

        message.send(getLang("betSuccess", { numberBet, bet }))

    } catch (error) {
        console.error(error);
        message.send(getLang("anErrorHasOccurred"))
    }
}

async function onCall({ message, args, getLang, data }) {
    const { senderID } = message;

    const query = args[0];
    if (!query) return message.reply(getLang("anErrorHasOccurred"));

    if (query == 'info') {
        const allLotteryPlayers = Array.from(global.data.users.values()).filter(e => e.data.lottery);
        let bonus = 0;
        allLotteryPlayers.map(e => bonus += (e.data.lottery.bet * 10));

        let option = {
            allPlayers: allLotteryPlayers.length,
            bonus,
            time: lotteryConfig.timeToExecute,
            yourNumberBet: 0,
            yourBet: 0
        }

        const player = data.user;
        if (player.data.lottery) {
            option.yourNumberBet = player.data.lottery.numberBet;
            option.yourBet = player.data.lottery.bet;
        }

        return message.reply(getLang("lotteryInfo", option))
    }
    else if (query == 'bet') {
        const numberBet = parseInt(args[1]);
        if (!numberBet || isNaN(numberBet) || numberBet <= 0 || numberBet > lotteryConfig.limitNumber) return message.send(getLang("invalidNumberBet", { limitNumber: lotteryConfig.limitNumber }));
        const bet = parseInt(args[2]);
        const playerMoney = global.controllers.Users.getMoney(senderID);
        if (!bet || bet < lotteryConfig.minBet || isNaN(bet)) return message.send(getLang("invalidBet", { minBet: lotteryConfig.minBet }));
        if (bet > playerMoney) return message.reply(getLang("notEnoughMoney"));

        let userData = data.user;
        if (userData.data.lottery) return message.reply(getLang("alreadyBet"));

        return message
            .reply(getLang("confirmBet", { numberBet, bet }))
            .then(_ => _.addReactEvent({ callback: confirm, numberBet, bet }))
            .catch(e => {
                if (e.message) {
                    console.error(e.message);
                    message.reply(getLang("anErrorHasOccurred"));
                }
            })
    }
    else {
        return message.send(getLang("anErrorHasOccurred"))
    }
}

export {
    config,
    langData,
    onCall
      }