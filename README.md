Mexico: The Dice Game
=====================

Introduction
------------
Mexico is an elimination-style dice game with unique game mechanics.  

Some versions of Mexico incorporate betting, but in this version one player plays against a computer AI. The player is given a set amount of lives and must win a fixed number of rounds against the computer in order to win the game. The number of lives the player has and number of rounds they must win can be adjusted to change the difficulty.

Live Link
---------
[Mexico: The Dice Game](https://kefka223.github.io/Mexico-Dice-Game/)

Scoring System
--------------
In each round the player and computer roll two dice. The game has a unique scoring system that concatenates the numbers from each die to determine the score of the roll. For instance, if the player rolls a '5' on the first die, and a '4' on the second die, their score would be 54. Similarly, a roll of '2' and '2' would result in a score of 22. 

The highest possible score in the game is '21', also called 'Mexico'. The next highest scores are any double numbers, in descending order ('66', '55', '44', '33', '22', '11'), followed by non-double numbers in descending order ('65', '64'...'13', '12').

Although there are thirty-six possible results for any roll of two dice, in Mexico there are ony twenty-one meaningful results. As a rule, the higher number from the two die is used as the first number of the combined numbers that determines the score. For instance, a roll of '2' and '1' and a roll of '1' and '2' would both result in a score of 21. 

The full list of possible scores in the game and the number of ways to roll them is below:

*31, 32: 2 ways
*41, 42, 43: 2 ways
*51, 52, 53, 54: 2 ways
*61, 62, 63, 64, 65: 2 ways
*any double: 1 way
*21("Mexico): 2 ways

The `rollDice()` function in the dice.js file outputs a score according to these rule by comparing the numbers from each die rolled and checking which is greater, like so:

    if(Number(stringNum1) > Number(stringNum2) || Number(stringNum1) === Number(stringNum2)){
        newNum = stringNum1 + stringNum2;
    }else{
        newNum = stringNum2 + stringNum1;
    }

Gameplay
--------
To initiate the game, the player and computer each roll one die. Whoever has the higher number rolls first in round one. If they roll the same number, they keep rolling until one gets a higher number. 

In each round, the lead roller rolls up to three times. If the player is lead roller, they can choose to end their turn after any roll by clicking the end button. The computer determines how many times to roll based on a series of pre-programmed scoring thresholds (see AI section below). If the lead roller rolls a '21', or Mexico, the dice immediately pass to the other player. The second roller then has three chances to roll to match '21', regardless of how many times the lead roller rolled. 

Only the last result of a player or computer's turn counts as their final score for that turn, rather than best result of two or three rolls. 

The second roller can only roll as many times as the lead roller. For instance, if the lead roller rolls twice, the second roller is only able to roll twice. When the second roller finishes rolling, the two final scores are compared and the winner of the round is determined based on the scoring system. The loser of the round becomes the lead roller in the next round. If the round results in a tie, the player and computer roll one die to determine order again.

If the player makes it through the designated number of rounds, they win the game. 

Computer AI
-----------

The computer decides how many times to roll based on the following logic:

If the computer is the lead roller and it rolls Mexico ('21'), a double number or a number between 55 and 66, it will end its turn. 

If it rolls between 33 and 44, or between 44 and 55, there is a 50% chance it will reroll. 

If it rolls between 11 and 22, or between 22 and 33, it will reroll.

If the computer is the second roller, it will follow the same logic, except it is limited by the number of times the player rolled, and if any of its rolls beat the player, it will end its turn. 

Future versions of the game can adjust the computer AI's difficulty based upon the game's advanced probability tables. 

User Stories
------------

1. To start game, user clicks *Play* at the top of the screen. This triggers an initial roll to determine whether the player or the computer rolls first in the first round by rolling two individual die. If the roll is a tie, keeps rerolling until one is a higher number. The higher number goes first. 

2. Once order has been determined for the first round, the lead roller rolls. If the lead roller is the player, the **roll button** is enabled. 

3. If the player clicks the **roll button**, this rolls the dice and determines their score. The **end turn button** then appears. The player can then decide whether to roll again or end their turn, up to three times. 

3. If the player rolls **Mexico** (21), their turn is over no matter how many times they've rolled. The computer can then only roll as many times as the player rolled, unless the player rolled **Mexico** in which case the computer can roll up to three times still.

4. If the computer rolls first, the computer AI determines how many times it rolls. After it ends its turn, the player can only roll as many times as the computer, unless the computer rolls **Mexico**. 

5. When the round is over, the players' and computers' scores are compared and the winner of the round is determined. The scoring metrics on the display are then cleared, and if the player loses the round, they lose one of their lives.  

5. The loser of the round gets to roll first in the subsequent round. 

6. If the player makes it through five rounds, they win the game. If the player loses all of their lives before five rounds, they lose the game.











