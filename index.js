const body = document.querySelector("body"),
  hourHand = document.querySelector(".hour"),
  minuteHand = document.querySelector(".minute"),
  secondHand = document.querySelector(".second"),
  modeSwitch = document.querySelector(".mode-switch"),
  modeLabel = document.querySelector(".mode-label"),
  digitalTime = document.getElementById("digital-time"),
  digitalDate = document.getElementById("digital-date"),
  digitalTz = document.getElementById("digital-tz");

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

// Automatic timezone detection: the browser's Intl API already resolves
// the visitor's own system timezone, so anyone opening the page anywhere
// in the world sees their correct local time with no dropdown, no lookup
// service, and no location permission prompt.
const detectedTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const formatUtcOffset = (date) => {
  const offsetMinutes = -date.getTimezoneOffset();
  const sign = offsetMinutes >= 0 ? "+" : "-";
  const abs = Math.abs(offsetMinutes);
  const hours = Math.floor(abs / 60);
  const minutes = abs % 60;
  return `GMT${sign}${hours}${minutes ? ":" + String(minutes).padStart(2, "0") : ""}`;
};

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
  digitalTz.textContent = `${detectedTimeZone} · ${formatUtcOffset(date)}`;
};
updateTime();
setInterval(updateTime, 1000);
