// Obtener el canvas y el contexto de dibujo
var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

// Variables de juego
var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 2;
var dy = 0;
var snakeWidth = 10;
var snakeHeight = 10;
var appleX;
var appleY;
var score = 0;
var snake = [];
var snakeLength = 1;

// Generar una manzana aleatoria
function spawnApple() {
    appleX = Math.floor(Math.random() * (canvas.width - snakeWidth));
    appleY = Math.floor(Math.random() * (canvas.height - snakeHeight));
}

// Dibujar la serpiente
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Comprobar si la serpiente colisiona con la manzana
    if (x + snakeWidth > appleX && x < appleX + snakeWidth && y + snakeHeight > appleY && y < appleY + snakeHeight) {
        score++;
        snakeLength++;
        spawnApple();
    }

    // Dibujar la manzana
    ctx.beginPath();
    ctx.rect(appleX, appleY, snakeWidth, snakeHeight);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();

    // Añadir un nuevo segmento a la matriz de la serpiente
    snake.unshift({ x: x, y: y });
    while (snake.length > snakeLength) {
        snake.pop();
    }

    // Dibujar cada segmento de la serpiente
    for (var i = 0; i < snake.length; i++) {
        ctx.beginPath();
        ctx.rect(snake[i].x, snake[i].y, snakeWidth, snakeHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }

    // Mostrar la puntuación
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 8, 20);

    // Comprobar si la serpiente colisiona con las paredes
    if (x + dx > canvas.width - snakeWidth || x + dx < 0) {
        dx = -dx;
    }
    if (y + dy > canvas.height - snakeHeight || y + dy < 0) {
        dy = -dy;
    }
    x += dx;
    y += dy;
}


// Controlador de eventos de teclado
document.addEventListener("keydown", keyDownHandler, false);

function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        dx = 2;
        dy = 0;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        dx = -2;
        dy = 0;
    } else if (e.key == "Up" || e.key == "ArrowUp") {
        dx = 0;
        dy = -2;
    } else if (e.key == "Down" || e.key == "ArrowDown") {
        dx = 0;
        dy = 2;
    }
}

// Llamar a la función draw cada 10 milisegundos
spawnApple();
setInterval(draw, 10);

// Crea un nuevo elemento <style>
const style = document.createElement("style");

// Agrega reglas CSS a la serpiente y la manzana
style.innerHTML = `
.snake-segment {
    background-color: #0095DD;
    border-radius: 50%;
}

.apple {
    background-color: #FF5733;
    border-radius: 50%;
}
`;

// Agrega el elemento <style> al documento
document.head.appendChild(style);
