// game.js

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game settings
const settings = {
    screen_width: 1200,
    screen_height: 800,
    bg_color: '#e6e6e6',
    ship_speed_factor: 5,
    bullet_speed_factor: 8,
    bullets_allowed: 5,
    alien_speed_factor: 2,
    fleet_drop_speed: 10,
    fleet_direction: 1,
    alien_points: 50,
};

// Game state
const state = {
    ship: {
        x: settings.screen_width / 2,
        y: settings.screen_height - 50,
        width: 50,
        height: 50,
        speed: settings.ship_speed_factor,
    },
    bullets: [],
    aliens: [],
    stats: {
        ships_left: 3,
        score: 0,
        level: 1,
        high_score: 0,
        game_active: true,
    },
};

// Keyboard state
const keys = {};

document.addEventListener('keydown', (event) => {
    keys[event.key] = true;
});

document.addEventListener('keyup', (event) => {
    keys[event.key] = false;
});

function update() {
    if (state.stats.game_active) {
        updateShip();
        updateBullets();
        updateAliens();
        checkCollisions();
        checkAliensBottom();
    }
}

function updateShip() {
    if (keys['ArrowLeft'] && state.ship.x > 0) {
        state.ship.x -= state.ship.speed;
    }
    if (keys['ArrowRight'] && state.ship.x + state.ship.width < settings.screen_width) {
        state.ship.x += state.ship.speed;
    }
}

function updateBullets() {
    state.bullets.forEach((bullet) => {
        bullet.y -= settings.bullet_speed_factor;
    });

    state.bullets = state.bullets.filter((bullet) => bullet.y > 0);
}

function updateAliens() {
    state.aliens.forEach((alien) => {
        alien.y += settings.alien_speed_factor * settings.fleet_direction;
    });

    if (Math.random() < 0.05) {
        createAlien();
    }

    state.aliens = state.aliens.filter((alien) => alien.y < settings.screen_height);
}

function createAlien() {
    const alien = {
        x: Math.random() * settings.screen_width,
        y: 0,
        width: 30,
        height: 30,
    };
    state.aliens.push(alien);
}

function checkCollisions() {
    state.bullets.forEach((bullet) => {
        state.aliens.forEach((alien, index) => {
            if (
                bullet.x < alien.x + alien.width &&
                bullet.x + settings.bullet_width > alien.x &&
                bullet.y < alien.y + alien.height &&
                bullet.y + settings.bullet_height > alien.y
            ) {
                state.bullets.splice(state.bullets.indexOf(bullet), 1);
                state.aliens.splice(index, 1);
                state.stats.score += settings.alien_points;
            }
        });
    });
}

function checkAliensBottom() {
    state.aliens.forEach((alien) => {
        if (alien.y + alien.height > settings.screen_height - 50) {
            state.stats.ships_left -= 1;
            resetGame();
        }
    });
}

function resetGame() {
    if (state.stats.ships_left <= 0) {
        state.stats.game_active = false;
        if (state.stats.score > state.stats.high_score) {
            state.stats.high_score = state.stats.score;
        }
    } else {
        state.bullets = [];
        state.aliens = [];
        state.stats.level += 1;
        state.ship.x = settings.screen_width / 2;
        state.ship.y = settings.screen_height - 50;
    }
}

function draw() {
    // Clear canvas
    ctx.fillStyle = settings.bg_color;
    ctx.fillRect(0, 0, settings.screen_width, settings.screen_height);

    // Draw ship
    ctx.fillStyle = '#00ff00';
    ctx.fillRect(state.ship.x, state.ship.y, state.ship.width, state.ship.height);

    // Draw bullets
    ctx.fillStyle = '#0000ff';
    state.bullets.forEach((bullet) => {
        ctx.fillRect(bullet.x, bullet.y, settings.bullet_width, settings.bullet_height);
    });

    // Draw aliens
    ctx.fillStyle = '#ff0000';
    state.aliens.forEach((alien) => {
        ctx.fillRect(alien.x, alien.y, alien.width, alien.height);
    });

    // Draw game information
    ctx.fillStyle = '#000000';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${state.stats.score}`, 20, 30);
    ctx.fillText(`Level: ${state.stats.level}`, 20, 60);
    ctx.fillText(`Ships Left: ${state.stats.ships_left}`, 20, 90);
    ctx.fillText(`High Score: ${state.stats.high_score}`, 20, 120);

    if (!state.stats.game_active) {
        ctx.fillText('Game Over', settings.screen_width / 2 - 80, settings.screen_height / 2);
        ctx.fillText('Press Space to Restart', settings.screen_width / 2 - 120, settings.screen_height / 2 + 30);
    }
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', (event) => {
    if (!state.stats.game_active && event.key === ' ') {
        state.stats = {
            ships_left: 3,
            score: 0,
            level: 1,
            high_score: state.stats.high_score,
            game_active: true,
        };
        state.ship.x = settings.screen_width / 2;
        state.ship.y = settings.screen_height - 50;
        state.bullets = [];
        state.aliens = [];
    }
});

// Start the game loop
gameLoop();







