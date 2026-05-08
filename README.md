# Battleship

Live Link: https://heroxzain.github.io/battleship

Future Improvements:
* feat: Add strict spacing (russian spacing) 
    In GameController.js, modify the code to add the adjacent nodes to visited nodes when placing the ship so it won't pick those nodes again
* feat: Auto-miss 
    When hitting or destroying a ship, convert the adjacent pieces to misses (automatically) to save a few clicks
* fun: Granade/Splash Damage
    There are two ways to implement this
    1. Create a seperate button (a powerup or extra ability) that can be used only once per match. It will splash the adjacent cells on which it is hit
    2. Create a default feature which always hits a cell and it's adjacent cells in "plus" shape
* feat: Display remaining ships
* feat: Implement drag and drop 
* feat: Impelement two players mode
* feat: Implemnet smart AI
