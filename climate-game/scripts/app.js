// This file contains the JavaScript code for the climate game. It handles the functionality of the temperature tracker slider and the money slider, including updating the displayed values based on user input. It also manages the button click event to display the rules and printouts.

document.addEventListener('DOMContentLoaded', function() {
    const temperatureSlider = document.getElementById('temperature');
    const temperatureInput = document.getElementById('temperature-input');
    const temperatureValue = document.getElementById('temperature-value');
    const co2Conversion = document.getElementById('co2-conversion');
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
    const co2TotalElement = document.getElementById('co2-total');
    let co2Total = 46.0; // Base CO₂ value in billion tons

    // Sync temperature slider and input
    temperatureSlider.addEventListener('input', () => {
        const temp = parseFloat(temperatureSlider.value).toFixed(5); // Slider precision

        // Update the displayed temperature value
        temperatureValue.textContent = `${parseFloat(temp).toFixed(2)}°C`; // Display up to 0.01°C
        temperatureInput.value = temp; // Update the input field

        // Update the CO₂ conversion text
        const co2 = ((temp - 1.5) / 0.1 * 77).toFixed(2); // Calculate CO₂ in billion tons with 0.01 precision
        co2Conversion.innerHTML = `Equivalent CO₂ (since 1.5°C):<br>${co2} billion tons`;

        // Update the fire overlay visibility
        if (temp >= 1.5 && temp < 2.0) {
            const fireOpacity = (temp - 1.5) / 0.4; // Scale opacity from 1.5°C to 2.0°C
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
        if (value >= 1 && value <= 2.0) { // Ensure the value is within the valid range
            temperatureSlider.value = value.toFixed(5); // Update the slider
            const co2 = ((value - 1.5) / 0.1 * 77).toFixed(2); // Calculate CO₂ equivalent with 0.01 precision
            temperatureValue.textContent = `${value.toFixed(2)}°C`; // Update the displayed value
            co2Conversion.innerHTML = `Equivalent CO₂ (since 1.5°C):<br>${co2} billion tons`;
        } else {
            temperatureInput.value = parseFloat(temperatureSlider.value).toFixed(5); // Reset input if out of range
        }

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

    // Update CO₂ total when buttons are clicked
    document.querySelectorAll('.increase-co2, .decrease-co2').forEach(button => {
        button.addEventListener('click', () => {
            const value = parseFloat(button.dataset.value);
            co2Total += value;
            co2TotalElement.textContent = `Total CO₂: ${co2Total.toFixed(2)} billion tons`;
        });
    });

    // Add functionality to the "Apply CO₂ For This Round" button
    const applyCo2Button = document.getElementById('apply-co2');
    applyCo2Button.addEventListener('click', () => {
        // Calculate the new temperature based on the updated CO₂ total
        const additionalTemperature = co2Total / 77 * 0.1; // Incremental temperature increase
        const currentTemperature = parseFloat(temperatureSlider.value);
        const newTemperature = currentTemperature + additionalTemperature;

        // Update the temperature slider, input, and displayed value
        temperatureSlider.value = newTemperature.toFixed(5);
        temperatureInput.value = newTemperature.toFixed(5);
        temperatureValue.textContent = `${newTemperature.toFixed(2)}°C`;

        // Update the CO₂ conversion text
        const co2Equivalent = ((newTemperature - 1.5) / 0.1 * 77).toFixed(2);
        co2Conversion.innerHTML = `Equivalent CO₂ (since 1.5°C):<br>${co2Equivalent} billion tons`;

        // Update the fire overlay visibility
        if (newTemperature >= 1.5 && newTemperature < 2.0) {
            const fireOpacity = (newTemperature - 1.5) / 0.4; // Scale opacity from 1.5°C to 2.0°C
            titleContainer.classList.remove('blackened');
            titleContainer.style.setProperty('--fire-opacity', Math.min(fireOpacity, 1));
        } else if (newTemperature >= 2.0) {
            titleContainer.classList.add('blackened');
            titleContainer.style.setProperty('--fire-opacity', 0);
        } else {
            titleContainer.classList.remove('blackened');
            titleContainer.style.setProperty('--fire-opacity', 0);
        }
    });
});