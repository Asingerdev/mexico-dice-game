Mexico: The Dice Game
=====================

Introduction
------------
Mexico is an elimination-style dice game with unique game mechanics.  

Some versions of Mexico incorporate betting, but in this version one player plays against a computer opponent. The player is given a set amount of lives and must win a fixed number of rounds against the computer in order to win the game. The number of lives the player has and number of rounds they must win can be adjusted to change the difficulty.

Live Link
---------
[Mexico: The Dice Game](https://asingerdev.github.io/Mexico-Dice-Game/)

Technologies Used
-----------------
- HTML5
- JavaScript es6
- JQuery
- Google Fonts
- Bootstrap
- CSS

Scoring System
--------------
In each round the player and computer roll two dice. The game has a unique scoring system that concatenates the numbers from each die to determine the score of the roll. For instance, if a player rolls a '5' with one die and a '4' with the other, their score from the roll would be 54. Similarly, a roll of '2' and '2' would result in a score of 22. 

The highest possible score in the game is '21', also called 'Mexico'. The next highest scores are any double numbers in descending order ('66', '55', '44', '33', '22', '11'), followed by non-double numbers in descending order ('65', '64'...'13', '12').

Although there are thirty-six possible results for any roll of two dice, in Mexico there are only twenty-one meaningful results. As a rule, the higher number of the two dice is used as the first number of the combined score. For instance, a roll of '2' and '1' and a roll of '1' and '2' would both result in a score of 21. 

The full list of possible scores in the game and the number of ways to roll them is below:

- 31, 32: 2 ways


- 41, 42, 43: 2 ways


- 51, 52, 53, 54: 2 ways


- 61, 62, 63, 64, 65: 2 ways


- any double: 1 way


- 21("Mexico): 2 ways

The `rollDice()` function in the dice.js file outputs a score according to the game's rules by comparing the numbers from each die rolled and checking which is greater, like so:

    if(Number(stringNum1) > Number(stringNum2) || Number(stringNum1) === Number(stringNum2)){
        newNum = stringNum1 + stringNum2;
    }else{
        newNum = stringNum2 + stringNum1;
    }

Gameplay
--------
To initiate the game, the player and computer each roll one die. Whoever has the higher number gets to roll first in round one. If both roll the same number, they keep rolling until one rolls a higher number. 

In each round, the lead roller rolls up to three times. If the player is lead roller, they can choose to end their turn after any individual roll by clicking the end button. The computer determines how many times to roll based on a series of pre-programmed scoring thresholds (see computer section below). 

Only the last roll of a player or computer's turn counts as their score for that turn.

The second roller is limited by the number of times the lead roller rolls. For instance, if the lead roller rolls twice, the second roller is only able to roll twice. When the second roller finishes rolling, the two final scores are compared and the winner of the round is determined based on the game's scoring system. The loser of the round then becomes the lead roller in the next round. If the round results in a tie, the player and computer roll one die to determine the order again.

If the lead roller rolls a '21', or Mexico, their turn automatically ends, no matter how many times they've rolled. The second roller then has three chances to match '21' regardless of how many times the lead roller rolled. 

If the player makes it through the designated number of rounds, they win the game. 

Computer Opponent
-----------

The computer opponent decides how many times to roll based on the following logic:

If the computer is the lead roller and it rolls Mexico ('21') or a double number, it will end its turn. 

If it rolls 53, 54, 61, 62, 63, 64 or 65, there is a 50% chance it will reroll.  

If it rolls 31, 32, 41, 42, 43, 51 or 52 it will reroll.

If the computer is the second roller, it will follow the same logic,except it is limited by the number of times the player rolled, and if any of its rolls beat the player, it will end its turn. 

Future versions of the game will adjust the computer's difficulty based upon the game's probability tables. 

User Stories
------------

1. To start game, user clicks *Play* at the top of the screen. This triggers an initial roll to determine whether the player or the computer rolls first in the first round by rolling two individual die. If the roll is a tie, keeps rerolling until one is a higher number. The higher number goes first. 

2. Once order has been determined for the first round, the lead roller rolls. If the lead roller is the player, the **roll button** is enabled. 

3. If the player clicks the **roll button**, this rolls the dice and determines their score. The **end turn button** then appears. The player can then decide whether to roll again or end their turn, up to three times. 

3. If the player rolls **Mexico** (21), their turn is over no matter how many times they've rolled. The computer can then only roll as many times as the player rolled, unless the player rolled **Mexico** in which case the computer can roll up to three times still.

4. If the computer rolls first, the computer will roll up to three times. After it ends its turn, the player can only roll as many times as the computer rolled, unless the computer rolled **Mexico**. 

5. When the round is over, the players' and computers' scores are compared and the winner of the round is determined. The scoring metrics on the display are then cleared, and if the player loses the round, they lose one of their lives.  

5. The loser of the round gets to roll first in the subsequent round. 

6. If the player makes it through five rounds, they win the game. If the player loses all of their lives before five rounds, they lose the game.

Thanks
------

Thank you to Michael Siller and Michael Christenson for helping with logic and styling related problems I encountered.

Thank you to Aaron Ryder for recommending how I approach the computer's AI.

Thank you to Tim Malstead for testing and helping me debug parts of the game. 
