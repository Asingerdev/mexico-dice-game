//Player and computer each roll one die to determine who gets to roll first in round one. 

const initialRoll = function(){
    return Math.floor(Math.random()*6 + 1);
}

//Global dice roll function that takes the number from each die rolled ////and concatenates them into a new number that determines the score from //the roll
const diceRoll = function(){
    const randNum1 = Math.floor(Math.random()*6 + 1);
    const randNum2 = Math.floor(Math.random()*6 + 1);
    const stringNum1 = randNum1.toString();
    const stringNum2 = randNum2.toString();
    const newNum = stringNum1 + stringNum2;
    console.log(newNum)
    return parseInt(newNum);

}
