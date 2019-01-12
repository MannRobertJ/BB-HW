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
    // If the length of the inventory is 0 then it is empty and the function does nothing, otherwise the first item is equipped. 
    if (hero.inventory.length > 0) {
        hero.weapon = hero.inventory[0];
    } 
}

// Function to show player their hero's information. 
function displayStats () {
    const gameDisplay = document.getElementById('game');
    // Creates the paragraph where the information will be shown.
    const stats = document.createElement('p');
    // Adds the paragraph to the webpage.
    gameDisplay.appendChild(stats);
    // What will exist between the <p> and </p> tags in the html file. 
    stats.innerHTML = `Name: ${hero.name}, <br> Health: ${hero.health}, <br>Type of weapon: ${hero.weapon.type}, <br>Weapon damage: ${hero.weapon.damage}`
    // Need to give the paragraph an id so that the changeName function can do stuff to it.
    stats.id = "heroStats"
}

function changeName () {
    // Stores what the player types into the form as a string. 
    const newName = document.getElementById('new-name').value;
    // Changes hero's name.
    hero.name = newName;
    // Changes default text in form and displays it.
    document.getElementById('new-name').placeholder = "Change name again?"
    document.getElementById('new-name').value = null;
    // Displays new name in place of old one. 
    const stats = document.getElementById('heroStats');
    stats.innerHTML = `Name: ${hero.name}, <br> Health: ${hero.health}, <br>Type of weapon: ${hero.weapon.type}, <br>Weapon damage: ${hero.weapon.damage}`;
}

// Shows player their hero's information.
displayStats();
