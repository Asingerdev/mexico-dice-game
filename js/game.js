console.log("linked")

//Game Object
const game = {
    round: 0,
    setUp(){
        p.score = initialRoll();
        comp.score = initialRoll();
        if(p.score > comp.score){
            this.round++;
            $round.text(`Round: ${this.round}`);
            p.leadRoll = true;
            $turn.text(`Turn: Player`);
        } else if(comp.score > p.score){
            this.round++;
            $round.text(`Round: ${this.round}`);
            p.leadRoll = false;
            $roll.attr("disabled", true);
            $turn.text(`Turn: Comp`);
        } else {
            this.setUp();
        }
    },
    endTurn(){
        if(p.leadRoll === true){
            $roll.attr("disabled", true);
            $end.animate({'opacity':0}, 'slow');
            $turn.text(`Turn: Comp`);
        }else if(p.leadRoll === false){
            $roll.attr("disabled", false);
            $turn.text(`Turn: Player`);
        }
    }
}

//Player class
class Player {
    constructor(name, lives) {
        this.name = name;
        this.lives = lives;
        this.score = 0;
        this.leadRoll = null;
        this.rollCount = 0;
    }
};

//Player and computer objects
const p = new Player("greg", 3);

const comp = {
    score: 0,
    rollCount: 0
};

//Global JQuery DOM elements
const $round = $('#round');
const $turn = $('#turn');
const $roll = $('#roll-button');
const $end = $('#end-button');
const $pScore = $('#p-score');
const $pThrows = $('#p-throws');

//Scoring System
const scoreArr = [21, 66, 55, 44, 33, 22, 11];

const checkScore = function(pScore,compScore){
    if(scoreArr.includes(pScore) && scoreArr.includes(compScore)){
        const index1 = scoreArr.indexOf(pScore);
        const index2 = scoreArr.indexOf(compScore);
        if(index2 > index1){
            alert('Player wins round!');
        }else if(index1 > index2){
            alert('Computer wins round!');
        }else if(index1 === index2){
            alert('Round is a tie!');
        }
    }else if(scoreArr.includes(pScore) && !scoreArr.includes(compScore)){
        alert('Player wins round!');
    }else if(scoreArr.includes(compScore) && !scoreArr.includes(pScore)){
        alert('Computer wins round!');
    }else if(!scoreArr.includes(pScore) && !scoreArr.includes(compScore)){
        if(pScore > compScore){
            alert('Player wins round!');
        }else if(compScore > pScore){
            alert('Computer wins round!');
        }else if(pScore === compScore){
            alert('Round is a tie!');
        }
    }
}

//Roll Button
$roll.on('click', function(e){
        p.score = diceRoll();
        console.log(`Player rolls a ${p.score}`)
        $pScore.text(`Score: ${p.score}`);
        p.rollCount++;
        $pThrows.text(`Dice Throws: ${p.rollCount}`)
        if(p.score === 21 && p.leadRoll === true){
            game.endTurn();
        }else if(p.rollCount === 3 && p.leadRoll === true){
            game.endTurn();
        }else if(p.rollCount === comp.rollCount && p.leadRoll === false){
            game.endTurn();
        }
        $end.animate({'opacity':100}, 'slow');
})