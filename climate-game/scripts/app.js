// This file contains the JavaScript code for the climate game. It handles the functionality of the temperature tracker slider and the money slider, including updating the displayed values based on user input. It also manages the button click event to display the rules and printouts.

document.addEventListener('DOMContentLoaded', function() {
    const temperatureSlider = document.getElementById('temperature');
    const temperatureInput = document.getElementById('temperature-input');
    const temperatureValue = document.getElementById('temperature-value');
    const moneySlider = document.getElementById('money');
    const moneyInput = document.getElementById('money-input');
    const moneyValue = document.getElementById('money-value');
    const rulesButton = document.getElementById('rules-button');
    const rulesDisplay = document.getElementById('rules-display');
    const printOutButton = document.getElementById('print-out-button');
    const sidebar = document.getElementById('sidebar');
    const closeSidebarButton = document.getElementById('close-sidebar-button');
    const downloadPdfButton = document.getElementById('download-pdf-button');
    const titleContainer = document.getElementById('title-container');

    // Sync temperature slider and input
    function updateTemperature(value) {
        temperatureValue.textContent = `${value}°C`;
        temperatureSlider.value = value;
        temperatureInput.value = value;
    }

    temperatureSlider.addEventListener('input', () => {
        const temp = parseFloat(temperatureSlider.value);
        updateTemperature(temp.toFixed(1));

        if (temp >= 1.5 && temp < 2.0) {
            const fireOpacity = (temp - 1.5) / 0.4; // Scale opacity from 1.6°C to 2.0°C
            titleContainer.classList.remove('blackened');
            titleContainer.style.setProperty('--fire-opacity', Math.min(fireOpacity, 1));
        } else if (temp >= 2.0) {
            titleContainer.classList.add('blackened');
            titleContainer.style.setProperty('--fire-opacity', 0);
        } else {
            titleContainer.classList.remove('blackened');
            titleContainer.style.setProperty('--fire-opacity', 0);
        }
    });

    temperatureInput.addEventListener('input', () => {
        let value = parseFloat(temperatureInput.value);
        if (value >= 0 && value <= 2.5) {
            updateTemperature(value.toFixed(1));
        }
    });

    // Show temperature input on click
    temperatureValue.addEventListener('click', () => {
        temperatureValue.classList.add('hidden');
        temperatureInput.classList.remove('hidden');
        temperatureInput.focus();
    });

    // Hide temperature input on blur
    temperatureInput.addEventListener('blur', () => {
        temperatureValue.classList.remove('hidden');
        temperatureInput.classList.add('hidden');
    });

    // Sync money slider and input
    function updateMoney(value) {
        let displayValue;

        if (value < 10) {
            displayValue = `$${value.toFixed(2)} million`; // 0.01M to 9.99M
        } else if (value <= 19) {
            displayValue = `$${((value - 9) * 10).toFixed(1)} million`; // 10M to 999.99M
        } else if (value < 28) {
            displayValue = `$${((value - 18) * 100).toFixed(0)} million`; // 1M to 99.99M
        } else if (value < 37) {
            displayValue = `$${(value - 27).toFixed(2)} billion`; // 1B to 9.99B
        } else if (value < 46) {
            displayValue = `$${((value - 36) * 10).toFixed(1)} billion`; // 1B to 10B (counting by 1B)
        } else if (value <= 65) {
            displayValue = `$${((value - 45) * 100).toFixed(0)} billion`; // 10B to 100B
        } else {
            displayValue = `$10 billion`; // Cap at 10B
        }

        moneyValue.textContent = displayValue;
        moneySlider.value = value;
        moneyInput.value = value;
    }

    moneySlider.addEventListener('input', () => {
        updateMoney(parseFloat(moneySlider.value));
    });

    moneyInput.addEventListener('input', () => {
        let value = parseFloat(moneyInput.value);
        if (value >= 0 && value <= 65) {
            updateMoney(value);
        }
    });

    // Show money input on click
    moneyValue.addEventListener('click', () => {
        moneyValue.classList.add('hidden');
        moneyInput.classList.remove('hidden');
        moneyInput.focus();
    });

    // Hide money input on blur
    moneyInput.addEventListener('blur', () => {
        moneyValue.classList.remove('hidden');
        moneyInput.classList.add('hidden');
    });

    // Set slider attributes for precision
    moneySlider.step = "0.01"; // Allow increments of 0.01
    moneySlider.min = "0"; // Minimum value
    moneySlider.max = "65"; // Maximum value (to include 10 billion)

    // Show the sidebar when the Print Out button is clicked
    if (printOutButton) {
        printOutButton.addEventListener('click', () => {
            sidebar.classList.remove('hidden');
        });
    }

    // Hide the sidebar when the Close button is clicked
    if (closeSidebarButton) {
        closeSidebarButton.addEventListener('click', () => {
            sidebar.classList.add('hidden');
        });
    }

    // Download the PDF when the Download button is clicked
    if (downloadPdfButton) {
        downloadPdfButton.addEventListener('click', () => {
            const link = document.createElement('a');
            link.href = 'path/to/printouts.pdf'; // Replace with the actual path to your PDF
            link.download = 'printouts.pdf';
            link.click();
        });
    }

    updateTemperature(1.5); // Set the default temperature to 1.5°C
});