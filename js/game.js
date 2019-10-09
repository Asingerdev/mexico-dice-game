console.log("linked")

//Game Object
const game = {
    round: 0,
    setUp(){
        p.score = initialRoll();
        console.log(`Player rolls a ${p.score}`);
        comp.score = initialRoll();
        console.log(`Computer rolls a ${comp.score}`);
        if(p.score > comp.score){
            this.round++;
            $round.text(`Round: ${this.round}`);
            p.leadRoll = true;
            $turn.text(`Turn: Player`);
            console.log(`Player rolls first`);
        } else if(comp.score > p.score){
            this.round++;
            $round.text(`Round: ${this.round}`);
            p.leadRoll = false;
            $roll.attr("disabled", true);
            $turn.text(`Turn: Comp`);
            console.log(`Computer rolls first`);
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
    },
    compRoll(){
        comp.score = diceRoll();
        console.log(`Computer rolls a ${comp.score}`);
        $cScore.text(`Score: ${comp.score}`);
        comp.increaseCount();
        $cThrows.text(`Dice Throws: ${comp.rollCount}`)
        if(scoreArr.includes(comp.score) || (55 < comp.score && comp.score < 66) ||comp.rollCount === 3){
            this.endTurn();
        }else if((33 < comp.score && comp.score < 44) || (44 < comp.score && comp.score < 55)){
            reRoll();
        }else if((11 < comp.score && comp.score < 22) || (22 < comp.score && comp.score < 33)){
            this.compRoll();
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
    increaseCount(){
        this.rollCount++;
    }
};

//Player and computer objects
const p = new Player("greg", 3);

const comp = {
    score: 0,
    rollCount: 0,
    increaseCount(){
        this.rollCount++;
    }
};

//Global JQuery DOM elements
const $round = $('#round');
const $turn = $('#turn');
const $roll = $('#roll-button');
const $end = $('#end-button');
const $pScore = $('#p-score');
const $pThrows = $('#p-throws');
const $cScore = $('#c-score');
const $cThrows = $('#c-throws');

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

//function that gives 50/50 chance whether the computer rolls dice again
const reRoll = function(){
    const num = Math.floor(Math.random()*100);
    if(num > 50){
        game.endTurn();
    }else if(num <= 50){
        game.compRoll();
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

game.compRoll();