const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const start = document.querySelector('.start');
const gameOver = document.querySelector('.game-over');

const audioStart = new Audio('./src/audio/audio_theme.mp3');
const audioGameOver = new Audio('./src/audio/audio_gameover.mp3');

let gameLoop;

const startGame = () => {
    pipe.classList.add('pipe-animation');
    start.style.display = 'none';

    // Iniciar áudio
    audioStart.play();
    audioStart.currentTime = 0;

    gameLoop = setInterval(loop, 10); // Reinicia o loop do jogo
};

const restartGame = () => {
    gameOver.style.display = 'none';

    // Resetando a posição do cano
    pipe.style.left = '';
    pipe.style.right = '0';
    pipe.classList.add('pipe-animation'); // Adiciona a animação novamente

    // Resetando o Mario
    mario.src = './img/mario.gif'; // Verifique o caminho correto da imagem
    mario.style.width = '150px';
    mario.style.marginLeft = '0';
    mario.style.bottom = '0';

    // Resetando o áudio
    audioGameOver.pause();
    audioGameOver.currentTime = 0;
    audioStart.play();
    audioStart.currentTime = 0;

    // Reiniciar o loop do jogo
    clearInterval(gameLoop);
    gameLoop = setInterval(loop, 10);
};

const jump = () => {
    if (!mario.classList.contains('jump')) {
        mario.classList.add('jump');

        setTimeout(() => {
            mario.classList.remove('jump');
        }, 800);
    }
};

const loop = () => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = parseInt(window.getComputedStyle(mario).bottom.replace('px', ''));

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
        pipe.classList.remove('pipe-animation');
        pipe.style.left = `${pipePosition}px`;

        mario.style.bottom = `${marioPosition}px`;
        mario.src = './img/game-over.png';
        mario.style.width = '80px';
        mario.style.marginLeft = '50px';

        audioStart.pause();
        audioGameOver.play();

        setTimeout(() => {
            audioGameOver.pause();
        }, 7000);

        gameOver.style.display = 'flex';

        clearInterval(gameLoop);
    }
};

// Adicionando eventos de controle
document.addEventListener('keypress', (e) => {
    if (e.key === ' ') {
        jump();
    }
});

document.addEventListener('touchstart', (e) => {
    if (e.touches.length) {
        jump();
    }
});

document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        startGame();
    }
});
