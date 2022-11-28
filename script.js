const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const faceWithEyes = new Image();
const faceWithMasc = new Image();
const iris = new Image();
const mousePosition = {
    x: 0,
    y: 0
}
const eyeRadius = 18
faceWithEyes.src = 'img/Bob-Esponja.png';
faceWithMasc.src = 'img/Bob-Esponjapng.png';
iris.src = 'img/ojos.png'

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.heigth = canvas.width;
}

function drawFace() {
    const x = canvas.width / 2 - faceWithEyes.width / 2;
    const y = canvas.height / 2 - faceWithEyes.height / 2;

    ctx.drawImage(faceWithEyes, x, y);
}

function drawMasc() {
    const x = canvas.width / 2 - faceWithMasc.width / 2;
    const y = canvas.height / 2 - faceWithMasc.height / 2;

    ctx.drawImage(faceWithMasc, x, y);
}

function distance(a, b) {
    return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(a.y - b.y, 2));
}

function getUnitVector(a,b) {
    const module = distance(a,b);
    return {
        x: (b.x - a.x) / module,
        y: (b.y - a.y) / module
    };
}

function getTranslatedPosition(eyePosition) {
    if (distance(eyePosition, mousePosition) <= eyeRadius) {
        return mousePosition
    }
    const unitVector = getUnitVector(eyePosition, mousePosition);
    return {
        x:eyePosition.x+eyeRadius*Math.sin(unitVector.x),
        y:eyePosition.y+eyeRadius*Math.sin(unitVector.y)
    }
}

function drawEyes() {
    const eyeOriginPositions = [{
            x: canvas.width / 2 - 45,
            y: canvas.height / 2 - 55
        },
        {
            x: canvas.width / 2 + 5,
            y: canvas.height / 2 - 55
        }
    ];
    const eyePositions = eyeOriginPositions.map(getTranslatedPosition);

    eyePositions.forEach(eyePosition => {
        ctx.drawImage(iris,
            eyePosition.x - iris.width / 2, eyePosition.y - iris.height / 2);
    });
}

function drawMouse() {
    ctx.fillRect(mousePosition.x, mousePosition.y, 10, 10);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function render() {
    clearCanvas()
    drawFace();
    drawEyes();
    drawMasc();
}

function onResize() {
    resizeCanvas()
    render();
}

function onMouseMove() {
    mousePosition.x = event.offsetX;
    mousePosition.y = event.offsetY;
    render()
}
function onTouchMove(event) {
    mousePosition.x = event.touches[0].clientX;
    mousePosition.y = event.touches[0].clientY;
    render()
}

function main() {
    resizeCanvas();
    render();
    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onTouchMove);


}

window.onload = main;