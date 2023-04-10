# **Project One:**

## **Beginner’s Tetris with Server Integration**

### ***Description***
This application is a simple game of Tetris with a .db server to store player’s name, score, and time data. 

### ***Run***
To run the needed .db server: navigate to the project and enter *json-server --watch db.json*

To run the application, enter *open index.html*

To start a game, press the *“Start Game”* button

### ***Controls***
**Move left** - LEFT ARROW
**Move right** - RIGHT ARROW
**Move down** - DOWN ARROW
**Rotate** - UP ARROW
**Play/Pause** - PLAY/PAUSE BUTTON
**Reset Page** - NEW GAME BUTTON

### ***Build***
This application is built through combination of javaScript, CSS, and HTML. The stage and preview boxes are comprised of HTML divs. The blocks or tetrominoes are built using arrays and are set to scale with the “div grid” *via their width*. 

This application consists of a single level where block will fall at a rate of one div width every second. A score is added when a row is filled and removed from the grid. 

When GAME OVER is triggered (when the current block is spawned into a placed bock), a player can enter their name into the text box and submit. The player’s score, time played, and entered name with be compiled and added to the attached server. 

