let score = 0;
let cross = true;

const audio = new Audio('music.mp3');
const audiogo = new Audio('gameover.mp3');

setTimeout(() => {
    audio.play();
}, 1000);

document.onkeydown = function (e) {
    const dino = document.querySelector('.dino');
    const dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));

    if (e.keyCode === 38) { // Up Arrow
        dino.classList.add('animateDino');
        setTimeout(() => {
            dino.classList.remove('animateDino');
        }, 700);
    }
    if (e.keyCode === 39) { // Right Arrow
        dino.style.left = dinoX + 112 + "px";
    }
    if (e.keyCode === 37) { // Left Arrow
        dino.style.left = (dinoX - 112) + "px";
    }
}

function detectCollision() {
    const dino = document.querySelector('.dino');
    const obstacle = document.querySelector('.obstacle');

    const dinoRect = dino.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();

    return !(dinoRect.right < obstacleRect.left ||
             dinoRect.left > obstacleRect.right ||
             dinoRect.bottom < obstacleRect.top ||
             dinoRect.top > obstacleRect.bottom);
}

function updateScore(score) {
    const scoreCont = document.querySelector('.scoreCont');
    scoreCont.innerHTML = "Your Score: " + score;
}

setInterval(() => {
    const gameOver = document.querySelector('.gameOver');
    const obstacle = document.querySelector('.obstacle');

    if (detectCollision()) {
        gameOver.style.visibility = 'visible';
        gameOver.innerHTML = "Game Over - Reload to Play Again";
        obstacle.classList.remove('obstacleAni');
        audiogo.play();
        setTimeout(() => {
            audiogo.pause();
            audio.pause();
        }, 500);
    } else {
        const dino = document.querySelector('.dino');
        const dinoLeft = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        const obstacleLeft = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));

        if (dinoLeft + dino.offsetWidth >= obstacleLeft && cross) {
            score += 1;
            updateScore(score);
            cross = false;
            setTimeout(() => {
                cross = true;
            }, 1000);

            setTimeout(() => {
                let aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
                let newDur = aniDur - 0.1;
                obstacle.style.animationDuration = Math.max(newDur, 0.5) + 's'; // Ensure animation duration doesn't go below 0.5s
                console.log('New animation duration: ', newDur);
            }, 500);
        }
    }
}, 10);
