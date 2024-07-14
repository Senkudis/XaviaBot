const config = {
    name: "باسورد",
    usage: "length",
    description: "تأليف كلمة سر  ",
    cooldown: 5,
    credits: "Diyakd"
}

const langData = {
    "en_US": {
        "password.invalidLength": "Invalid length specified, must be a number between 8 and 64",
        "password.generated": "Generated password: "
    },
    "vi_VN": {
        "password.invalidLength": "Chiều dài không hợp lệ, phải là số giữa 8 và 64",
        "password.generated": "Mật khẩu đã tạo: "
    },
    "ar_SY": {
        "password.invalidLength": "الطول المحدد غير صالح، يجب أن يكون رقمًا بين 8 و 64",
        "password.generated": "تم إنشاء كلمة المرور: "
    }
}

function onCall({ message, args, getLang }) {
    const length = parseInt(args[0]);
    if (isNaN(length) || length < 8 || length > 64) return message.reply(getLang("password.invalidLength"));

    let password = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}\\|;:'\",.<>/?";
    for (let i = 0; i < length; i++) {
        password += characters.charAt(global.random(0, characters.length - 1));
    }

    message.reply(getLang("password.generated") + password);
}

export default {
    config,
    langData,
    onCall
  }