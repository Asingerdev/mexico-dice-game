console.log("linked")

const game = {
    rounds: 0,
    firstRoll(){
        Math.floor(Math.random())
    },
    rollDice(){

    }
}

class Player {
    constructor(name, lives) {
        this.name = name;
        this.lives = lives;
    }
}

const p = new Player("greg", 3);
console.log(p.lives)


