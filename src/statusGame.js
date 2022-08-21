#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const file = path.join(__dirname, "../", "logGame.json");

fs.readFile(file, "utf8", (err, data) => {
  if (err) {
    console.log("Еще не было сыграно ни одной игры");
  } else {
    const clonedData = JSON.parse(data);
    const gamesTxt = `Общее количество партий: ${clonedData.games}`;
    const gameTrueTxt = `Количество выигранных: ${clonedData.gameTrue}`;
    const percentTxt = `Процентное соотношение выигранных партий: ${clonedData.percent}`;
    const content = `${gamesTxt}\n${gameTrueTxt}\n${percentTxt}`;
    console.log(content);
  }
});
