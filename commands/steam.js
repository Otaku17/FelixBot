const unirest = require('unirest');

exports.run = async(client, message) => {
    const whitespace = message.content.indexOf(" ");
    if (whitespace === -1) {
        return await message.channel.send(":x: You did not enter a game to search");
    }
    const game = message.content.substr(whitespace + 1).trim();
    /*var searcOnMdn = "https://developer.mozilla.org/en-US/search.json?locale=en-US&q=" + args;
    var linkToResults = "https://developer.mozilla.org/en-US/search?locale=en-US&q=" + args; //May be wew but kek
    var replaceWhitespace = searcOnMdn.replace(/\s/gi, "+");
    var legitReplaceWhitespace = linkToResults.replace(/\s/gi, "+");*/
    try {
        var question = false;
        fetch: {
            await unirest.get(`https://store.steampowered.com/api/storesearch?term=${game}&cc=en&l=en`)
            .end(async function (result) {
                const awaitItem = async function () {
                    return new Promise(async(resolve, reject) => {
                        var i = 1;
                        const resultList = result.body.items.map(r => `[${i++}] ${r.name}`).join("\n");
                        client.awaitReply(message, "Your search has returned more than one result, select one by typing a number", "```\n" + resultList + "```").then(async(reply) => {
                            if (!reply) {
                                return resolve(false);
                            } else if ((typeof Number(reply.reply.content) !== "number") || (reply.reply.content < 0) || (reply.reply.content > result.body.total)) {
                                await reply.question.delete();
                                if (message.guild) {
                                    if (message.guild.member(client.user).hasPermission("MANAGE_MESSAGES")) {
                                        await reply.reply.delete();
                                    }
                                }
                                return await message.channel.send(":x: You did not specified a number or the number you specified is not valid");
                            }
                            await reply.question.delete();
                            if (message.guild) {
                                if (message.guild.member(client.user).hasPermission("MANAGE_MESSAGES")) {
                                    await reply.reply.delete();
                                }
                            }
                            question = reply.question;
                            resolve(result.body.items[reply.reply.content - 1]);
                        });
                    });
                }
                var item = "";
                var price;
                if (result.body.total === 0) {
                    return await message.channel.send(":x: Your search has not returned any result");
                } else if (result.body.total > 1) {} else if (result.body.total === 1) {
                    item = result.body.items[0];
                }
                if (item === "") {
                    item = await awaitItem();
                }
                if (!item) {
                    return await message.channel.send(":x: Timeout: Command aborted");
                }
                if (!item.price) {
                    price = "Free";
                } else {
                    if (item.price.final.toString().length === 4) {
                        price = item.price.final.toString().substr(0, 2) + "," + item.price.final.toString().substr(2) + "$";
                    } else if (item.price.final.toString().length === 5) {
                        price = item.price.final.toString().substr(0, 3) + "," + item.price.final.toString().substr(3) + "$";
                    } else if (item.price.final.toString().length === 3) {
                        price = item.price.final.toString().substr(0, 1) + "," + item.price.final.toString().substr(1) + "$";                        
                    }
                }
                var platform = {
                    windows: ":white_check_mark:",
                    linux: ":white_check_mark:",
                    mac: ":white_check_mark:"
                };
                if (!item.platforms.windows) {
                    platform.windows = ":x:";
                }
                if (!item.platforms.linux) {
                    platform.linux = ":x:";
                }
                if (!item.platforms.mac) {
                    platform.mac = ":x:";
                }
                var metascore = "None";
                if (item.metascore !== "") {
                    metascore = item.metascore;
                }
                return await message.channel.send({
                    embed: {
                        color: 3447003,
                        author: {
                            name: "Requested by: " + message.author.username + "#" + message.author.discriminator,
                            icon_url: message.author.avatarURL
                        },
                        title: item.name,
                        image: {
                            "url": item.tiny_image
                        },
                        fields: [
                            {
                                name: ":star: Metascore",
                                value: metascore,
                                inline: true
      }, {
                                name: ":id: ID",
                                value: item.id,
                                inline: true
      }, {
                                name: ":dollar: Price",
                                value: price,
                                inline: true
      }, {
                                name: ":desktop: Platforms",
                                value: "Windows: " + platform.windows + "\n\n" + "Linux: " + platform.linux + "\n\n" + "Mac: " + platform.mac,
                                inline: true
      }
    ],
                        timestamp: new Date(),
                        footer: {
                            icon_url: client.user.avatarURL,
                            text: "Steam search"
                        }
                    }
                }).catch(console.error);
            })
        }
    } catch (err) {
        var guild;
        var detailledError; //that stuff is to avoid undefined logs
        if (message.guild) {
            guild = message.guild.name + "\n**Guild ID:** " + message.guild.id + "\n**Channel:** " + message.channel.name;
        } else {
            guild = "DM"
        }
        if (err.stack) {
            detailledError = err.stack;
        } else {
            detailledError = "None";
        }
        console.error("**Server**: " + guild + "\n**Author**: " + message.author.username + "#" + message.author.discriminator + "\n**Triggered Error**: " + err + "\n**Command**: " + client.commands.get(this.help.name).help.name + "\n**Message**: " + message.content + "\n**Detailled log:** " + detailledError); //Log to the console           
        return await client.channels.get("328847359100321792").send("**Server**: " + guild + "\n**Author**: " + message.author.username + "#" + message.author.discriminator + "\n**Triggered Error**: " + err + "\n**Command**: " + client.commands.get(this.help.name).help.name + "\n**Message**: " + message.content + "\n**Detailled log:** " + detailledError); //Send a detailled error log to the #error-log channel of the support server
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    disabled: false,
    permLevel: 1
};

exports.help = {
    name: 'steam',
    description: 'Search for a game through Steam',
    usage: 'steam Half-Life 3',
    category: 'utility'
};
