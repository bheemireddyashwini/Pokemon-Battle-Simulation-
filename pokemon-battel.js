// Pokemon Battle Simulation 


class AttackSkill {
    constructor(attack, damage, magic) {
        this.attack = attack;
        this.damage = damage;
        this.magic = magic;
    }
}
class Pokemon {
    constructor(name, health, magic) {
        this.name = name;
        this.health = health;
        this.magic = magic;
        this.skills = [];
        this.counter = 0;
    }

    /*learnAttackSkill(newSkill) {
        this.skills.push(newSkill);
    }*/
   
        learnAttackSkill(newSkill) {
            if (newSkill instanceof AttackSkill) {
                this.skills.push(newSkill);
            } else {
                console.log('Invalid skill! Must be an instance of AttackSkill.');
            }
        }

    //  current status of the Pokemon
    showStatus() {
        console.log(`${this.name} - Health: ${this.health}, Magic: ${this.magic}`);
        if (this.counter > 3) {
            console.log(`${this.name} has won the battle!`);
        }
    }

    // Increase the Pokemon's magic by a random amount between 0 and 20
    getMagics() {
        const magicBoost = Math.floor(Math.random() * 21);
        this.magic += magicBoost;
        console.log(`${this.name} gains ${magicBoost} magic points.`);
    }

    // Checking if the Pokemon has enough magic to perform a specific skill
    hasEnoughMagic(skillName) {
        const skill = this.skills.find(skill => skill.attack === skillName);
        if (skill && this.magic >= skill.magic) {
            return true;
        } else {
            console.log(`${this.name} doesn't have enough magic to use ${skillName}!`);
            return false;
        }
    }

    // Checking if the Pokemon is alive
    isAlive() {
        return this.health > 0;
    }

    // Perform an attack on an opponent
    attack(skillName, opponent) {
        if (!this.isAlive()) {
            console.log(`${this.name} is already defeated!`);
            return;
        }

        if (!opponent.isAlive()) {
            console.log(`${opponent.name} is already dead!`);
            return;
        }

        if (this.hasEnoughMagic(skillName)) {
            const skill = this.skills.find(skill => skill.attack === skillName);
            this.magic -= skill.magic;
            opponent.health -= skill.damage;
            this.counter++;

            console.log(`${this.name} uses ${skillName} on ${opponent.name}!`);
            console.log(`${skillName} deals ${skill.damage} damage.`);
            console.log(`${this.name} now has ${this.magic} magic left.`);
            console.log(`${opponent.name} now has ${opponent.health} health left.`);

            this.showStatus();
            opponent.showStatus();
        }
    }
}


let pikachu = new Pokemon("Pikachu", 120, 80);
let bulbasaur = new Pokemon("Bulbasaur", 95, 105);

// Create new attack skills
let lightning = new AttackSkill("Lightning", 40, 30);
let poisonSeed = new AttackSkill("Poison Seed", 20, 20);

// Pokémon learn attack skills
pikachu.learnAttackSkill(lightning);
pikachu.learnAttackSkill(poisonSeed);

bulbasaur.learnAttackSkill(lightning);
bulbasaur.learnAttackSkill(poisonSeed);

// Start the battle
pikachu.attack("Lightning", bulbasaur);
bulbasaur.attack("Poison Seed", pikachu);
pikachu.attack("Poison Seed", bulbasaur);
bulbasaur.attack("Lightning", pikachu);
pikachu.attack("Lightning", bulbasaur);
pikachu.attack("Poison Seed", bulbasaur); // Bulbasaur is already defeated!
