const body = document.querySelector("body"),
  hourHand = document.querySelector(".hour"),
  minuteHand = document.querySelector(".minute"),
  secondHand = document.querySelector(".second"),
  modeSwitch = document.querySelector(".mode-switch"),
  modeLabel = document.querySelector(".mode-label");

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

const updateTime = () => {
  let date = new Date(),
    secToDeg = (date.getSeconds() / 60) * 360,
    minToDeg = (date.getMinutes() / 60) * 360,
    hrToDeg = (date.getHours() / 12) * 360;

  secondHand.style.transform = `rotate(${secToDeg}deg)`;
  minuteHand.style.transform = `rotate(${minToDeg}deg)`;
  hourHand.style.transform = `rotate(${hrToDeg}deg)`;
};
updateTime();
setInterval(updateTime, 1000);
