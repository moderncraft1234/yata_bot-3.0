const {tpa, help, youtubetoken1, botinfo, token1, mcloginname, mcloginpass, discordchannel, prefix1, host1, version1, discordserverlink, channellogs, botrelog } = require(`./mcmodules.json`);
const Discord = require(`discord.js`);

var express = require('express');
const { Client, Intents } = require("discord.js");
const client = new Client({
  intents: [Intents.FLAGS.GUILDS,"GUILD_MESSAGES"]
});


const YouTube = require("discord-youtube-api");
const Youtube = require("youtube-api")
Youtube.authenticate({
  type: "oauth"
, token: `${youtubetoken1}`
});

mineflayer = require('mineflayer')
const pvp = require('mineflayer-pvp').plugin
const mineflayerViewer = require('prismarine-viewer').mineflayer
const cmd = require('mineflayer-cmd').plugin
const fs = require('fs');
const { userInfo } = require('os');
let rawdata = fs.readFileSync('config.json');
let data = JSON.parse(rawdata);
var lasttime = -1;
var moving = 0;
var connected = 0;
var actions = [ 'forward', 'back', 'left', 'right']
var lastaction;
var pi = 3.14159;
var moveinterval = 2; // 2 second movement interval
var maxrandom = 5; // 0-5 seconds added to movement interval (randomly)
var host = data["ip"];
var username = data["name"]
const navigatePlugin = require('mineflayer-navigate')(mineflayer);
const armorManager = require('mineflayer-armor-manager')
const {
    pathfinder,
    Movements,
    goals
} = require('mineflayer-pathfinder')
var nightskip = data["auto-night-skip"]
const GoalFollow = goals.GoalFollow
const GoalBlock = goals.GoalBlock
const { MessageAttachment, MessageEmbed } = require('discord.js');

const vec3 = require('vec3')
function requireUncached(module) {
  delete require.cache[require.resolve(module)]
  return require(module)
}

const path = require('path')
function injectModules (bot) {
  const modules = path.join(__dirname, 'modules')
    .readdirSync(modules) // find the plugins
    .filter(x => x.endsWith('.js')) // only use .js files
    .map(pluginName => require(path.join(modules, pluginName)))

  bot.loadPlugins(modules)
}

function initBot () {
  const bot = mineflayer.createBot(OPTIONS)
  injectModules(bot)

  bot.on('end', initBot) // auto restart
}









const {keys} = Object;
const {Console} = console;


var date = new Date


var util = require('util');
const { channel } = require('diagnostics_channel');
var log_file = fs.createWriteStream(__dirname + `/logs/botlogs.log`, {flags : 'w'});
var log_stdout = process.stdout;

console.log = function(d) { //
  log_file.write(util.format(d) + '\n');
  log_stdout.write(util.format(d) + '\n');
};






let bot = mineflayer.createBot({
    version: `${version1}`,
    host: `${host1}`,
    username: `${mcloginname}`,
    password: `${mcloginpass}`,
})

bot.loadPlugin(pvp)
bot.loadPlugin(armorManager)
bot.loadPlugin(pathfinder)





function relog() {
  console.log("Attempting to reconnect...");
  client.channels.cache.get(`${botrelog}`).send(`bot atempting to reconect to  ${host1}`);
  bot = mineflayer.createBot
  client.channels.cache.get(`${botrelog}`).setTopic(`bot is curently online on (${host1})`)

}









  bot.on('kicked', (reason) => {
    console.log(`I got kicked for ${reason}`)
    client.channels.cache.get(`${botrelog}`).send(`bot got kicked for ${reason}`);
    client.channels.cache.get(`${botrelog}`).setTopic(`bot got kicked for ${reason} bot will shortly be back last known position is (${bot.entity.position}) `)
  })


  bot.on('end', function() {
      console.log("Bot has ended");
      // If set less than 30s you will get an invalid credentials error, which we handle above.
      setTimeout(relog, 30000);  
      client.channels.cache.get(`${botrelog}`).send(`bot has ended`);

  });


