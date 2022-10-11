const { chat } = require('googleapis/build/src/apis/chat');
const { error } = require('winston');
const {mcloginname,host1,version1, } = require(`./mcmodules.json`);


mineflayer = require('mineflayer')

let bot = mineflayer.createBot({
    version: `${version1}`,
    host: `${host1}`,
    auth: `microsoft`,
    username: `${mcloginname}`,
})



bot.on("chat", (username, message) => {
    if (username === bot.username) return
        console.log(username,message)
          }
)