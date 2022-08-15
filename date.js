#!/usr/bin/env node

const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const { _: commands, $0, ...restParams } = yargs(hideBin(process.argv)).argv;
const { d, date, m, month, y, year } = restParams;
const newDate = new Date();
const command = commands.toString();
let params;
let period;
if (year || y) {
  period = "year";
  params = year || y;
}

if (month || m) {
  period = "month";
  params = month || m;
}

if (date || d) {
  period = "date";
  params = date || d;
}

const getResultCurrentCommand = (period) => {
  const modelObj = {
    year: () => newDate.getFullYear(),
    month: () => newDate.getMonth(),
    date: () => newDate.getDate(),
  };

  return modelObj[period]() || newDate;
};

const getCommandAdd = (period, add) => {
  const modelObj = {
    year: () => newDate.getFullYear() + add,
    month: () => newDate.getMonth() + add,
    date: () => newDate.getDate() + add,
  };

  return modelObj[period]() || newDate;
};

const getCommandSub = (period, sub) => {
  const modelObj = {
    year: () => newDate.getFullYear() - sub,
    month: () => newDate.getMonth() - sub,
    date: () => newDate.getDate() - sub,
  };

  return modelObj[period]() || newDate;
};

if (command === "current") {
  const resDate = getResultCurrentCommand(period);
  console.log(resDate);
}

if (command === "add") {
  const resDate = getCommandAdd(period, params);
  console.log(resDate);
}

if (command === "sub") {
  const resDate = getCommandSub(period, params);
  console.log(resDate);
}