bot.on('error', function(err) {
      console.log('Error attempting to reconnect: ' + err.errno + '.');
      if (err.code == undefined) {
          console.log('Invalid credentials OR bot needs to wait because it relogged too quickly.');
          console.log('Will retry to connect in 30 seconds. ');
          setTimeout(relog, 30000);
          client.channels.cache.get(`${botrelog}`).send(`bot failed to reconect due to server outage bot will atempt a new reconect in 30 secconds`);
          
      }
      })
     



bot.once('spawn', () => {
  bot.setControlState('right', true);
  setTimeout(() => {
      bot.setControlState('right', false);
  }, 2000);
})




bot.on('error', function(err) {
    console.log(`bot couldnt log onto ${host1}`);
});







  
//discord module

client.on('ready', () => {
  console.log(`The discord bot logged in! Username: ${client.user.username}!`)
 channel2 = client.channels.cache.get(`${discordchannel}`)
  if (!channel) {
    console.log(`I could not find the channel (${process.argv[3]})!\nUsage : node discord.js <discord bot token> <channel id> <host> <port> [<name>] [<password>]`)
    process.exit(1)
        
  }
})


// Redirect Discord messages to in-game chat
client.on('message', message => {
  // Only handle messages in specified channel
  if (message.channel.id !== channel.id) return
  // Ignore messages from the bot itself
  if (message.author.id === client.user.id) return

  bot.chat(`[${message.author.username}] > ${message.content}`)
})

// Redirect in-game messages to Discord channel
bot.on('chat', (username, message) => {



  const serverchat = new MessageEmbed()
  .setDescription(`[${username}] : ${message} `)
  .setColor('#0099ff')
  .setFooter(`${host1}`,'https://i.imgur.com/FAlKdV9.gif')
 
channel2.send({ embeds: [serverchat] });
})








 










  bot.on("whisper", (username, message)  => {
    if (username === bot.username) return
    if (message === `${prefix1}comehere` ) {
      bot.chat(`/tpa ${username}`)    
  fs.appendFile('logs/tpa-coords.txt', `<${username}> coords are  <${bot.entity.position}> date ${date} `,);
    
    
    console.log('coords saved')
    
  }
    }
  )


  bot.on('death',function() {
    fs.appendFile('logs/bot-deaths.txt', `bot died at <${bot.entity.position}> `, function (err) { 
      if (err) throw err;
      console.log(`bot died at ${bot.entity.position} `);
    
    }
    
  )
  })
    
  


  



  client.on(`message`, message => { 
    console.log(`[${message.author.tag}] > [${message}] `);

  })


bot.on('sleep', () => {
    bot.chat('Good night!')
  })
  bot.on('wake', () => {
    bot.chat('Good morning!')
  })
  
  async function goToSleep () {
    const bed = bot.findBlock({
      matching: block => bot.isABed(block)
    })
    if (bed) {
      try {
        await bot.sleep(bed)
        bot.chat("I'm sleeping")
      } catch (err) {
        bot.chat(`I can't sleep: ${err.message}`)
      }
    } else {
      bot.chat('No nearby bed')
    }
  }
  
  async function wakeUp () {
    try {
      await bot.wake()
    } catch (err) {
      bot.chat(`I can't wake up: ${err.message}`)
    }
  }

//tpa modules

