console.log("linked")

//Global JQuery DOM elements
const $round = $('#round');
const $turn = $('#turn');
const $roll = $('#roll-button');
const $end = $('#end-button');
const $pScore = $('#p-score');
const $pThrows = $('#p-throws');
const $pLives = $('#p-lives')
const $cScore = $('#c-score');
const $cThrows = $('#c-throws');
const $play = $('#play');
const $about = $('#about');
const $inputName = $('#inputName');
const $transBox = $('#transbox');
const $rollSound = $('#roll-sound');

//Game Object
const game = {
    round: 0,
    increaseRound() {
        this.round++;
        $round.text(`Round: ${this.round}`);
    },
    //Sets up turn order in the first round 
    //after player and computer each roll one die
    setUp() {
        p.score = initialRoll();
        comp.score = initialRoll();
        if (p.score > comp.score) {
            this.increaseRound();
            p.leadRoll = true;
            $roll.attr('disabled', false);
            $turn.text('Turn: Player');
            $transBox.text('Player rolls first');
        } else if (comp.score > p.score) {
            this.increaseRound();
            p.leadRoll = false;
            $roll.attr('disabled', true);
            $turn.text('Turn: Comp');
            $transBox.text('Computer rolls first');
            this.compRoll();
        } else {
            this.setUp();
        }
    },
    endTurn() {
        if (p.leadRoll) {
            $roll.attr('disabled', true);
            $end.animate({ 'opacity': 0 }, 'slow');
            $turn.text('Turn: Comp');
            setTimeout($.proxy(this.compRoll, game), 2000);
        } else if (!p.leadRoll) {
            $roll.attr('disabled', false);
            $turn.text('Turn: Player');
        }
    },
    setRound() {
        if (p.winRound) {
            $roll.attr('disabled', false);
            p.winRound = null;
            p.leadRoll = false;
            $turn.text('Turn: Comp');
            this.increaseRound();
            $round.text(`Round: ${this.round}`)
            setTimeout($.proxy(this.compRoll, game), 2000);
        } else if (!p.winRound) {
            $roll.attr('disabled', false);
            p.winRound = null;
            p.leadRoll = true;
            $turn.text('Turn: Player');
            this.increaseRound();
            $round.text(`Round: ${this.round}`)
        } else if (p.winRound === null) {
            this.setUp();
        }
    },
    endRound() {
        if (p.lives === 0) {
            $transBox.text('Player loses!');
            $roll.animate({ 'opacity': 0 }, 'slow');
        } else if (this.round === 5 && p.lives > 0) {
            $transBox.text('Player wins game!');
            $roll.animate({ 'opacity': 0 }, 'slow');
        } else {
            p.clearCount();
            p.clearScore();
            comp.clearCount();
            comp.clearScore();
            $end.animate({ 'opacity': 0 }, 'slow');
            this.setRound();
        }
    },
    compRoll() {
        comp.score = diceRoll();
        $transBox.text(`Computer rolls ${comp.score}`);
        $cScore.text(`Score: ${comp.score}`);
        comp.increaseCount();
        $cThrows.text(`Dice Throws: ${comp.rollCount}`)
        if (!p.leadRoll) {
            setTimeout($.proxy(this.compDecide, game), 2000);
        } else if (p.leadRoll) {
            if (p.rollCount === 1) {
                checkScore(p.score, comp.score);
            } else if (p.rollCount === 2) {
                if (comp.rollCount === 2) {
                    checkScore(p.score, comp.score);
                } else if (scoreArr.includes(p.score) && scoreArr.includes(comp.score)) {
                    const index1 = scoreArr.indexOf(p.score);
                    const index2 = scoreArr.indexOf(comp.score);
                    if (index2 > index1) {
                        setTimeout($.proxy(this.compRoll, game), 2000);
                    } else if (index1 > index2) {
                        $transBox.text('Computer wins round!');
                        p.winRound = false;
                        p.loseLives();
                        this.endRound();
                    } else if (index1 === index2) {
                        $transBox.text('Round is a tie!');
                        this.endRound();
                    }
                } else if (scoreArr.includes(p.score) && !scoreArr.includes(comp.score)) {
                    setTimeout($.proxy(this.compRoll, game), 2000);
                } else if (scoreArr.includes(comp.score) && !scoreArr.includes(p.score)) {
                    $transBox.text('Computer wins round!');
                    p.winRound = false;
                    p.loseLives();
                } else if (!scoreArr.includes(p.score) && !scoreArr.includes(comp.score)) {
                    if (p.score > comp.score) {
                        setTimeout($.proxy(this.compRoll, game), 2000);
                    } else if (comp.score > p.score) {
                        $transBox.text('Computer wins round!');
                        p.winRound = false;
                        p.loseLives();
                        this.endRound();
                    } else if (p.score === comp.score) {
                        $transBox.text('Round is a tie!');
                        this.endRound();
                    }
                }
            } else if (p.rollCount === 3) {
                if (comp.rollCount === 3) {
                    checkScore(p.score, comp.score);
                    this.endRound();
                } else if (scoreArr.includes(p.score) && scoreArr.includes(comp.score)) {
                    const index1 = scoreArr.indexOf(p.score);
                    const index2 = scoreArr.indexOf(comp.score);
                    if (index2 > index1) {
                        setTimeout($.proxy(this.compRoll, game), 2000);
                    } else if (index1 > index2) {
                        $transBox.text('Computer wins round!');
                        p.winRound = false;
                        p.loseLives();
                        this.endRound();
                    } else if (index1 === index2) {
                        $transBox.text('Round is a tie!');
                        this.endRound();
                    }
                } else if (scoreArr.includes(p.score) && !scoreArr.includes(comp.score)) {
                    setTimeout($.proxy(this.compRoll, game), 2000);
                } else if (scoreArr.includes(comp.score) && !scoreArr.includes(p.score)) {
                    $transBox.text('Computer wins round!');
                    p.winRound = false;
                    p.loseLives();
                } else if (!scoreArr.includes(p.score) && !scoreArr.includes(comp.score)) {
                    if (p.score > comp.score) {
                        setTimeout($.proxy(this.compRoll, game), 2000);
                    } else if (comp.score > p.score) {
                        $transBox.text('Computer wins round!');
                        p.winRound = false;
                        p.loseLives();
                    } else if (p.score === comp.score) {
                        $transBox.text('Round is a tie!');
                        this.endRound();
                    }
                }
            }
        }
    },
    //Whether computer rolls again based on certain
    //scoring thresholds
    compDecide() {
        if (comp.score === 21) {
            this.endTurn();
        } else if (scoreArr.includes(comp.score) || comp.rollCount === 3 || (p.leadRoll && comp.rollCount === p.rollCount)) {
            this.endTurn();
        } else if (comp.score === 53 || comp.score === 54 || (55 < comp.score && comp.score < 66)) {
            reRoll();
        } else {
            setTimeout($.proxy(this.compRoll, game), 2000);
        }
    }
}

