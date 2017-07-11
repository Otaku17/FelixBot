exports.run = async(client, message) => {
    try {
        var karenArray = ['http://imgur.com/A6Mp11H', 'http://imgur.com/6COwrh5', 'http://imgur.com/qUtxqPz', 'http://imgur.com/dyDgCvJ', 'http://imgur.com/L9ijWze', 'http://imgur.com/xDlw1vo', 'http://imgur.com/jk8ST6s', 'http://imgur.com/Z7xuUIK', 'http://imgur.com/wlzhNbE', 'http://imgur.com/pvG4dnJ', 'http://imgur.com/nTjGmsy', 'http://imgur.com/ErxnSJG', 'http://imgur.com/m2OgAIq', 'http://imgur.com/D7m5vAT', 'http://imgur.com/8VusrUU', 'http://imgur.com/VszMHzU', 'http://imgur.com/f8ELVDS', 'http://imgur.com/USxxxVM', 'http://imgur.com/5GTFelQ', 'http://imgur.com/gpzmv46', 'http://imgur.com/jrk9jNZ', 'http://imgur.com/Fqr31rT', 'http://imgur.com/8Yf5D3u', 'http://imgur.com/sRo8U1X', 'http://imgur.com/hMoVwfk', 'http://imgur.com/xbB8Wc6', 'http://imgur.com/3s2Q6wJ', 'http://imgur.com/kpQZMRa', 'http://imgur.com/2fqtcRR', 'http://imgur.com/TSB3DjZ', 'http://imgur.com/9VuIlQo', 'http://imgur.com/7jBlK7C', 'http://imgur.com/eT51Fwq', 'http://imgur.com/EytZpGq', 'http://imgur.com/0Amj3Rn', 'http://imgur.com/BMFCI5a', 'http://imgur.com/ck64l8M', 'http://imgur.com/Bj9o0wU', 'http://imgur.com/qGFojEs', 'http://imgur.com/u8dRYhS', 'http://imgur.com/blAzBal', 'http://imgur.com/gRrqDVp', 'http://imgur.com/0OC9sGc', 'http://imgur.com/sbUJaMk', 'http://imgur.com/xrxYQta', 'http://imgur.com/O3NTfvI', 'http://imgur.com/qiLrokS', 'http://imgur.com/zVwBIPQ', 'http://imgur.com/weUWCdv', 'http://imgur.com/7u7pI07', 'http://imgur.com/TnHO605', 'http://imgur.com/V7lXvcp', 'http://imgur.com/9J2ZUYB', 'http://imgur.com/H3sWUC3', 'http://imgur.com/jcyyDDS', 'http://imgur.com/JQXklOL', 'http://imgur.com/XvvPShK', 'http://imgur.com/ng5fnqx']; //Some good old big array
        var random = karenArray[Math.floor(Math.random() * karenArray.length)];
        await message.channel.send(random);
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
    name: 'karen',
    description: 'Send a random pic of Karen',
    usage: 'karen',
    category: 'image'
};