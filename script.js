const countUpElement1 = document.getElementById('countup-1');
const countUpElement2 = document.getElementById('countup-2');

const startValue1 = 1066;
const endValue1 = 1500;
const startValue2 = 8500;
const endValue2 = 19600;

const duration = 2000;
const stepTime = 20;

const steps = duration / stepTime;
const increment1 = (endValue1 - startValue1) / steps;
const increment2 = (endValue2 - startValue2) / steps;

let currentValue1 = startValue1;
let currentValue2 = startValue2;

const interval = setInterval(() => {
    currentValue1 += increment1;
    currentValue2 += increment2;

    if (currentValue1 >= endValue1) {
        currentValue1 = endValue1;
    }
    if (currentValue2 >= endValue2) {
        currentValue2 = endValue2;
    }

    countUpElement1.textContent = Math.round(currentValue1) + "+";
    countUpElement2.textContent = Math.round(currentValue2) + "+";

    if (currentValue1 >= endValue1 && currentValue2 >= endValue2) {
        clearInterval(interval);
    }
}, stepTime);

document.querySelectorAll('#check-gift-card-intro, #check-gift-card-intro2').forEach(function(button) {
    button.addEventListener('click', function() {
        document.querySelector('.form').scrollIntoView({ behavior: 'smooth' });
    });
});
