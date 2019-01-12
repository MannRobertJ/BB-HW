// Write your JS here

// The hero.
const hero = {
    // Name.
    name : '',
    // Is the hero heroic?
    heroic: false,
    // Equipment.
    inventory: [],
    // Health.
    health: 10,
    // Hero's weapon.
    weapon: {
        // Type of weapon.
        type: '',
        // How much damage the weapon inflicts,
        damage: 2,
    }
};

// A dagger weapon the hero can equip and use.
const dagger = {
    type: 'dagger',
    damage: 2,
}

// Restore's the hero's health.
function rest (object) {
    object.health = 10;
    return object;
}
// Makes the hero to pick up an item and add to inventory.
function pickUpItem (hero, object) {
    hero.inventory.push(object);
}

// Makes the hero equip the first element in their inventory. If the inventory contains nothing then this function will do nothing.
function equipWeapon (hero) {
    if (hero.inventory.length > 0) {
        hero.weapon = hero.inventory[0];
    } 
}

