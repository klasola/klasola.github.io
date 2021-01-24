# <img src="./img/logo.png" alt="ChessSweeper Logo" width="50"/> ChessSweeper 

Based on [this](https://www.chessvariants.com/rules/minesweeper-chess) idea by [Daniil Frolov](https://www.chessvariants.com/who/flowermann).

### About

In this explosive variant of chess, instead of only focusing on capturing pieces, players must also pay attention to pieces getting blown up. 

### Rules

To begin the game, each player must place 6 mines anywhere on their half of the board. When a player moves their piece to the opponent's half of the board, there are 2 possibilities:
- If the target square has a mine, their piece is blown up. 
- If there are no mines on the target square, the number of mines surrounding the space is displayed. 

### Notes

- If the move was intended to be a capture, the opponent's piece on the target square will also blow up.
- If there are no adjacent mines, nothing is displayed. 
- Adjacent mine numbers disappear once a piece moves off the square.
- A player's piece may not be blown up by their own mine.
- If a player's king piece is moved on a mine, the player loses.