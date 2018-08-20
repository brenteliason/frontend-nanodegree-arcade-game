"use strict;"
// Enemies our player must avoid
var Enemy = function(row, speed) {//ROW MUST BE BETWEEN 1 and 3 to appear on stone squares; speed should be between 20 and 80
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.y = row * 83;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {//COMMENTS BELOW TAKEN FROM ENEMY class
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';
    this.x_coord = 2;
    this.x = this.x_coord * 101;
    this.y_coord = 5;
    this.y = this.y_coord * 83;
};

// Update the player's position, required method for game
// need to update based on player input
Player.prototype.update = function(key) {//UPDATE's player position based on keystroke
  //console.log("Inside player's update function");
  /*if (dimension == 'x')
    this.x = this.x_coord * 101;
  else if (dimension == 'y')
    this.y = this.y_coord * 83;
  else {
    //console.log("Player update function called without X OR Y");
  }*/
  if (key == 'left') {//moves player left
    if (0 < this.x_coord ) {
      this.x_coord--;
      //this.update('x');
      this.x = this.x_coord * 101;
      for (let i = 0; i < allEnemies.length; i++) {
        if ((this.y == allEnemies[i].y) && ((this.x + 101) > allEnemies[i].x) && (this.x < allEnemies[i].x)) {//CATCHES collisions that occur by moving left THROUGH an enemy
          //console.log("Player moved left through enemy - collision");//reset code from checkCollisions stripped from setTimeout function to avoid double code,
          //setTimeout(function () {//DELAYS restting game so user can see collision that caused reset
            //console.log("Checking for collision between player and enemy#: " + i + "...");
            //console.log("\tPlayer's position is: " + player.x + ", " + player.y);
            //console.log("\tEnemy's position is: " + allEnemies[i].x + ", " + allEnemies[i].y);
          lossCount++;
            //console.log("\tCollision! Reset game! Wins = " + winCount + ", Losses = " + lossCount);
            //reset("Loss");
          if ((winCount + lossCount) == 1) {//firstLoss - add wincount and losscount to page
            const gameTracker = document.createElement('h1');
            gameTracker.textContent = "Wins: " + winCount + " , Losses: " + lossCount;
            //console.log("New html is: " + gameTracker.textContent);
            const body = document.querySelector('body');
            body.appendChild(gameTracker);
          }
          else {//not first win or loss, just update existing counts of wins and losses
            const gameTracker = document.querySelector('h1');
            gameTracker.textContent = "Wins: " + winCount + " , Losses: " + lossCount;
          }

          player.x_coord = 2;
          player.x = player.x_coord * 101;
          player.y_coord = 5;
          player.y = player.y_coord * 83;
          allEnemies = [new Enemy(1,150), new Enemy(2,40), new Enemy(3,170), new Enemy(1,20), new Enemy (2,80)];//adds new enemies for new game
          //allEnemies = [new Enemy(1,1)];
          //}, 100);
        }//END of if for detecting collisions caused in transit by player moving left THROUGH an enemy
      }//END OF FOR LOOP going through enemies list
      if (allEnemies.length % 3 == 0 && allEnemies.length < 8) {//sometimes adds an enemy
        allEnemies.push(new Enemy(1,115));
        //allEnemies.push(new Enemy(1,1));
      }
    }
    return;
  }
  if (key == 'right') {//moves player right
    if (this.x_coord < 4) {
      this.x_coord++;
      //this.update('x');
      this.x = this.x_coord * 101;
      if (allEnemies.length % 2 == 1 && allEnemies.length < 10) {//sometimes adds an enemy
        allEnemies.push(new Enemy(1,260));
        //allEnemies.push(new Enemy(1,1));
      }
    }
    return;
  }
  if (key == 'up') {//moves player up
    if (0 < this.y_coord) {
      this.y_coord--;
      //this.update('y');
      this.y = this.y_coord * 83;
      if (allEnemies.length % 2 == 0 && allEnemies.length < 10) {//sometimes adds an enemy
        allEnemies.push(new Enemy(2,30));
        //allEnemies.push(new Enemy(3,1));
      }
    }
    if (this.y_coord == 0) {//if player reaches water, triggers win code and resets game
      winCount++;
      //console.log("You reached the other side! Reset game! Wins = " + winCount + ", Losses = " + lossCount);
      //Engine.reset("Win");
      if ((winCount + lossCount) == 1) {//firstWin - add wincount and losscount to page
        const gameTracker = document.createElement('h1');
        gameTracker.textContent = "Wins: " + winCount + " , Losses: " + lossCount;
        //console.log("New html is: " + gameTracker.textContent);
        const body = document.querySelector('body');
        body.appendChild(gameTracker);
      }
      else {//NOT FIRST WIN OR LOSS, just updated win loss count at bottom of screen
        const gameTracker = document.querySelector('h1');
        gameTracker.textContent = "Wins: " + winCount + " , Losses: " + lossCount;
      }

      //reset player's position
      this.x_coord = 2;
      this.x = this.x_coord * 101;
      this.y_coord = 5;
      this.y = this.y_coord * 83;
      allEnemies = [new Enemy(1,330), new Enemy(2,140), new Enemy(3,270), new Enemy(1,90), new Enemy (2,80)];//adds new enemies for new game
      //allEnemies = [new Enemy(1,1), new Enemy(2,1), new Enemy(3,1)];
    }
    return;
  }
  if (key == 'down') {//moves player down
    if (this.y_coord < 5) {
      this.y_coord++;
      //this.update('y');
      this.y = this.y_coord * 83;
      if (allEnemies.length % 2 == 0 && allEnemies.length < 12) {//sometimes adds an enemy
        allEnemies.push(new Enemy(2,380));
        //allEnemies.push(2,1);
      }

    }
    return;
  }
  return;
};

//col(x) * 101, row(y) * 83
Player.prototype.handleInput = function(key) {
  //console.log("Inside handleInput with key: " + key);
  return this.update(key);

};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(1,290), new Enemy(2,80), new Enemy(3,170)];//initial enemies
//var allEnemies = [new Enemy(1,1), new Enemy(2,1), new Enemy(3,1)];
const player = new Player();
let winCount = 0;
let lossCount = 0;

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
