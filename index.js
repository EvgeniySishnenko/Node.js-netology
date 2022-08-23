#!/usr/bin/env node

require("dotenv").config();
const http = require("http");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

const { _: city } = yargs(hideBin(process.argv)).argv;
const cityString = city.join(" ");
const url = `${process.env.URL}/current?access_key=${process.env.ACCESS_KEY}&query=${cityString}`;

http
  .get(url, (res) => {
    if (res.statusCode !== 200) {
      console.log(res.statusCode);
      return;
    }

    res.setEncoding("utf8");
    let rowDate = "";
    res.on("data", (chunk) => (rowDate += chunk));
    res.on("end", () => {
      const parseData = JSON.parse(rowDate);
      if (parseData.success === false) {
        console.error(parseData?.error?.info);
        return;
      }
      const {
        current: {
          weather_descriptions,
          wind_speed,
          wind_degree,
          wind_dir,
          pressure,
          humidity,
        },
      } = JSON.parse(rowDate);
      const weatherDescriptionsTxt = `Погода: ${weather_descriptions}`;
      const windSpeedTxt = `Скорость ветра: ${wind_speed}`;
      const windDegreeTxt = `Градус ветра: ${wind_degree}`;
      const windDirTxt = `Направление ветра: ${wind_dir}`;
      const pressureTxt = `Давление: ${pressure}`;
      const humidityTxt = `Влажность: ${humidity}`;
      const content = `${weatherDescriptionsTxt}\n${windSpeedTxt}\n${windDegreeTxt}\n${windDirTxt}\n${pressureTxt}\n${humidityTxt}`;
      console.log(content);
    });
  })
  .on("error", (err) => {
    console.error(err);
  });
