# Minesweeper

## July 11, 2023

Fun minesweeper game that I've been playing a lot. I will to document the progress, challenges, and bug fixes I make along the way. This is a good start to my summer coding projects where I brush up my React and JS skills. Deployment on [vercel](minesweeper-six-sigma.vercel.app)

## Notes

Just some interesting notes about this game and building this game I found while implementing my own Minesweeper game.

### Minesweeper the Game
Minesweeper is a classic puzzle video game that originated in the 1960s. You may know it from Microsoft Windows operating systems. The objective of the game is to clear a rectangular grid containing hidden mines without detonating any of them.

To play Minesweeper, you start by left-clicking on a cell. If it reveals a number, that number indicates how many mines/bombs are adjacent to that cell. Your goal is to deduce the locations of the mines based on the numbers and mark them with flags. You can mark a suspected mine by right-clicking on a cell. If you accidentally click on a mine, the game ends.

The challenge lies in strategically analyzing the numbered cells and making logical deductions to avoid detonating the mines. By deducing where the mines are, you can progressively uncover more cells and advance through the grid. The game is won when all non-mine cells are revealed. Minesweeper tests your problem-solving skills, logical reasoning, and memory. (Creating this game took more!) 

### BFS
When you click on a cell it may also have the value of 0 since there could be no bombs around it. This adds no value to the user in finishing the game, so you have to continue to show new cells that aren't 0. To do this, I implemented the Breadth-First-Search (BFS) algorithm to search all the cells around this 0 cell and reveal them until all numbers surround this 0 cell are revealed. I have used this graph theory algorithm many times in competitive coding problems but I never expected that I would use it during this project. It was great to see a practical use of the algorithm.

## July 13, 2023
- Implemented sliders in JS to create custom dimensions and bombs for the board. 
- A refresh button was also required to parse the new values
- Reviewed and learned CSS to style the sliders and button  


