const timerTime = document.getElementById("timerTime") as HTMLInputElement;
const timeLeft = document.getElementById("timeLeft") as HTMLParagraphElement;
const setTimer = document.getElementById("setTimer") as HTMLButtonElement;

let intervalId: number = 0;

function getRemainder(): void {
  const date = new Date().getTime();
  const timer = new Date(timerTime.value).getTime();

  let id = intervalId;

  const dateDifference = Math.abs(date - timer);

  const remainder = (function (): string {
    let hours = dateDifference / (1000 * 60 * 60);
    let absoluteHours = Math.floor(hours);

    let minutes = (hours - absoluteHours) * 60;
    let absoluteMinutes = Math.floor(minutes);

    let seconds = (minutes - absoluteMinutes) * 60;
    let absoluteSeconds = Math.floor(seconds);

    let daysRemaining =
      +absoluteHours > 23 ? Math.floor(+absoluteHours / 24) : 0;
    let newHoursRemaining =
      +absoluteHours > 23 ? +absoluteHours % 24 : absoluteHours;

    if (
      daysRemaining === 0 &&
      newHoursRemaining === 0 &&
      absoluteMinutes === 0 &&
      absoluteSeconds === 0
    ) {
      clearInterval(id);
      return "Timer is up!";
    }

    return `${daysRemaining + "d "}${newHoursRemaining + "h"} ${
      absoluteMinutes + "m"
    } ${absoluteSeconds + "s"}`;
  })();

  timeLeft.textContent = remainder;
}

setTimer?.addEventListener("click", () => {
  const currentTime = new Date();

  if (
    timerTime.value === "" ||
    new Date(timerTime?.value).getTime() < currentTime.getTime()
  ) {
    alert(`${new Date(timerTime?.value)} has already passed`);
    return;
  }

  intervalId = setInterval(getRemainder, 1000);
});
