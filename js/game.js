console.log("linked")

const game = {
    round: 0,
    setUp(){
        p.score = initialRoll();
        comp.score = initialRoll();
        if(p.score > comp.score){
            this.round++;
            $round.text(`Round: ${this.round}`);
            $turn.text(`Turn: Player`);
        } else if(comp.score > p.score){
            this.round++;
            $round.text(`Round: ${this.round}`);
            $turn.text(`Turn: Comp`);
        } else {
            this.setUp();
        }
    }
}

class Player {
    constructor(name, lives) {
        this.name = name;
        this.lives = lives;
        this.score = 0;
    }
}

const p = new Player("greg", 3);

const comp = {
    score: 0
}

const $round = $('#round');
const $turn = $('#turn');
