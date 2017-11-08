// Setup initial game stats
var score = 0;
var lives = 2;
var powerPellets = 4;
var dots = 240;
var ghostsEaten = 0;
var level = 0;

// Define your ghosts here
var inky = {
  menu_option: '1',
  name: 'Inky',
  colour: 'Red',
  character: 'Shadow',
  edible: false
};

var blinky = {
  menu_option: '2',
  name: 'Blinky',
  colour: 'Cyan',
  character: 'Speedy',
  edible: false
};

var pinky = {
  menu_option: '3',
  name: 'Pinky',
  colour: 'Pink',
  character: 'Bashful',
  edible: false
};

var clyde = {
  menu_option: '4',
  name: 'Clyde',
  colour: 'Orange',
  character: 'Pokey',
  edible: false
};

// replace this comment with your four ghosts setup as objects
var ghosts = [inky, blinky, pinky, clyde]

// Draw the screen functionality
function drawScreen() {
  clearScreen();
  setTimeout(function() {
    displayStats();
    displayMenu();
    displayPrompt();
  }, 10);
}

function clearScreen() {
  console.log('\x1Bc');
}

function displayStats() {
  console.log('LEVEL: ' + level);
  console.log('\n');
  console.log('Score: ' + score + '     Lives: ' + lives);
  console.log("\n");
  console.log('Power-Pellets: ' + powerPellets + '    Dots: ' + dots);
   console.log('Ghosts Eaten: ' + ghostsEaten);
}

function displayMenu() {
  console.log('\n\nSelect Option:\n');  // each \n creates a new line
  if (dots >= 10) {
    console.log('(t) Eat 10 Dots');
  }
  if (dots >= 100) {
    console.log('(o) Eat 100 Dots');
  }
  console.log('(r) Eat Remaining Dots');
  console.log('(d) Eat Dot');
  if (powerPellets > 0) {
    console.log('(p) Eat Power-Pellet');
  }
  console.log('(1) Eat Inky', inky.edible ? "(edible)" : "(inedible)");
  console.log('(2) Eat Blinky', blinky.edible ? "(edible)" : "(inedible)");
  console.log('(3) Eat Pinky', pinky.edible ? "(edible)" : "(inedible)");
  console.log('(4) Eat Clyde', clyde.edible ? "(edible)" : "(inedible)");
  console.log('(q) Quit');
}

function displayPrompt() {
  // process.stdout.write is similar to console.log except it doesn't add a new line after the text
  process.stdout.write('\nWaka Waka :v '); // :v is the Pac-Man emoji.
}


// Menu Options

function chomp() {
  console.log('\nChomp!');
}

function eatDot() {
  chomp();
  score += 5;
  dots -= 1;
  IsCountZero();
}

function eatRemainingDots() {
  chomp();
  score += dots;
  dots -= dots;
  IsCountZero();
}

function eatTenDots() {
  chomp();
  score += 20;
  dots -= 10;
  IsCountZero();
}

function eatOneHunDots() {
  chomp();
  score += 100;
  dots -= 100;
  IsCountZero();
}

function eatPowerPellet() {
  chomp();
  score += 50;
  for (i = 0; i < ghosts.length; i++)
  {
    var ghost = ghosts[i]
    ghost["edible"] = true;
  }
  powerPellets -= 1;
  IsCountZero()
}

function eatGhost(ghost) {
  if (ghost["edible"] === false)
  {
    console.log("\n" + ghost["name"] + " the " + ghost["colour"] + " ghost took a life!");
    lives -= 1;
    if (lives < 0)
    {
      return gameOver()
    }
    return lives
  }
  else if (ghost["edible"] === true)
  {
      console.log("\nPacman can now eat " + ghost["colour"] + " ghost " + ghost["name"] + "!");
      ghostsEaten += 1;
      checkGhostsEaten();
      ghost["edible"] = false;
  }
}

  function checkGhostsEaten() {
    if (ghostsEaten === 1)
      { score += 200; }
    else if (ghostsEaten === 2)
      { score += 400; }
    else if (ghostsEaten === 3)
    { score += 800; }
    else if (ghostsEaten === 4)
    {
      score += 1600;
      ghostsEaten = 0;
    }
  }


function IsCountZero() {
  if (dots === 0 && powerPellets === 0)
    { level += 1;
      dots = 240;
      powerPellets = 4;
    }
}


function gameOver() {
  process.exit();
}


// Process Player's Input
function processInput(key) {
  switch(key) {
    case '\u0003': // This makes it so CTRL-C will quit the program
    case 'q':
      process.exit();
      break;
    case '1':
      eatGhost(inky)
      break;
    case '2':
      eatGhost(blinky)
      break;
    case '3':
      eatGhost(pinky)
      break;
    case '4':
      eatGhost(clyde)
      break;
    case 'p':
      eatPowerPellet();
      break;
    case 't':
      eatTenDots();
      break;
    case 'o':
      eatOneHunDots();
      break;
    case 'r':
      eatRemainingDots();
      break;
    case 'd':
      eatDot();
      break;
    default:
      console.log('\nInvalid Command!');
  }
}


//
// YOU PROBABLY DON'T WANT TO CHANGE CODE BELOW THIS LINE
//

// Setup Input and Output to work nicely in our Terminal
var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

// Draw screen when game first starts
drawScreen();

// Process input and draw screen each time player enters a key
stdin.on('data', function(key) {
  process.stdout.write(key);
  processInput(key);
  setTimeout(drawScreen, 300); // The command prompt will flash a message for 300 milliseoncds before it re-draws the screen. You can adjust the 300 number to increase this.
});

// Player Quits
process.on('exit', function() {
  console.log('\n\nGame Over!\n');
});
