# Mexico-Dice-Game
Javascript Game for General Assembly SEI

Mexico is an elimination-style dice game with unique game mechanics.  

Some versions of Mexico incorporate betting, but in this version one player plays against a computer AI. The player is given a set amount of lives and must win a fixed number of rounds against the computer to win the game. The number of lives the player has and number of rounds they must win can be adjusted to change the difficulty. 

In each round the player and computer roll two dice. The game has a unique scoring system that concatenates the numbers from each die to determine the score of the roll. For instance,if the player rolls a '4' on the first die and a '5' on the second die, their score would be 45. Similarly, a roll of '2' and '2' would result in a score of 22. 

The highest possible score in the game is a '21', also called 'Mexico'. The next highest scores are any double numbers, in descending order ('66', '55', '44', '33', '22', '11'), followed by non-double numbers in descending order ('65', '64'...'13', '12').

To initiate the game, the player and computer each roll one die. Whoever has the higher number rolls first in round one. If they roll the same number, they keep rolling until one gets a higher number. 

In each round, the lead roller rolls up to three times. If the lead roller is the player, they can choose to end their turn after any roll by clicking the end button. The computer determines how many times to roll based on a series of pre-programmed scoring thresholds (see AI section below). If the lead roller rolls a '21', or Mexico, their turn immediately ends. 

The second roller can only roll as many times as the lead roller. For instance, if the lead roller rolls twice, the second roller is only able to roll twice. When the second roller finishes rolling, the two final scores are compared and the winner of the round is determined based on the scoring system. The loser of the round becomes the lead roller in the next round. If the round results in a tie, the player and computer roll one die to determine order again.

If the player makes it through the designated number of rounds, they win the game. 

*Note on computer AI

The computer decides how many times to roll based on the following logic:

If the computer is the lead roller and it rolls Mexico ('21'), a double number or a number between 55 and 66, it will end its turn. 












