import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      console.log(selectedDates[0]);
    if (selectedDates[0] < new Date()) {
       Notiflix.Notify.failure('Please choose a date in the future');

      // window.alert("Please choose a date in the future");
      return
       }     startBtn.removeAttribute("disabled");

  },
};

let timerId = null;
let deadline = null;

const myInput = document.querySelector("#datetime-picker");
const startBtn = document.querySelector('[data-start]');
const fp = flatpickr(myInput, options);

startBtn.disabled = true;

startBtn.addEventListener('click', onStartBtn);

function onStartBtn() {

timerId = setInterval(() => {
  deadline = new Date(myInput.value); 
  const finishTime = convertMs(Number(deadline) - Number(new Date()));
  startBtn.disabled = true;
        myInput.disabled = true;
  if (finishTime.seconds < 0) {
    clearInterval(timerId);
}

  document.querySelector('[data-days]').textContent = addLeadingZero(finishTime.days);
    document.querySelector('[data-hours]').textContent = addLeadingZero(finishTime.hours);
  document.querySelector('[data-minutes]').textContent = addLeadingZero(finishTime.minutes);
  document.querySelector('[data-seconds]').textContent = addLeadingZero(finishTime.seconds);


  }, 1000);
};





function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
