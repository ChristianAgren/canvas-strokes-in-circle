window.addEventListener('load', draw)

// Vi definerar nåra globla variabler för enkelhetens skull
// Lägg till fler om du behöver
let nrOfDots = 400;
let multiplier = 8;

const   dotSize = 5,
        radius = window.innerWidth / 6,
        center = {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2
        },
        lineArray = [];

function draw() {
    const canvas = document.querySelector("canvas");
    const context = canvas.getContext("2d");

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    context.clearRect(0, 0, canvas.width, canvas.height);
    drawCircle(context);
    drawDots(context);
    drawLines(context);
}

/**
 * Draws the outline circle for this projekt.
 * @param {CanvasRenderingContext2D} context
 */
function drawCircle(context) {
    context.beginPath()
    context.strokeStyle = 'lightgrey'
    context.arc(center.x, center.y, radius, 0, 2 * Math.PI)
    context.stroke()
    context.closePath()
}

/**
 * Draws each dot onto the outline circle.
 * @param {CanvasRenderingContext2D} context
 */
function drawDots(context) {
    context.beginPath()
    context.fillStyle = 'white'

    
    for(i = 0; i < nrOfDots; i++) {
        const angle = 2 * Math.PI / nrOfDots * i - Math.PI / 2
        const x = center.x + radius * Math.cos(angle)
        const y = center.y + radius * Math.sin(angle)

        lineArray[i] = {x, y}

        context.moveTo(x, y)
        context.arc(x, y, dotSize, 0, 2 * Math.PI)
    }
    
    context.fill()
    context.closePath()


}

/**
 * Draws a line from each dot to another based on the multiplier value.
 * @param {CanvasRenderingContext2D} context
 */
function drawLines(context) {
    
    for (i=0; i < nrOfDots; i++) {
        context.beginPath()
        context.strokeStyle = `hsl(${i}, 100%, 50%)`
        context.moveTo(lineArray[i].x, lineArray[i].y)
        context.lineTo((lineArray[i * multiplier %nrOfDots].x), (lineArray[i * multiplier %nrOfDots].y))
        context.stroke()
    }


}