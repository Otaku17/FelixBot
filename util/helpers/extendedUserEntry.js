'use strict';

const references = require('./references');

class ExtendedUserEntry {
    constructor(userEntry) {
        Object.assign(this, userEntry);
    }

    /**
     * Check if a user has the specified item
     * @param {number} itemID - The ID of the item 
     * @returns {boolean} Whether or not the user has the specified item
     */
    hasItem(itemID) {
        return this.economy.items.find(i => i.id === itemID) ? true : false;
    }

    /**
     * Add an item to the user entry, handle already owned items cases (increment the count). This modifies the object
     * @param {number} itemID - The ID of the item to add
     * @returns {void}
     */
    addItem(itemID) {
        if (this.hasItem(itemID)) {
            this.economy.items[this.economy.items.findIndex(i => i.id === itemID)].count++;
        } else {
            this.economy.items.push(references.item(itemID));
        }
    }

    /**
     * Subtract coins from the user
     * @param {number} amount - The amount of coins to subtract
     * @returns {number} The coins of the user after subtraction 
     */
    subtractCoins(amount) {
        this.economy.coins = this.economy.coins - amount;
        return this.economy.coins;
    }

    /**
     * Add coins to the user
     * @param {number} amount - The amount of coins to add
     * @returns {number} The coins of the user after the coins were added 
     */
    addCoins(amount) {
        this.economy.coins = this.economy.coins + amount;
        return this.economy.coins;
    }

    /**
     * Quickly compare the current timestamp with the cooldown to see if the user is in cooldown
     * @param {string} cooldown - The name of the cooldown
     * @return {boolean} Whether or not the user is in cooldown
     */
    isInCooldown(cooldown) {
        return this.cooldowns[cooldown] > Date.now();
    }

    /**
     * Add a cooldown to the user
     * @param {string} cooldown - The name of the cooldown
     * @param {number} duration - The duration in milliseconds of the cooldown
     * @returns {number} The timestamp at which the cooldown will expire
     */
    addCooldown(cooldown, duration) {
        this.cooldowns[cooldown] = Date.now() + duration;
        return this.cooldowns[cooldown];
    }

    /**
     * Should be JSON.stringify() but for some reason it doesn't work, so it does shit that works
     * @returns {*} - The stringified object
     */
    toJSON() {
        const cleanObject = (() => {
            const newObject = {};
            for (const key in this) {
                if (typeof this[key] !== 'function') {
                    newObject[key] = this[key];
                }
            }
            return newObject;
        })();
        return JSON.stringify(cleanObject);
    }
}

module.exports = ExtendedUserEntry;