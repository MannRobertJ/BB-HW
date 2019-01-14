// Write your JS here

// The hero.
const hero = {
    // Name.
    name : '',
    // Is the hero heroic?
    heroic: true,
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

// Dagger is now defined later using the 'Weapon' class. 
// A dagger weapon the hero can equip and use.
/* const dagger = {
    type: 'dagger',
    damage: 2,
} */

// Restore's the hero's health.
function rest (object) {
    object.health = 10;
    displayStats();
    return object;
}
// Makes the hero to pick up an item and add to inventory.
function pickUpItem (hero, object) {
    hero.inventory.push(object);
}

// Makes the hero equip the first element in their inventory. If the inventory contains nothing then this function will do nothing.
function equipWeapon (hero) {
    // First we put the current weapon back into the inventory.
    hero.inventory.push(hero.weapon);
    // If the length of the inventory is 0 then it is empty and the function does nothing, otherwise the first item is equipped. 
    if (hero.inventory.length > 0) {
        hero.weapon = hero.inventory[0];
    } 
    // Displays the current weapon. 
    displayStats();
    // The weapon is no longer in the inventory. 
    hero.inventory.shift();
}

// Function to show player their hero's information. 
function displayStats () {
    const heroStats = document.getElementById('hero-stats');
    // What will exist between the <p> and </p> tags in the html file. Span tags are there so we can later do stuff to individual bits of the text. 
    heroStats.innerHTML = `Name: ${hero.name} <br> 
                           Heroic: ${hero.heroic} <br> 
                           Health: ${hero.health} <br>
                           Type of weapon: ${hero.weapon.type}<br>
                           Weapon damage: ${hero.weapon.damage}`
}

function changeName () {
    // Stores what the player types into the form as a string. 
    const newName = document.getElementById('new-name').value;
    // Changes hero's name.
    hero.name = newName;
    // Changes default text in form and displays it.
    document.getElementById('new-name').placeholder = "New name?"
    document.getElementById('new-name').value = null;
    // Displays new name in place of old one. 
    displayStats();
}



// Enemy class. Used to quickly create enemy objects.

class Enemy {
    constructor(name, health, damage, imageUrl) {
        this.name = name;
        this.health = health;
        this.damage = damage;
        this.imageUrl = imageUrl;
    }
}

// Enemies
// Spider has health 1 initially. 
let spiderBaseHealth = 1; 
const spider = new Enemy ('Tom the Tarantula', spiderBaseHealth, 2, "./spider.jpg");
const redPanda = new Enemy ('Roos the Red Panda', 11, 11, "./redPanda.jpg");

// Class to declare weapons with. 
class Weapon {
    constructor(type, damage) {
        this.type = type;
        this.damage = damage;
    }
}

// Weapons.
const dagger = new Weapon ('dagger', 2);
const gun = new Weapon ('gun', 10);


// It seems simpler to declare these variables globally.  
// nextEncounter will be used to decide if the player encounters an 'enemy' or a 'weapon'. The first encounter will be with an enemy...
let nextEncounter = 'enemy';
// ...and that enemy will be a spider.
let nextEnemy = spider;
// The image showing the encounter. 
const encounterImage = document.getElementById("encounter");
// Tracks if the player has cheated to kill a red panda. 
let alreadyCheated = false;

// Function to change nextEncounter. 
function generateNextEncounter () {
    if (nextEncounter === 'game over') {
        return false;
    }
    // After clicking the image becomes invisible. This makes it visible again. 
    encounterImage.style.opacity = "1";
    // Generates random integer from 0 to 7.
    const encounterIndex = Math.floor(Math.random() * 8);
    // If we get 7 then we get a new weapon, otherwise it's an enemy. 
    if (encounterIndex === 7) {
        nextEncounter = 'weapon';
        encounterImage.src = "./gun.jpg"
        encounterImage.alt = "a picture of a gun"
    } else {
        nextEncounter = 'enemy';
        generateEnemy();
    }
}

// Function to decide if we fight enemy or pick up weapon.
function dealWithEncounter () {
    if (nextEncounter === 'weapon') {
        pickUpWeapon();
    } 
    if (nextEncounter === 'enemy') {
        fight(nextEnemy);
    }
    if (nextEncounter === 'game-over') {
        alert('just refresh the page');
    }
}

// Decides what to fight.
function generateEnemy () {
    // One in 20 chance of fighting a red panda, otherwise it's a spider.
    const enemyIndex = Math.floor(Math.random() * 20);
    if (enemyIndex === 19) {
        nextEnemy = redPanda;
        encounterImage.src = './redPanda.jpg';
        encounterImage.alt = 'a picture of a red panda'
    } else {
        nextEnemy = spider;
        encounterImage.src = './spider.jpg';
        encounterImage.alt = 'a picture of a spider'
    }
}

// Adds weapon to inventory.
function pickUpWeapon() {
    hero.inventory.push(gun);
    endCurrentEncounter();
}


function fight(enemy) {
    // Player attacks the enemy.
    enemy.health = enemy.health - hero.weapon.damage;
    // If the player kills a spider. 
    if (enemy.health < 1 && enemy === spider) {
        // Scolds the player.
        if (hero.heroic === true) {alert('You killed it! That wasn\'t very heroic of you...')};
        // They are no longer heroic. 
        hero.heroic = false;
        spiderBaseHealth ++;
        endCurrentEncounter();
        spider.health = spiderBaseHealth;
    }
    // If the player kills a red panda (impossible without cheating).
    if (enemy.health < 1 && enemy === redPanda) {
        // Scolds the player if this is their first time cheating. 
        if (alreadyCheated === false) {
            alert('Cheat!!!')
            alreadyCheated = true
        };
        // They are no longer heroic. 
        hero.heroic = false;
        endCurrentEncounter();
    }
    // The enemy may now attack the player if not dead. 
    if (enemy.health > 0) {
        hero.health = hero.health - enemy.damage;
        // If the player is dead. 
        if (hero.health < 1) {
            alert('Bad luck. Refresh the page to try again.')
            encounterImage.src = "./gameover.jpg";
            encounterImage.alt = "game over"
            nextEncounter = "game over"
            // Want nothing else to happen. 
            return false; 
        } 
    }
    displayStats();
}

function endCurrentEncounter () {
    // Instead of removing image truly, it becomes totally transparent for a second. Deleting seemed overly complicated.
    encounterImage.style.opacity = "0";
    setTimeout(generateNextEncounter, 1000)
}

// Shows player their hero's information.
displayStats();









