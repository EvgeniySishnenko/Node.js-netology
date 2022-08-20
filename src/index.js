#!/usr/bin/env node
const readline = require("readline");
const path = require("path");
const fs = require("fs");

const gameObj = require("./constants/gameObj");
const modelLogGame = require("./constants/modelLogGame");
const randomNumber = require("./utils/randomNumber");

const rLine = readline.createInterface(process.stdin, process.stdout);
const file = path.join(__dirname, "../", "logGame.json");

const num = randomNumber(1, 3);
let gameTrue = 0;
let gameFalse = 0;

rLine.question("Отгадай орел или решка", (input) => {
  if (input !== gameObj[num]) {
    rLine.setPrompt(`Не угадал. Правильный ответ: ${gameObj[num]}`);
    rLine.prompt();
    rLine.close();
    gameFalse = 1;
  }
  if (input === gameObj[num]) {
    rLine.setPrompt(`Это правильный ответ!`);
    rLine.prompt();
    rLine.close();
    gameTrue = 1;
  }
  fs.readFile(file, "utf-8", (err, data) => {
    if (err) {
      modelLogGame.gameFalse = gameFalse;
      modelLogGame.gameTrue = gameTrue;
      modelLogGame.games = 1;
      fs.writeFile(file, JSON.stringify(modelLogGame), (err) => {
        if (err) throw err;
      });
    } else {
      const logGame = JSON.parse(data);
      logGame.gameFalse += gameFalse;
      logGame.gameTrue += gameTrue;
      fs.writeFile(file, JSON.stringify(logGame), (err) => {
        if (err) throw err;
      });
    }
  });
});
