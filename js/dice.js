const initialRoll = function(){
    return Math.floor(Math.random()*6 + 1);
}

const diceRoll = function(){
    const randNum1 = Math.floor(Math.random()*6 + 1);
    console.log(randNum1);
    const randNum2 = Math.floor(Math.random()*6 + 1);
    console.log(randNum2);
    const stringNum1 = randNum1.toString();
    const stringNum2 = randNum2.toString();
    const newNum = stringNum1 + stringNum2;
    console.log(newNum);
    return newNum;
}