//Player class
class Player {
    constructor(name, lives) {
        this.name = name;
        this.lives = lives;
        this.score = 0;
        this.rollCount = 0;
        this.leadRoll = null;
        this.winRound = null;
    }
    increaseCount() {
        this.rollCount++;
        $pThrows.text(`Dice Throws: ${p.rollCount}`)
    }
    loseLives() {
        this.lives--;
        $pLives.text(`Lives: ${p.lives}`);
    }
    clearCount() {
        this.rollCount = 0;
        $pThrows.text(`Dice Throws: ${p.rollCount}`);
    }
    clearScore() {
        this.score = 0;
        $pScore.text(`Dice Throws: ${p.score}`)
    }
};

//Player and computer objects
const p = new Player("greg", 3);

const comp = {
    score: 0,
    rollCount: 0,
    increaseCount() {
        this.rollCount++;
    },
    clearCount() {
        this.rollCount = 0;
        $cThrows.text(`Dice Throws: ${comp.rollCount}`);
    },
    clearScore() {
        this.score = 0;
        $cScore.text(`Score: ${comp.score}`);
    }
};

//Scoring System
const scoreArr = [21, 66, 55, 44, 33, 22, 11];

//Function that compares player's score to computer's score and determines winner of round
const checkScore = (pScore, compScore) => {
    if (scoreArr.includes(pScore) && scoreArr.includes(compScore)) {
        const index1 = scoreArr.indexOf(pScore);
        const index2 = scoreArr.indexOf(compScore);
        if (index2 > index1) {
            $transBox.text('Player wins round!');
            p.winRound = true;
            setTimeout($.proxy(game.endRound, game), 2000);
        } else if (index1 > index2) {
            $transBox.text('Computer wins round!');
            p.winRound = false;
            p.loseLives();
            setTimeout($.proxy(game.endRound, game), 2000);
        } else if (index1 === index2) {
            $transBox.text('Round is a tie!');
            setTimeout($.proxy(game.endRound, game), 2000);
        }
    } else if (scoreArr.includes(pScore) && !scoreArr.includes(compScore)) {
        $transBox.text('Player wins round!');
        p.winRound = true;
        setTimeout($.proxy(game.endRound, game), 2000);
    } else if (scoreArr.includes(compScore) && !scoreArr.includes(pScore)) {
        $transBox.text('Computer wins round!');
        p.winRound = false;
        p.loseLives();
        setTimeout($.proxy(game.endRound, game), 2000);
    } else if (!scoreArr.includes(pScore) && !scoreArr.includes(compScore)) {
        if (pScore > compScore) {
            $transBox.text('Player wins round!');
            p.winRound = true;
            setTimeout($.proxy(game.endRound, game), 2000);
        } else if (compScore > pScore) {
            $transBox.text('Computer wins round!');
            p.winRound = false;
            p.loseLives();
            setTimeout($.proxy(game.endRound, game), 2000);
        } else if (pScore === compScore) {
            $transBox.text('Round is a tie!');
            setTimeout($.proxy(game.endRound, game), 2000);
        }
    }
}

