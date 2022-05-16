import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

// ================== add stopBtn )) ===================
// const stopBtn = document.querySelector('.stop-button');
// stopBtn.addEventListener("click", () => {
//     clearInterval(timer.intervalId);
//     startBtn.disabled = false;
//     timer.isActive = false;

//     console.log(`Interval with id ${timer} has stopped!`);
// })
// =====================================================
const date = new Date();
const input = document.querySelector('#datetime-picker');
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
        if (timer.isActive === false) {
            if (selectDate.selectedDates[0] > date) {
                startBtn.disabled = false;
            }
            else {
                startBtn.disabled = true;
                Notiflix.Notify.failure("Please choose a date in the future");
            };
        } else { 
            options.clickOpens = false;
            Notiflix.Notify.warning("The timer is already running, please reload the page to select a new date");  
            
        }
    }
};    

const selectDate = flatpickr(input, options);
const timer = {
    intervalId: null,
    isActive: false,
    start() { 
        if (this.isActive) { 
            return;
        }
        this.isActive = true;
        this.intervalId = setInterval(() => {
            const now = Date.now();
            const selectedDate = Date.parse(selectDate.selectedDates[0]);
            const leftUntil = selectedDate - now;
            if (leftUntil > 0) {
                const { days, hours, minutes, seconds } = convertMs(leftUntil);
                console.log(`${days}::${hours}:${minutes}:${seconds}`);
                dataHours.textContent = `${hours}`;
                dataDays.textContent = `${days}`;
                dataMinutes.textContent = `${minutes}`;
                dataSeconds.textContent = `${seconds}`;
            } else { 
                clearInterval(this.intervalId);
            }
        }, 1000);
    },
};

startBtn.setAttribute('disabled', true);
startBtn.addEventListener('click', onStartBtn);

function onStartBtn() {
    startBtn.setAttribute('disabled', true);
    input.setAttribute('disabled', true);
    timer.start();
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

};


