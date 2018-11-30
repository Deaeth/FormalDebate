const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
    var timer = ms("10s")
    setInterval(function(){
      let mutetime = "0s";
      let mutetime2 = "5s";
      //!tempmute @user 1s/m/h/d
      let tomute = message.guild.member(message.mentions.users.first());
      if(!tomute){
        return;
      }
      if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Can't mute them!");
      let muterole = message.guild.roles.find(`name`, "muted");
      //start of debater1 mute
      if(!muterole){
        try{
          muterole = message.guild.createRole({
            name: "muted",
            color: "#000000",
            permissions:[]
          })
          message.guild.channels.forEach(async (channel, id) => {
            await channel.overwritePermissions(muterole, {
              SEND_MESSAGES: false,
              ADD_REACTIONS: false
            });
          });
        }catch(e){
          console.log(e.stack);
        }
      }
      //end of debater1 mute

      if(!mutetime) return message.reply("You didn't specify a time!");

      tomute.addRole(muterole.id);
      message.reply(`<@${tomute.id}> has been muted for ${ms(ms(mutetime))}`);

      setTimeout(function(){
        tomute.removeRole(muterole.id);
        message.channel.send(`<@${tomute.id}> has been unmuted!`);
      }, ms(mutetime));

      setTimeout(function(){
        tomute.addRole(muterole.id);
        message.reply(`<@${tomute.id}> has been muted for ${ms(ms(mutetime2))}`);
      }, ms(mutetime2));

    //!tempmute @user 1s/m/h/d

        let tomute2 = message.guild.member(message.mentions.users.last());
        if(!tomute2) return;
        if(tomute2.hasPermission("MANAGE_MESSAGES")) return message.reply("Can't mute them!");
        let muterole2 = message.guild.roles.find(`name`, "muted");
        //start of debater2 mute
        if(!muterole2){
          try{
            muterole2 = message.guild.createRole({
              name: "muted",
              color: "#000000",
              permissions:[]
            })
            message.guild.channels.forEach(async (channel, id) => {
              await channel.overwritePermissions(muterole2, {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false
              });
            });
          }catch(e){
            console.log(e.stack);
          }
        }
        //end of debater2 mute
        if(!mutetime2) return message.reply("You didn't specify a time!");

        tomute2.addRole(muterole2.id);
        message.reply(`<@${tomute2.id}> has been muted for ${ms(ms(mutetime2))}`);



        setTimeout(function(){
          tomute2.removeRole(muterole2.id);
          message.channel.send(`<@${tomute2.id}> has been unmuted!`);
        }, ms(mutetime2));
      }, timer);
    }
//end of module

module.exports.help = {
  name: "debate2"
}
