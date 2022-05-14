import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';
// ==================delite!!!!!!===================
const stopBtn = document.querySelector('.stop');
stopBtn.addEventListener("click", () => {
    clearInterval(timerId);
    console.log(`Interval with id ${timerId} has stopped!`);
})
// =====================
const date = new Date();
const input = document.querySelector('input');
const startBtn = document.querySelector('button');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectDate.selectedDates[0] > date) {
            startBtn.disabled = false;
            startBtn.removeAttribute('disabled');
        }
        else {
            startBtn.disabled = true;
            window.alert("Please choose a date in the future");
        };
    }
};
const selectDate = flatpickr(input, options);
let timerId = null;

startBtn.setAttribute('disabled', true);
startBtn.addEventListener('click', onStartBtn);

function onStartBtn() {
    startBtn.setAttribute('disabled', true);
    if (timerId >= 0) {
        timerId = setInterval(() => {
            let now = Date.now();
            const leftUntil = Date.parse(selectDate.selectedDates[0]) - now;
            const { days, hours, minutes, seconds } = convertMs(leftUntil);
            console.log(`${days}::${hours}:${minutes}:${seconds}`);
            dataHours.textContent = `${hours}`;
            dataDays.textContent = `${days}`;
            dataMinutes.textContent = `${minutes}`;
            dataSeconds.textContent = `${seconds}`;
        }, 1000);
    } else { 
        clearInterval(timerId);
    };
};    

function pad(value) { 
    return String(value).padStart(2, '0');
};

function convertMs(ms) { 
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = pad(Math.floor(ms / day));
    // Remaining hours
    const hours = pad(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = pad(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };

    // const days = pad(Math.floor((time % (1000 * 60 * 60 * 24 * 24)) / (1000 * 60 * 60 * 24)));
    // const hours = pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    // const minutes = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    // const seconds = pad(Math.floor((time % (1000 * 60)) / 1000));
    // return { days, hours, mins, secs };
};


