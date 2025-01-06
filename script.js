// Get the countup elements
const countUpElements = [
    {
        element: document.getElementById("countup-1"),
        startValue: 1066,
        endValue: 1500,
    },
    {
        element: document.getElementById("countup-2"),
        startValue: 8500,
        endValue: 19600,
    },
];

// Animation duration and step time
const duration = 20000; // total duration for the count-up animation (in ms)
const stepTime = 1; // interval between steps (in ms)
const steps = duration / stepTime; // total number of steps
const increments = countUpElements.map(
    ({ startValue, endValue }) => (endValue - startValue) / steps,
);

// Initialize current values for both count-ups
let currentValues = countUpElements.map(({ startValue }) => startValue);

// Count-up function
const interval = setInterval(() => {
    let allCompleted = true;

    countUpElements.forEach((item, index) => {
        currentValues[index] += increments[index];

        // Ensure we don't exceed the end value
        if (currentValues[index] >= item.endValue) {
            currentValues[index] = item.endValue;
        }

        // Update the text content of the count-up element
        item.element.textContent = Math.round(currentValues[index]) + "+";

        // Check if any value is still counting
        if (currentValues[index] < item.endValue) {
            allCompleted = false;
        }
    });

    // Stop the interval when both count-ups are completed
    if (allCompleted) {
        clearInterval(interval);
    }
}, stepTime);

// Scroll to the form section when either of the buttons is clicked
document
    .querySelectorAll("#check-gift-card-intro, #check-gift-card-intro2")
    .forEach(function(button) {
        button.addEventListener("click", function() {
            document
                .querySelector(".form")
                .scrollIntoView({ behavior: "smooth" });
        });
    });