bot.addChatPattern("tpa", /^([A-Za-z0-9_]{2,16}) wants to teleport to you\.$/, {
    parse: true,
  });
  bot.on("chat:tpa", ([[username]]) => {
    bot.chat(`/tpy ${username}`);
    bot.whisper(username, (`well hello there ${username}`))

  })    


  bot.addChatPattern("tpa", /discord.gg\.$/, {
    parse: true,
  });

  bot.on("chat:discord.gg", ([[username]]) => {
    bot.chat(`/ignore ${username}`);
   console.log(`${username} has been ignored `)
   client.channels.cache.get(`${channellogs}`).send(`${username} has been ignored`);
  })    



  bot.addChatPattern("tpa", /kits\.$/, {
    parse: true,
  });
 
  bot.on("chat:free", ([[username]]) => {
    bot.chat(`/ignore ${username}`);
   console.log(`${username} has been ignored `)
   client.channels.cache.get(`${channellogs}`).send(`${username} has been ignored`);
  })    

  
  bot.addChatPattern("tpa", /shop\.$/, {
    parse: true,
  });


  bot.on("chat:kits", ([[username]]) => {
    bot.chat(`/ignore ${username}`);
   console.log(`${username} has been ignored `)

   client.channels.cache.get(`${channellogs}`).send(`${username} has been ignored`);
  })    


  bot.addChatPattern("tpa", /cheap\.$/, {
    parse: true,
  });


  bot.on("chat:cheap", ([[username]]) => {
    bot.chat(`/ignore ${username}`);
   console.log(`${username} has been ignored `)
   client.channels.cache.get(`${channellogs}`).send(`${username} has been ignored`);

  })    


  bot.addChatPattern("tpa", /20b20t\.$/, {
    parse: true,
  });


  bot.on("chat:20b20t", ([[username]]) => {
    bot.chat(`/ignore ${username}`);
   console.log(`${username} has been ignored `)

   client.channels.cache.get(`${channellogs}`).send(`${username} has been ignored`);
  })    



  bot.addChatPattern("tpa", /stashes\.$/, {
    parse: true,
  });


  bot.on("chat:stashes", ([[username]]) => {
    bot.chat(`/ignore ${username}`);
   console.log(`${username} has been ignored `)
   client.channels.cache.get(`${channellogs}`).send(`${username} has been ignored`);

  })    


  bot.addChatPattern("tpa", /stashes\.$/, {
    parse: true,
  });


  bot.on("chat:", ([[username]]) => {
    bot.chat(`/ignore ${username}`);
   console.log(`${username} has been ignored `)
   client.channels.cache.get(`${channellogs}`).send(`${username} has been ignored`);


  })   

  bot.on("chat:yatagarasu",([[username]]) => {
   bot.whisper(username,(`hi there`))
  client.channels.cache.get(`${channellogs}`).send(`${username} has said the word O_o `)
  })
    


// anti afk module

function getRandomArbitrary(min, max) {
       return Math.random() * (max - min) + min;

}

bot.loadPlugin(cmd)



  
bot.on('time', function(time) {
	if(nightskip == "true"){
	if(bot.time.timeOfDay >= 13000){
	bot.chat('join spawncult',`https://discord.gg/Yxh6j3bzPw`)
	}}
    if (connected <1) {
        return;
    }
    if (lasttime<0) {
        lasttime = bot.time.age;
    } else {
        var randomadd = Math.random() * maxrandom * 20;
        var interval = moveinterval*20 + randomadd;
        if (bot.time.age - lasttime > interval) {
            if (moving == 1) {
                bot.setControlState(lastaction,false);
                moving = 0;
                lasttime = bot.time.age;
            } else {
                var yaw = Math.random()*pi - (0.5*pi);
                var pitch = Math.random()*pi - (0.5*pi);
                bot.look(yaw,pitch,false);
                lastaction = actions[Math.floor(Math.random() * actions.length)];
                bot.setControlState(lastaction,true);
                moving = 1;
                lasttime = bot.time.age;
                bot.activateItem();
            }
        }
    }
});


bot._client.on("tab_complete", data => console.log(data))

bot.on(`death`,function(){
  var delayInMilliseconds = 1000;
  client.channels.cache.get(`${channellogs}`).send(`bot died at ${bot.entity.position}`);
}

)


    




