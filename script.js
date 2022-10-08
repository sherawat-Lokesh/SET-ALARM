"use strict";

const h1 = document.querySelector("h1");

setInterval(() => {
  const currentTime = new Date();
  //prettier-ignore
  const hours = `${currentTime.getHours() <= 12 ? currentTime.getHours() : currentTime.getHours() - 12}`.padStart(2, "0");
  const minutes = `${currentTime.getMinutes()}`.padStart(2, "0");
  const seconds = `${currentTime.getSeconds()}`.padStart(2, "0");

  //prettier-ignore
  h1.innerHTML = `${hours}:${minutes}:${seconds}  ${currentTime.getHours()< 12 ? 'AM' : 'PM'}`;
}, 1000);

const hoursMenu = document.querySelector(".hours");
const minutesMenu = document.querySelector(".minutes");

const selectHours = [];
lastRun(12, selectHours);
const selectMinutes = [];
lastRun(60, selectMinutes);

selectHours.sort((a, b) => b - a);
selectHours.forEach((val, i) => {
  //prettier-ignore
  const html = `<li><a class="dropdown-item" href="#" data-hour='${val + 1}'>${val + 1}</a></li>`;
  hoursMenu.insertAdjacentHTML("afterbegin", html);
});

selectMinutes.sort((a, b) => b - a);
selectMinutes.forEach((val) => {
  //prettier-ignore
  const html = `<li><a class="dropdown-item" href="#" data-min='${val }'>${val }</a></li>`;
  minutesMenu.insertAdjacentHTML("afterbegin", html);
});

const alarm = {};
const dropDownClick = document.querySelectorAll(".dropdown-item");

dropDownClick.forEach((btn) =>
  btn.addEventListener("click", function (e) {
    if (e.target.dataset.hour) {
      alarm.hours = e.target.dataset.hour;
    }
    if (e.target.dataset.min) {
      alarm.minutes = e.target.dataset.min;
    }
    if (e.target.dataset.value) {
      alarm.am_pm = e.target.dataset.value;
    }
  })
);

function lastRun(num, vari) {
  for (let i = 0; i < num; i++) {
    vari.push(i);
  }
}

const alarmSetBtn = document.querySelector(".alarm-btn");
const audio = document.querySelector(".my-audio");
audio.src = "/files/ringtone.mp3";

const source = document.createElement("source");
source.src = "/files/ringtone.mp3";
source.type = 'type="audio/mpeg';

audio.insertAdjacentElement("afterbegin", source);
let interval;

alarmSetBtn.addEventListener("click", function (e) {
  if (alarmSetBtn.textContent === "Set Alarm") {
    //prettier-ignore
    if (alarm.hours && alarm.minutes && alarm.am_pm) {
    localStorage.setItem("alarm", JSON.stringify(alarm));

  }
    interval = setInterval(() => {
      playAlarm();
    }, 3000);

    alarmSetBtn.textContent = "Stop Alarm";
    return;
  }
  if (alarmSetBtn.textContent === "Stop Alarm") {
    localStorage.removeItem("alarm");
    audio.pause();
    clearInterval(interval);
    alarmSetBtn.textContent = "Set Alarm";
    return;
  }
});

function playAlarm() {
  const alarmData = JSON.parse(localStorage.getItem("alarm"));
  const date = new Date();
  //prettier-ignore
  const hours = `${date.getHours() <= 12 ? date.getHours() : date.getHours() - 12}`;
  const minutes = `${date.getMinutes()}`;
  const am_pm = `${date.getHours() < 12 ? "AM" : "PM"}`;
  //prettier-ignore
  if (alarmData.hours === hours && alarmData.minutes === minutes && alarmData.am_pm === am_pm) {
    console.log("matched");
    audio.play();
  }
}
