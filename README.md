# Battleship

Live Link: https://heroxzain.github.io/battleship

## Future Improvements:
* fun: Granade/Splash Damage
    There are two ways to implement this:
    1. Create a seperate button (a powerup or extra ability) that can be used only once per match. It will splash the adjacent cells on which it is hit
    2. Create a default feature which always hits a cell and it's adjacent cells in "plus" shape
* feat: Implement drag and drop 
* feat: Impelement two players mode
* feat: Implemnet smart AI
* feat: Create a button on top right of the screen, which gives an option to create custom ships. The ship icon can be found on google icons. The button should display a dialogue to do the following: 
    * Add the number of ships (from 5 to 10)
    * Set the size of each ship (from 1 to 5 for each ship)
    * Create a mathematical function to validate the number of ships vs size of ships. If the ships take more then 30 percent of board space, then you cannot place ships (display an error message saying: too many ships "decrease the size of ships or decrease the number of ships). The total filled cells must not be more then 5 ships each of 5 size,  so: (5 * 5 = 25). 
    * Set the axis of each ship
    * Then place the ships randomly on board. (Call the GenerateShips module on clicking submit button, with the input from dialogue as the parameter the the generate ships).
* feat: Store the custom ships data on local storage