bot.on('spawn',function() {
    connected=1;
     


console.log(`bot has respawned`)
client.channels.cache.get(`${channellogs}`).send(`bot has respawned`);
});

//auto channel topic updater on event

bot.on('death',function() {
    bot.emit("respawn")
    channel2.setTopic(`the ingamebot name is ${bot.entity.username} server version is ${version1} and the server is ${host1} and the bot is located at ${bot.entity.position} and ${host1} has curently ${Object.keys(bot.players).length} players online  `)
});

bot.once('spawn', () => {
    mineflayerViewer(bot, { port: 3009, firstPerson: false })
    console.log(`bot has sucsesfully logged on ${host1}`)
    var delayInMilliseconds = 30000;
  })


  bot.on('playerJoined', (player) => {
    if (player.username !== bot.username) {

      client.channels.cache.get(`${channellogs}`).send(`${player.username} has joined ${host1}`);
      var delayInMilliseconds = 3000;

      bot.whisper(username, (`hello there ${player.username} welcome to the worst server`))
    

      

    }
  })


  bot.on('playerLeft', (player) => {
    if (player.username !== bot.username) {
      client.channels.cache.get(`${channellogs}`).send(`${player.username} has left ${host1}`);
    
    }
    })





 

    bot.on('kicked', (reason) => {
      console.log(`I got kicked for ${reason}`)
      client.channels.cache.get(`${botrelog}`).send(`bot got kicked for ${reason}`);
    })


    bot.on('rain', () => {
      if (bot.isRaining) {
        client.channels.cache.get(`${channellogs}`).send(`It started raining`);
      } else {
        client.channels.cache.get(`${channellogs}`).send(`it stopped raining`);
      }
    })






 






  

     
  //various chat modules for the discord client and the minecraft client

 bot.on("chat", (username, message) => {
   console.log(`${username} > ${message} `)
 })




  bot.on("chat", (username, message) => {
    if (username === bot.username) return
    if (message === `${prefix1}yatabot`) {
      bot.chat(`i am yata bot the best bot ever on ${host1} also known as ${bot.entity.username} am programmed by some based dude going by the name of moderncraft`)
          }
        })

        bot.on("chat", (username, message) => {
            if (username === bot.username) return
            if (message === `${prefix1}help`) {
                bot.whisper(username, (`very epic bot join spawncult now`))
                  }
                })
        
                bot.on("chat", (username, message) => {
                    if (username === bot.username) return
                    if (message === `${prefix1}kit`) {
                      bot.chat(`why the fuck r u ordering a kit ${username} thats kinda cringe ngl `)
                          }
                        }) 
    

                        bot.on("chat", (username, message) => {
                            if (username === bot.username) return
                            if (message === `${prefix1}content`) {
                                bot.whisper(username, (`never gonna give u up never gonna let u down or run around and just hurt u`))
                                  }
                                })
        
                                bot.on("chat", (username, message) => {
                                    if (username === bot.username) return
                                    if (message === `${prefix1}discord`) {
                                        bot.whisper(username, (`${discordserverlink} <really based discord ngl`))
                                          }
                                        })

         
                                      bot.on("chat", (username, message) => {
                                            if (username === bot.username) return
                                            if (message === `${prefix1}aboutserver`) {
                                              bot.whisper(username, (`this server is called ${host1} and u can find information about it here |https://9b9t.miraheze.org/wiki/Main_Page|`))
                                                  }
                                                })
            


                                                bot.on("chat", (username, message) => {
                                                    if (username === bot.username) return
                                                    if (message === `${prefix1}commands`) {
                                                        bot.whisper(username, (`discord  aboutserver  help  content kit   help yatabot  group . my prefix is ${prefix1} `))
                                                          }
                                                        })
                                                   
                                                        bot.on("chat", (username, message) => {
                                                            if (username === bot.username) return
                                                            if (message === `${prefix1}group`) {
                                                              bot.whisper(username, (`join spawn cult now its the best group  if u wanna do some epic ${host1} related stuff :)`))
                                                                  }
                                                                }) 

                                                                const about = new MessageEmbed()
                                                                .setTitle(`yata_bot`)
                                                                .setDescription(`yatagarasu discord bot wich is fully functional and curently  running on ${host1}`)
                                                                .setColor('#0099ff')
                                                                .setFooter(`${host1}`,'https://i.imgur.com/FAlKdV9.gif')
                                                                
                                                                


                                                                
                                                                client.on("message", message => {
                                                                  if(message.content.startsWith(`${prefix1}about`)) {
                                                                      message.channel.send({ embeds: [about] });
                                                                  }
                                                              })

                                                              const serverinfo = new MessageEmbed()
                                                              .setTitle(`yata_bot`)
                                                              .setDescription(`welcome to yatagarasu 2.0 your desired hub for all things  anarchy servers the bot is curently being hosted on ${host1} this is also where we have a group called the spawn cult of 9b9t  `)
                                                              .setColor('#0099ff')
                                                              .setAuthor(`spawn cult group invite link > https://discord.gg/qW246MUACc `)
                                                              .setFooter(`${host1}`,'https://i.imgur.com/FAlKdV9.gif')
                                                                     

                                                              client.on("message", message => {
                                                                if(message.content.startsWith(`${prefix1}serverinfo`)) {
                                                                    message.channel.send({ embeds: [serverinfo] });
                                                                }
                                                            })
                                                          
                                                            const help2 = new MessageEmbed()
                                                            .setTitle(`yata_bot`)
                                                            .setDescription(`${help}`)
                                                            .setColor('#0099ff')
                                                            .setFooter(`${host1}`,'https://i.imgur.com/FAlKdV9.gif')
                                                            

                                                          client.on("message", message => {
                                                            if(message.content.startsWith(`${prefix1}help2`)) {
                                                                message.channel.send({ embeds: [help2] });
                                                            }
                                                          }
                                                        )


                                                        const botinfo2 = new MessageEmbed()
                                                        .setTitle(`yata_bot`)
                                                        .setDescription(`${botinfo}`)
                                                        .setColor('#0099ff')
                                                        .setFooter(`${host1}`,'https://i.imgur.com/FAlKdV9.gif')

                                                        client.on("message", message => {
                                                          if(message.content.startsWith(`${prefix1}botinfo`)) {
                                                              message.channel.send({ embeds: [botinfo2] });
                                                          }
                                                        }
                                                      )




                                                      bot.on("chat", (username, message) => {
                                                        if (username === bot.username) return
                                                        if (message === `${prefix1}comehere`) {
                                                          bot.chat(`/tpa ${username}`)
                                                          bot.whisper(username, (`bot tries to tpa to u`))
                                                          console.log(` ${username} got the bot to tpa`) 
                                                          , function (err) {
                                                            if (err) throw err;
                                                            bot.whisper(username, (`bot cant tpa to u due to it not being suported on ${host1}`)) 
                                                                     }


                                                              }
                                                            })


                                                            let mcData
                                                            bot.once('inject_allowed', () => {
                                                              mcData = require('minecraft-data')(bot.version)
                                                            })

                                                          

                                                            
                                                            
                                                          

      
                                                
                                                            bot.on("whisper", (username, message)  => {
                                                              if (username === bot.username) return
                                                              if (message === `${prefix1}suicide`) {
                                                                bot.chat(`/kill`)
                                                                bot.whisper(username, (`bot sucsesssfully respawned`))
                                                                console.log(`wth  ${username} found the kill switch and hes msg was.: ${message}`) 
                                                                    }
                                                                  })    

                                                                  bot.on("chat", (username, message) => {
                                                                    if (username === bot.username) return
                                                                    if (message === `${prefix1}botowner`) {
                                                                    bot.whisper(username, (`${tpa}`))
                                                                          }
                                                                        })    

                                                              bot.on("whisper", (username, message)  => {
                                                              if (username === bot.username) return
                                                              if (message === `${prefix1}help` ) {
                                                              bot.whisper(username, (`${help}`))
                                                              console.log(`whisper help found by ${username}: ${message}`)
                                                              fs.appendFile('logs/help-commands', `|<${username}> used ${message} for a help command|`, function (err) {
                                                                if (err) throw err;  
                                                              })
                                                              }
                                                            })
                                                          


                                                            bot.on("whisper", (username, message)  => {
                                                              if (username === bot.username) return
                                                              if (message === `${prefix1}location` ) {
                                                              bot.whisper(username, (`am at [${bot.entity.position}] come and find me if u dare `))  
                                                              fs.appendFile('logs/position-requests.txt', `|<${username}> requested coords|`, function (err) {
                                                                if (err) throw err;
                                                                console.log(`<${username}> requested coordinates and obtained them dont let him get to the base all data is saved`);
                                                                
                                                              })  
                                                                }
                                                              })


                                                        const ingamename = new MessageEmbed()
                                                        .setTitle(`yata_bot`)
                                                        .setDescription(`igamename of the bot =`)
                                                        .setColor('#0099ff')
                                                        .setFooter(`${host1}`,'https://i.imgur.com/FAlKdV9.gif')


                                                            client.on("message", message => {
                                                              if(message.content.startsWith(`${prefix1}ingamename`)) {
                                                                  message.channel.send({ embeds: [ingamename] });
                                                                  message.channel.send(`[${bot.entity.username}]`)
                                                                  
                                                              }
                                                            }
                                                          )

                                                          const killbot = new MessageEmbed()
                                                          .setTitle(`yata_bot`)
                                                          .setDescription(`ingame bot  has killed itself `)
                                                          .setColor('#0099ff')
                                                          .setFooter(`${host1}`,'https://i.imgur.com/FAlKdV9.gif')

                                                          client.on("message",message =>{
                                                            if(message.content.startsWith(`${prefix1}killbot`)) {
                                                           bot.chat(`/kill`)
                                                           message.channel.send({ embeds: [killbot] });
                                                           console.log(`bot has killed itself uppon a request from ${message.author.tag}`)
                                                          }
                                                        }
                                                           )


                                                           const botinfo1 = new MessageEmbed()
                                                          .setTitle(`yata_bot`)
                                                          .setDescription(`bot is running on ${version1} and hosted on ${host1} and the bot username is ${bot.username}  ${username}`)
                                                          .setColor('#0099ff')
                                                          .setFooter(`${host1}`,'https://i.imgur.com/FAlKdV9.gif')

                                                           client.on("message",message =>{
                                                            if(message.content.startsWith(`${prefix1}bot-info`)) {
                                                            var delayInMilliseconds = 1000;
                                                            message.channel.send({ embeds: [botinfo1] });
                                                            console.log(`bot information has been requested by  ${message.author.tag}`)
                                                            bot.chat(`try to do ${prefix1}commands`)
                                                      
                                                            }
                                                            })

                                                            const position1 = new MessageEmbed()
                                                          .setTitle(`yata_bot`)
                                                          .setDescription(`position`)
                                                          .setColor('#0099ff')
                                                          .setFooter(`${host1}`,'https://i.imgur.com/FAlKdV9.gif')

                                                            client.on("message",message =>{
                                                              if(message.content.startsWith(`${prefix1}position`)) {
                                                              var delayInMilliseconds = 1000;
                                                              message.channel.send({ embeds: [position1] });
                                                              message.channel.send(`${bot.entity.position}`)
                                                              console.log(`a discord user had requested the bot postion hes discord username is ${message.author.tag}`)
                                                              }
                                                            })
                                                            
                                                            const serverhelp = new MessageEmbed()
                                                            .setTitle(`yata_bot`)
                                                            .setDescription(`bot performed /help on ${host1} u can see result in <#${discordchannel}>`)
                                                            .setColor('#0099ff')
                                                            .setFooter(`${host1}`,'https://i.imgur.com/FAlKdV9.gif')
                                                        
                                                                 


                                                              client.on("message",message =>{
                                                                if(message.content.startsWith(`${prefix1}server-help`)) {
                                                                var delayInMilliseconds = 3000;
                                                                message.channel.send({ embeds: [serverhelp] });
                                                                bot.chat(`/help`)
                                                                console.log(`server info reqested by ${message.author.tag}`)
                                                                }
                                                              
                                                              })


                                                              

                                                              const topic6 = new MessageEmbed()
                                                              .setTitle(`yata_bot   `)
                                                              .setDescription(`topic has been updated of <#${discordchannel}>  `)
                                                              .setColor('#0099ff')
                                                              .setFooter(`${host1}`,'https://i.imgur.com/FAlKdV9.gif')
                                                              


                                                              client.on("message",message =>{
                                                                if(message.content.startsWith(`${prefix1}topic`)) {
                                                                var delayInMilliseconds = 3000;
                                                                channel2.setTopic(`the ingamebot name is ${bot.entity.username} server version is ${version1} and the server is ${host1} and the bot is located at ${bot.entity.position} and ${host1} has curently ${Object.keys(bot.players).length} players online  `)
                                                                message.channel.send({ embeds: [topic6] });
                                                               console.log(`${message.author.tag} > ${message}`)
                                                                }
       
                                                              })


                                                            
                                                              
                                                              
                                                             
                                                                  
                                                              
                                                            

  
