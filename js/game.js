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
            $turn.text(`Turn: Player`);

        } else if(comp.score > p.score){
            this.round++;
            $round.text(`Round: ${this.round}`);
            $turn.text(`Turn: Comp`);
        } else {
            this.setUp();
        }
    },
    endTurn(){
        if($turn.text() === 'Turn: Player'){
            $roll.attr("disabled", true);
            $end.hide();
            $turn.text(`Turn: Comp`);
        } else if($turn.text() === 'Turn: Comp'){
            $roll.attr("disabled", false);
            $end.hide();
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
    leadRoll: null,
    rollCount: 0
};

//Global JQuery DOM elements
const $round = $('#round');
const $turn = $('#turn');
const $roll = $('#roll-button');
const $end = $('#end-button');
const $pScore = $('#p-score');

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

$roll.on('click', function(e){
    p.score = diceRoll();
    $pScore.text(`Score: ${p.score}`);
    p.rollCount++;
    if(p.score === 21){
        game.endTurn();
    }
})