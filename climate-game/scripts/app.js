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

    // Function to update temperature UI elements
    function updateTemperatureUI(temp) {
        const temperature = parseFloat(temp);
        if (isNaN(temperature)) return; // Exit if temp is not a valid number

        // Clamp temperature between min and max
        const minTemp = parseFloat(temperatureSlider.min);
        const maxTemp = parseFloat(temperatureSlider.max);
        const clampedTemp = Math.max(minTemp, Math.min(temperature, maxTemp));

        const displayTemp = clampedTemp.toFixed(2);
        const sliderTemp = clampedTemp.toFixed(5);

        // Update slider, input, and display value
        temperatureSlider.value = sliderTemp;
        temperatureInput.value = sliderTemp;
        temperatureValue.textContent = `${displayTemp}°C`;

        // Update CO₂ conversion text
        const co2Equivalent = ((clampedTemp - 1.5) / 0.1 * 77).toFixed(2);
        co2Conversion.innerHTML = `Equivalent CO₂ (since 1.5°C):<br>${co2Equivalent} billion tons`;

        // Update fire overlay visibility
        if (clampedTemp >= 1.5 && clampedTemp < 2.0) {
            const fireOpacity = (clampedTemp - 1.5) / 0.5; // Adjusted range for smoother transition
            titleContainer.classList.remove('blackened');
            titleContainer.style.setProperty('--fire-opacity', Math.min(fireOpacity, 1));
        } else if (clampedTemp >= 2.0) {
            titleContainer.classList.add('blackened');
            titleContainer.style.setProperty('--fire-opacity', 0); // Ensure fire is off when blackened
        } else {
            titleContainer.classList.remove('blackened');
            titleContainer.style.setProperty('--fire-opacity', 0);
        }
    }

    // Sync temperature slider and input
    temperatureSlider.addEventListener('input', () => {
        updateTemperatureUI(temperatureSlider.value);
    });

    temperatureInput.addEventListener('input', () => {
        let value = parseFloat(temperatureInput.value);
        // Ensure the value is within the valid range before updating UI
        if (!isNaN(value) && value >= parseFloat(temperatureSlider.min) && value <= parseFloat(temperatureSlider.max)) {
            updateTemperatureUI(value);
        } else {
            // Optionally reset or provide feedback if input is invalid/out of range
            temperatureInput.value = parseFloat(temperatureSlider.value).toFixed(5); // Reset to current slider value
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
        // Calculate the temperature increase based on the *total* CO₂ accumulated this round
        const additionalTemperature = co2Total / 77 * 0.1; // Temp increase from this round's CO₂
        const currentTemperature = parseFloat(temperatureSlider.value);
        const newTemperature = currentTemperature + additionalTemperature;

        updateTemperatureUI(newTemperature); // Update UI with the new total temperature

        // Keep co2Total as is, don't reset for the next round
        // co2Total = 0; // Removed this line
        // co2TotalElement.textContent = `Total CO₂: ${co2Total.toFixed(2)} billion tons`; // Removed this line
    });

    // Add functionality for the new Quick Add CO₂ buttons
    document.querySelectorAll('.quick-add-co2').forEach(button => {
        button.addEventListener('click', () => {
            const co2ToAdd = parseFloat(button.dataset.value); // CO₂ to add in billion tons

            // Extract current equivalent CO₂ value
            const co2Text = co2Conversion.innerHTML;
            // Use regex to find the number before " billion tons"
            const match = co2Text.match(/<br>([\d.-]+) billion tons/);
            let currentEquivalentCO2 = 0;
            if (match && match[1]) {
                currentEquivalentCO2 = parseFloat(match[1]);
            }

            const newEquivalentCO2 = currentEquivalentCO2 + co2ToAdd;

            // Calculate the new temperature based on the updated *equivalent* CO₂
            // Formula rearranged: temp = (equivalentCO2 / 77 * 0.1) + 1.5
            const newTemperature = (newEquivalentCO2 / 77 * 0.1) + 1.5;

            updateTemperatureUI(newTemperature); // Update UI based on the new temperature
        });
    });

    // --- Add functionality for the new Quick Subtract CO₂ buttons ---
    document.querySelectorAll('.quick-subtract-co2').forEach(button => {
        button.addEventListener('click', () => {
            const co2ToSubtract = parseFloat(button.dataset.value); // CO₂ to subtract (already negative)

            // Extract current equivalent CO₂ value
            const co2Text = co2Conversion.innerHTML;
            // Use regex to find the number before " billion tons"
            const match = co2Text.match(/<br>([\d.-]+) billion tons/);
            let currentEquivalentCO2 = 0;
            if (match && match[1]) {
                currentEquivalentCO2 = parseFloat(match[1]);
            }

            // Add the negative value to subtract
            const newEquivalentCO2 = currentEquivalentCO2 + co2ToSubtract;

            // Calculate the new temperature based on the updated *equivalent* CO₂
            // Formula rearranged: temp = (equivalentCO2 / 77 * 0.1) + 1.5
            const newTemperature = (newEquivalentCO2 / 77 * 0.1) + 1.5;

            updateTemperatureUI(newTemperature); // Update UI based on the new temperature
        });
    });

    // Initial UI setup on load
    updateTemperatureUI(temperatureSlider.value);
    updateMoney(moneySlider.value); // Assuming updateMoney exists and works correctly

}); // End of DOMContentLoaded