//Function that gives 50/50 chance whether 
//the computer rolls dice again
const reRoll = () => {
    const num = Math.floor(Math.random() * 100);
    if (num > 50) {
        game.endTurn();
    } else if (num <= 50) {
        setTimeout($.proxy(this.compRoll, game), 2000);
    }
}

//Event Listeners

//Roll Button
$roll.on('click', (e) => {
    $('audio#roll-sound')[0].play();
    setTimeout(p.score = diceRoll(), 2000);
    $transBox.text(`Player rolls ${p.score}`)
    $pScore.text(`Score: ${p.score}`);
    p.increaseCount();
    if (p.score === 21 && p.leadRoll) {
        game.endTurn();
    } else if (p.rollCount === 3 && p.leadRoll === true) {
        game.endTurn();
    }
    if (p.rollCount === 1 || p.rollCount === 2 || p.rollCount === 3) {
        $end.css({ 'opacity': 1 });
    }
    if (p.rollCount === comp.rollCount && !p.leadRoll) {
        $roll.attr("disabled", true);
        checkScore(p.score, comp.score);
    }
})

//End Turn Button
$end.on('click', (e) => {
    if (p.leadRoll) {
        game.endTurn();
        setTimeout($.proxy(game.compRoll, game), 2000);
    } else if (!p.leadRoll) {
        checkScore(p.score, comp.score);
    }
})

//Play Hover
$play.hover(() => {
    $play.css("background-color", "white");
    $play.css('cursor', 'pointer');
}, () => {
    $play.css("background-color", "");
})

//About Hover
$about.hover(() => {
    $about.css("background-color", "white");
    $about.css('cursor', 'pointer');
}, () => {
    $about.css("background-color", "");
})

//Click text to play game
$play.on('click', () => {
    $inputName.attr('hidden', false)
    $('#submit').attr('hidden', false)
    $play.off('click');
})

//Name Input
$('#submit').on('click', (e) => {
    const $inputValue = $inputName.val();
    $('#player-name').text(`Player: ${$inputValue}`);
    const timeoutID = setTimeout($.proxy(game.setUp, game), 2000);
})
