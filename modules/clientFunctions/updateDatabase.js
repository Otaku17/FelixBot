module.exports = async(client) => {
    client.updateDatabase = function(client) {
        return new Promise(async(resolve, reject) => {
            const updateStatus = {
                usersUpdate: false,
                guildsUpdate: false
            }
            let userUpdateTime = Date.now();
            let guildUpdateTime = Date.now();
            try {
                client.userData.forEach(function(user) {
                    user = JSON.parse(user);
                    var defaultUserData = client.defaultUserData(user.id);
                    var userKeys = Object.keys(user),
                        defaultKeys = Object.keys(defaultUserData);
                    userKeys.forEach(function(key) {
                        if (typeof user[key] === "object" && defaultUserData[key]) {
                            let userPropertyObject = Object.keys(user[key]),
                                defaultPropertyObject = Object.keys(defaultUserData[key]);
                            userPropertyObject.forEach(function(childKey) { //If property is object, which is pretty likely, check as well
                                if (defaultPropertyObject.includes(childKey)) {
                                    defaultUserData[key][childKey] = user[key][childKey];
                                }
                            });
                        } else if (defaultKeys.includes(key)) {
                            defaultUserData[key] = user[key];
                        }
                    });
                    client.userData.set(user.id, defaultUserData);
                });
                updateStatus.usersUpdate = `Updated ${client.userData.size} entries in the user database, took ${(Date.now() - userUpdateTime)}ms`;
            } catch (err) {
                updateStatus.usersUpdate = err;
                client.Raven.captureException(err);
            }
            try {
                client.guildData.forEach(function(guild) {
                    guild = JSON.parse(guild);
                    var defaultGuildData = client.defaultGuildData(guild.id);
                    var guildKeys = Object.keys(guild),
                        defaultKeys = Object.keys(defaultGuildData);
                    guildKeys.forEach(function(key) {
                        if (typeof guild[key] === "object" && defaultGuildData[key]) {
                            let guildPropertyObject = Object.keys(guild[key]),
                                defaultPropertyObject = Object.keys(defaultGuildData[key]);
                            guildPropertyObject.forEach(function(childKey) { //If property is object, which is pretty likely, check as well
                                if (defaultPropertyObject.includes(childKey)) {
                                    defaultGuildData[key][childKey] = guild[key][childKey];
                                }
                            });
                        } else if (defaultKeys.includes(key)) {
                            defaultGuildData[key] = guild[key];
                        }
                    });
                    client.guildData.set(guild.id, defaultGuildData);
                });
                updateStatus.guildsUpdate = `Updated ${client.guildData.size} entries in the guild database, took ${(Date.now() - guildUpdateTime)}ms`;
            } catch (err) {
                updateStatus.guildsUpdate.error = err;
                client.Raven.captureException(err);
            }
            resolve(updateStatus);
        });
    }
}