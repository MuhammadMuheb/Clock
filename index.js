const body = document.querySelector("body"),
  hourHand = document.querySelector(".hour"),
  minuteHand = document.querySelector(".minute"),
  secondHand = document.querySelector(".second"),
  modeSwitch = document.querySelector(".mode-switch"),
  modeLabel = document.querySelector(".mode-label"),
  digitalTime = document.getElementById("digital-time"),
  digitalDate = document.getElementById("digital-date"),
  yearEl = document.getElementById("year");

const setMode = (isDarkMode) => {
  body.classList.toggle("dark", isDarkMode);
  modeLabel.textContent = isDarkMode ? "Light Mode" : "Dark Mode";
  modeSwitch.setAttribute("aria-pressed", isDarkMode);
  localStorage.setItem("mode", isDarkMode ? "Dark Mode" : "Light Mode");
};

if (localStorage.getItem("mode") === "Dark Mode") {
  setMode(true);
}

modeSwitch.addEventListener("click", () => {
  setMode(!body.classList.contains("dark"));
});

const timeFormatter = new Intl.DateTimeFormat(undefined, {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: true,
});
const dateFormatter = new Intl.DateTimeFormat(undefined, {
  weekday: "long",
  month: "long",
  day: "numeric",
});

const updateTime = () => {
  const date = new Date(),
    seconds = date.getSeconds(),
    minutes = date.getMinutes() + seconds / 60,
    hours = (date.getHours() % 12) + minutes / 60,
    secToDeg = (seconds / 60) * 360,
    minToDeg = (minutes / 60) * 360,
    hrToDeg = (hours / 12) * 360;

  secondHand.style.transform = `rotate(${secToDeg}deg)`;
  minuteHand.style.transform = `rotate(${minToDeg}deg)`;
  hourHand.style.transform = `rotate(${hrToDeg}deg)`;

  digitalTime.textContent = timeFormatter.format(date);
  digitalDate.textContent = dateFormatter.format(date);
};
updateTime();
setInterval(updateTime, 1000);

yearEl.textContent = new Date().getFullYear();