client.on("message",message =>{
  if(message.content.startsWith(`${prefix1}playerlist`)) {

    const other1 = new MessageEmbed() 
    .setDescription (` the server has ${Object.keys(bot.players).length} players online [${host1}]`)    
    .addFields(
    { name: 'Players curently', value: `Online: ${Object.keys(bot.players).join(' ,').slice(0, 1000)}` }
    )
    .setTimestamp()
    .setFooter('playerlist cant show all players due to it being a big server', 'https://i.imgur.com/FAlKdV9.gif');


message.channel.send({ embeds: [other1] });
} 

})
                                                                





const helpcmd1 = new MessageEmbed()
.setTitle(`yata_bot-help-page   `)
.setDescription(`this is yata-bot-3.0 and this bot is hosted on ${host1} the current discord commands for the bot are. :(${prefix1}playerlist) wich gives u all online players. : (${prefix1}server-help) wich executes /help ingame for the server where it is hosted on.: (${prefix1}position) wich gives u the current location of the bot.: (${prefix1}killbot) wich kills the ingamebot.: (${prefix1}ingamename) wich tell u the ign of the bot.:... The bot also has a webgui at http://modern.tudbut.de:3009/ wich u can use to view the bot suroundings it sometimes will take a while for it in order to render all in but thats all  `)
.setColor('#0099ff')
.setFooter(`${host1}`,'https://i.imgur.com/FAlKdV9.gif',`http://modern.tudbut.de:3009/`)



client.on("message",message =>{
  if(message.content.startsWith(`${prefix1}help`)) {
  var delayInMilliseconds = 3000;
 
  message.channel.send({ embeds: [helpcmd1] });
 console.log(`${message.author.tag} > ${message}`)
 client.channels.cache(`${channellogs}`).send(`help command requested from ${message.author.tag}`)
  }

})


//furry related commands lol

client.on("message",message => {
  if(message.content.startsWith(`${prefix1}UwU`)) {
    message.channel.send(`OwO`)
    client.channels.cache(`${channellogs}`).send(`[${message.author.tag}] > ${prefix1}UwU`)
  }
  })






                                                 
                        
  client.login(`${token1}`)

