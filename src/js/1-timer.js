import flatpickr from "flatpickr"
import "flatpickr/dist/flatpickr.min.css"
import iziToast from "izitoast"
import "izitoast/dist/css/iziToast.min.css"

const dateInput = document.getElementById("datetime-picker")
const startBtn = document.querySelector('[data-start]')
const daysHand = document.querySelector('[data-days]')
const hoursHand = document.querySelector('[data-hours]')
const minutesHand = document.querySelector('[data-minutes]')
const secondsHand = document.querySelector('[data-seconds]')

let userSelectedDate
let msdiff
let timeLeft

startBtn.disabled = true

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0])
    msdiff = selectedDates[0] - options.defaultDate
    if (msdiff < 1) {
      startBtn.disabled = true
      iziToast.error({
      message: `Please choose a date in the future`
      });
    } else {
      startBtn.disabled = false
      userSelectedDate = selectedDates[0]
    }
  },
};

const fp = flatpickr(dateInput, options)

startBtn.addEventListener('click', event => {
  const intervalId = setInterval(() => {

    const currentTime = Date.now()
    msdiff = userSelectedDate - currentTime

    dateInput.disabled = true
    startBtn.disabled = true

    if (msdiff < 1) {
      startBtn.disabled = false
      dateInput.disabled = false
      clearInterval(intervalId)
      return
    }
    timeLeft = convertMs(msdiff)
    console.log(timeLeft)
    renderTime()
  },
    1000);
})

function renderTime() {
  daysHand.textContent = addLeadingZero(timeLeft.days)
    hoursHand.textContent = addLeadingZero(timeLeft.hours)
    minutesHand.textContent = addLeadingZero(timeLeft.minutes)
  secondsHand.textContent = addLeadingZero(timeLeft.seconds)
}
    
function addLeadingZero(value) {return value.toString().padStart(2,"0")}
  
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
    return { days, hours, minutes, seconds };
}



// Розгляньте можливість використання більш описового імені змінної для msdiff. Ім'я на кшталт timeDifference або подібне може бути більш інформативним.

// Обробник події startBtn був досить довгим; розділила логіку на менші функції, може поліпшити читабельність.