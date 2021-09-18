const {tpa, help, botinfo, token1, mcloginname, mcloginpass, discordchannel, prefix1, host1, version1, discordserverlink } = require(`./mcmodules.json`);
const Discord = require(`discord.js`);
const client = new Discord.Client({
disable_everyone: true,
    max_message_cache: 500,
    message_cache_lifetime: 120,
    message_sweep_interval: 60,
  });
mineflayer = require('mineflayer')
const mineflayerViewer = require('prismarine-viewer').mineflayer
const cmd = require('mineflayer-cmd').plugin
const fs = require('fs');
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
var nightskip = data["auto-night-skip"]








let prefix = "!";
let bot = mineflayer.createBot({
    version: `${version1}`,
    host: `${host1}`,
    username: `${mcloginname}`,
    password: `${mcloginpass}`,
})


client.on('ready', () => {
    console.log(`The discord bot logged in! Username: ${client.user.username}!`)
    channel = client.channels.cache.get(channel)
    if (!channel) {
      console.log(`I could not find the channel (${process.argv[3]})!\nUsage : node discord.js <discord bot token> <channel id> <host> <port> [<name>] [<password>]`)
      process.exit(1)
    }
  })

bot.on('error', function(err) {
    console.log("Bot has encountered an error");
});




  
//discord module

bot.on("message", Message => {
  let channel = client.channels.cache.get(`${discordchannel}`)
  if (!channel) return;
  channel.send(`${Message}`)
})



client.on("message", async msg => {
let args = msg.content.split(" ").slice(1)

if (msg.content.startsWith(".sudo")) {
   let tosend = args.join(" ");
   if (!tosend) return msg.reply ("no args")

   bot.chat(tosend)
   sending = true
   msg.cchannel.send(`${msg.author.tag} hi ${tosend}`)
   
setTimeout(()=> {
sending = false
msg.channel.send(chatdata.join("/n"))
chatdata = {}
},750)
  

} 
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
  bot.on("chat:tpa", ([[moderncraft]]) => {
    bot.chat(`/tpy ${tpa}`);

  })    



// anti afk module

function getRandomArbitrary(min, max) {
       return Math.random() * (max - min) + min;

}

bot.loadPlugin(cmd)



  
bot.on('time', function(time) {
	if(nightskip == "true"){
	if(bot.time.timeOfDay >= 13000){
	bot.chat('/time set day')
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


bot.on('spawn',function() {
    connected=1;
});

bot.on('death',function() {
    bot.emit("respawn")
});

bot.once('spawn', () => {
    mineflayerViewer(bot, { port: 3007, firstPerson: false })
  })


  function bindEvents(bot) {
    bot.on('login', function() {
        console.log("Bot has logged in");
    });

    bot.on('spawn', function() {
        console.log("Bot has spawned");
    });

    bot.on('kicked', function(reason) {
        console.log("Kicked for ", reason);
    });

    bot.on('end', function(reason) {
        // Wait 10 seconds between tries, and try 9999 times
        waitUntil(100, 9999, function condition() {
          try {
            console.log("bot disconected, attempting to reconnect...");
                bot = mineflayer.createBot(options);
                bindEvents(bot);
                return true;
           } catch (error) {
                console.log("Error: " + error);
                return false;
            }
            // Callback function that is only executed when condition is true or time allotted has elapsed
        }, function done(result) {
            console.log("Connection attempt result was: " + result);
        
        });

   });
  }

  //various chat modules for the discord client and the minecraft client

  bot.on("chat", (username, message) => {
    if (username === bot.username) return
    if (message === `${prefix1}yatabot`) {
      bot.chat(`i am yata bot the best bot ever on 0b0t also known as teamcow1 am programmed by some based dude going by the name of moderncraft`)
          }
        })

        bot.on("chat", (username, message) => {
            if (username === bot.username) return
            if (message === `${prefix1}help`) {
                bot.whisper(username, (`am better then u ngl`))
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
                                              bot.chat(`this is the most cursed server ever but still the best we have a shit ton of dupes beggining with the chunk dupe towards the family fun pack dupe and even the donkey lead dupe jeez 3 dupes not good man but eh better keep the dupes here would be cool thx owners.`)
                                                  }
                                                })
            


                                                bot.on("chat", (username, message) => {
                                                    if (username === bot.username) return
                                                    if (message === `${prefix1}commands`) {
                                                        bot.whisper(username, (`discord  aboutserver  help  content kit   help yatabot  group . my prefix is -`))
                                                          }
                                                        })
                                                   
                                                        bot.on("chat", (username, message) => {
                                                            if (username === bot.username) return
                                                            if (message === `${prefix1}group`) {
                                                              bot.chat(`yatagarasu 2.0 is a group that does various spawn projects and is mainly a pvp group if ur interested u can apply at https://discord.gg/ajKUrhdSv6 and we hope to see you there best of luck -moderncraft`)
                                                                  }
                                                                }) 

                                                                
                                                                
                                                                client.on("message", message => {
                                                                  if(message.content.startsWith(`${prefix1}about`)) {
                                                                      message.channel.send("yatagarasu discord bot at ur service fully fledged and functional at 0b0t and at the same epic discord chat bot.")
                                                                  }
                                                              })
                                                              client.on("message", message => {
                                                                if(message.content.startsWith(`${prefix1}serverinfo`)) {
                                                                    message.channel.send("welcome to yatagarasu 2.0 where u can find all things 0b0t and group related where everything is at ur fingertips using this epic minecraft/discordbot wich is a fully fledged all in one anarchy server solution for ur needs.")
                                                                }
                                                            })
                                                          
                                                          client.on("message", message => {
                                                            if(message.content.startsWith(`${prefix1}help2`)) {
                                                                message.channel.send(`${help}`)
                                                            }
                                                          }
                                                        )

                                                        client.on("message", message => {
                                                          if(message.content.startsWith(`${prefix1}botinfo`)) {
                                                              message.channel.send(`${botinfo}`)
                                                          }
                                                        }
                                                      )




                                                      bot.on("chat", (username, message) => {
                                                        if (username === bot.username) return
                                                        if (message === `${prefix1}comehere`) {
                                                          bot.chat(`/tpa ${username}`)
                                                          bot.whisper(username, (`bot tries to tpa to u`))
                                                          console.log(` ${username} got the bot to tpa`) 
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
                                                              }
                                                            })
                                                            
                                                               
                                                            


                                                            




                                                           
                                                                    

                                                                  

                                                                              
                        
  client.login(`${token1}`)

