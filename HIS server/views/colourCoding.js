// Function to generate a random HSL color with enough contrast
function getRandomColor() {
    const hue = Math.floor(Math.random() * 360); // 0 to 359
    const saturation = Math.floor(Math.random() * 50) + 50; // 50 to 100
    const lightness = Math.floor(Math.random() * 20) + 40; // 40 to 60
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

// Function to color divs with the class "v_line"
function colorVerticalLines(className) {
    const elements = document.querySelectorAll(`.${className}`);
    elements.forEach(element => {
        element.style.borderLeftColor = getRandomColor();
    });
}

colorVerticalLines('v_line');
