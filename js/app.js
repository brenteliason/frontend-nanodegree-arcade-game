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
Player.prototype.update = function(key) {
  //console.log("Inside player's update function");
  /*if (dimension == 'x')
    this.x = this.x_coord * 101;
  else if (dimension == 'y')
    this.y = this.y_coord * 83;
  else {
    //console.log("Player update function called without X OR Y");
  }*/
  if (key == 'left') {
    if (0 < this.x_coord ) {
      this.x_coord--;
      //this.update('x');
      this.x = this.x_coord * 101;
      if (allEnemies.length % 3 == 0) {
        allEnemies.push(new Enemy(1,25));
      }
    }
    return;
  }
  if (key == 'right') {
    if (this.x_coord < 4) {
      this.x_coord++;
      //this.update('x');
      this.x = this.x_coord * 101;
      if (allEnemies.length % 2 == 1) {
        allEnemies.push(new Enemy(1,60));
      }
    }
    return;
  }
  if (key == 'up') {
    if (0 < this.y_coord) {
      this.y_coord--;
      //this.update('y');
      this.y = this.y_coord * 83;
      if (allEnemies.length % 2 == 0) {
        allEnemies.push(new Enemy(2,30));
      }
    }
    if (this.y_coord == 0) {
      winCount++;
      //console.log("You reached the other side! Reset game! Wins = " + winCount + ", Losses = " + lossCount);
      //Engine.reset("Win");
      if ((winCount + lossCount) == 1) {//firstWin - add wincount and losscount to page
        const gameTracker = document.createElement('h1');
        gameTracker.textContent = "Wins: " + winCount + " , Losses: " + lossCount;
        console.log("New html is: " + gameTracker.textContent);
        const body = document.querySelector('body');
        body.appendChild(gameTracker);
      }
      else {
        const gameTracker = document.querySelector('h1');
        gameTracker.textContent = "Wins: " + winCount + " , Losses: " + lossCount;
      }

      this.x_coord = 2;
      this.x = this.x_coord * 101;
      this.y_coord = 5;
      this.y = this.y_coord * 83;
      allEnemies = [new Enemy(1,150), new Enemy(2,40), new Enemy(3,170), new Enemy(1,20), new Enemy (2,80)];
    }
    return;
  }
  if (key == 'down') {
    if (this.y_coord < 5) {
      this.y_coord++;
      //this.update('y');
      this.y = this.y_coord * 83;
      if (allEnemies.length % 2 == 0) {
        allEnemies.push(new Enemy(3,80));
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
var allEnemies = [new Enemy(1,30), new Enemy(2,80), new Enemy(3,50)];
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
