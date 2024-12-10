// IF CHANGING ANIMATION TIME, ALSO CHANGE IN .SPARKLES IN STYLE.CSS
let animationTime = 5;

// Function to create a sparkle
function createSparkle() {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    let bar = document.querySelector('.navbar');
    if (bar) {
        bar.appendChild(sparkle);

        // Set random position
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.left = Math.random() * 100 + '%';

        // Set random negative animation delay
        if (initialSparkle === true) {
            sparkle.style.animationDelay = '-' + Math.random() * animationTime + 's';
        }

        // Remove sparkle after animation
        setTimeout(() => {
            sparkle.remove();
        }, 1000 * animationTime);
    }

    const sparkle2 = document.createElement('div');
    sparkle2.classList.add('sparkle');
    bar = document.querySelector('.footer');
    if (bar) {
        bar.appendChild(sparkle2);

        // Set random position
        sparkle2.style.top = Math.random() * 100 + '%';
        sparkle2.style.left = Math.random() * 100 + '%';

        // Set random negative animation delay
        if (initialSparkle === true) {
            sparkle2.style.animationDelay = '-' + Math.random() * animationTime + 's';
        }

        // Remove sparkle after animation
        setTimeout(() => {
            sparkle2.remove();
        }, 1000 * animationTime);
    }
}

// Generate initial sparkles
let initialSparkle = true;
for (let i = 0; i < animationTime * 15; i++) {
    createSparkle();
}
initialSparkle = false;

// Generate sparkles at random intervals
setInterval(createSparkle, Math.random() * 6 * animationTime + (animationTime * 5));
