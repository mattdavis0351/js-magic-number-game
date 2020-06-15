const prompt = require("prompt-sync")({ sigint: true });
const chalk = require("chalk");

let gameState = true;
let userTries = 5;
const DEBUG = true;

while (gameState) {
  const game = gameInit();

  //   core game logic
  while (userTries > 0) {
    console.log(
      `${game.userName} you have ${userTries} remaining guesses... good luck!`
    );
    let guess = prompt(`Enter a guess: `); // This is a sting not a number... so handle it
    // if proper guess can't be a number handle error
    if (DEBUG) {
      console.log(
        `properGuess value is: ${guess}, it's type is: ${typeof guess}`
      );
    }
    validateGuess(guess);

    // checkGuess(guess, game);
    if (Number(guess) !== game.magicNumber) {
      if (Number(guess) > game.magicNumber) {
        console.log(chalk.redBright("Your guess is too high!!!"));
      } else {
        console.log(chalk.redBright("Your guess is too low!!!"));
      }
      userTries--;
    } else {
      console.log(
        chalk.greenBright(`Congrats ${game.userName}, you have won the game!`)
      );
      break;
    }
  }
  //   checkGuess ends here
  console.log(chalk.italic.blue(`The correct number was ${game.magicNumber}`));

  let playAgain = prompt(
    chalk.blue(`${game.userName} would you like to play again y/n? `)
  );
  console.log(playAgain);
  playAgain = playAgain.toLowerCase();
  if (playAgain !== "y") {
    chalk.blue(`GoodBye!`);
    gameState = false;
  } else {
    userTries = 5;
  }
}

// function checkGuess(vguess, gameo) {
//   if (Number(vguess) !== gameo.magicNumber) {
//     if (Number(vguess) > gameo.magicNumber) {
//       console.log(chalk.redBright("Your guess is too high!!!"));
//     } else {
//       console.log(chalk.redBright("Your guess is too low!!!"));
//     }
//     userTries--;
//   } else {
//     console.log(
//       chalk.greenBright(`Congrats ${gameo.userName}, you have won the game!`)
//     );
//     return;
//   }
// }

function gameInit() {
  const magicNumber = Math.floor(Math.random() * 101);
  if (DEBUG) {
    console.log(magicNumber);
  }

  console.log(
    chalk.blue(
      `Welcome to our number guessing game.\nYou'll have 5 tries to guess a number between 1 and 100!`
    )
  );
  const userName = prompt("What should we call you? ");

  console.log(`Nice to meet you ${userName}`);

  return { magicNumber, userName };
}

function validateGuess(g) {
  if (isNaN(g)) {
    console.log(g);
    guess = prompt(`You did not enter a valid number, try again: `);
    validateGuess(guess);
  }
}
