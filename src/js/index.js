/*
 * @Author: George Zhao
 * @Date: 2021-10-26 13:14:13
 * @LastEditors: George Zhao
 * @LastEditTime: 2021-10-29 12:37:36
 * @Description:
 * @Email: 2018221138@email.szu.edu.cn
 * @Company: SZU
 * @Version: 1.0
 */
require("../scss/interface.scss");
import * as timer from "./timer";
import * as localstorage from "./localstorage";

let refreshIntervalId = undefined;

let urlParams = new URLSearchParams(window.location.search);

let minlength = 25 * 60 * 1000;

function playring() {
  let audio = new Audio(document.baseURI + "assets/audios/r1.mp3");
  audio.play();
}

function setNumBer(min, sec = 0) {
  document.querySelector("#mintime").innerHTML = min;
  document.querySelector("#secondtime").innerHTML = String(sec).padStart(
    2,
    "0"
  );
}

function setDurtion(min, sec = 0) {
  minlength = (min * 60 + sec) * 1000;
  setNumBer(min, sec);
}

if (urlParams.has("min") == true) {
  minlength = parseInt(urlParams.get("min")) * 60 * 1000;
  document.querySelector("#mintime").innerHTML = urlParams.get("min");
} else {
  document.querySelector("#mintime").innerHTML = 25;
}

function callback_click(target_time) {
  refreshIntervalId = setInterval(() => {
    let diff_time = timer.substra_time(target_time, Date.now());
    setNumBer(diff_time["min"], diff_time["sec"]);
    if (diff_time["min"] <= 0 && diff_time["sec"] <= 0) {
      clearInterval(refreshIntervalId);
      playring();
      localstorage.storeRecord(target_time, minlength);
      document.querySelector("#startbutton > span").innerHTML = "Start";
    }
  }, 250);
}

document.querySelector("#startbutton").addEventListener("click", (event) => {
  if (document.querySelector("#startbutton > span").innerHTML == "Start") {
    document.querySelector("#startbutton > span").innerHTML = "Stop";
    let target_time = Date.now();
    target_time += minlength;
    callback_click(target_time);
  } else if (
    document.querySelector("#startbutton > span").innerHTML == "Stop"
  ) {
    document.querySelector("#startbutton > span").innerHTML = "Start";
    if (refreshIntervalId != undefined) clearInterval(refreshIntervalId);
  }
});

document.addEventListener("keydown", (e) => {
  if (e.code == "Space") {
    document.querySelector("#startbutton").click();
  }
});

function clickStart() {
  refreshIntervalId = setInterval(() => {
    let diff_time = timer.substra_time(target_time, Date.now());
    setNumBer(diff_time["min"], diff_time["sec"]);
    if (diff_time["min"] <= 0 && diff_time["sec"] <= 0) {
      clearInterval(refreshIntervalId);
      playring();
      localstorage.storeRecord(target_time, minlength);
      document.querySelector("#startbutton > span").innerHTML = "Start";
    }
  }, 250);
}

function clickReset() {}
function clickStop() {}
function clickBreak() {}
function setTitle(title) {}
