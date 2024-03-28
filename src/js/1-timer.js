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

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0])
    userSelectedDate = selectedDates[0]
    msdiff = userSelectedDate - options.defaultDate
    if (msdiff < 1) {
      iziToast.error({
       message: `Please choose a date in the future`,
      });
    } else {
      startBtn.disabled = false;
      dateInput.disabled = true;
    }
  },
};

const fp = flatpickr(dateInput, options);

startBtn.disabled = true;

startBtn.addEventListener('click', event => {
  const intervalId = setInterval(() => {
    const currentTime = Date.now()
    msdiff = userSelectedDate - currentTime
    event.preventDefault()
    dateInput.disabled = true
    if (msdiff < 1) {
      startBtn.disabled = true
      dateInput.disabled = false
      clearInterval(intervalId)
      return
    }
    const timeLeft = convertMs(msdiff)
      console.log(timeLeft)

    daysHand.textContent = timeLeft.days.toString().padStart(2,"0")
    hoursHand.textContent = timeLeft.hours.toString().padStart(2,"0")
    minutesHand.textContent = timeLeft.minutes.toString().padStart(2,"0")
    secondsHand.textContent = timeLeft.seconds.toString().padStart(2,"0")
  }, 1000);
})

// function addLeadingZero(value) { }
  
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