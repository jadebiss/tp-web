class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.ctx.imageSmoothingEnabled = false;

        this.state = "MENU";
        this.lastTime = 0;

        this.player = new Player(this, 450, 300);
        this.entities = [];

        this.input = new Input(this);

        this.score = 0;
        this.lives = 4; 
        this.level = 1;

        this.levelTime = 30000; 
        this.levelTimer = this.levelTime;
    }

    start() {
        requestAnimationFrame(t => this.loop(t));
    }

    loop(t) {
        let delta = t - this.lastTime;
        this.lastTime = t;

        this.update(delta);
        this.draw();

        requestAnimationFrame(t => this.loop(t));
    }

    update(delta) {
        if (this.state === "PLAY") {
            this.player.update(delta);

            this.entities.forEach(e => e.update(delta));
            this.entities = this.entities.filter(e => !e.dead);

            // Level timer countdown
            this.levelTimer -= delta;
            if (this.levelTimer > 0) {
                this.spawnEnemies();
            }

            // Check level completion
            if (this.levelTimer <= 0 && this.entities.filter(e => e instanceof Enemy).length === 0) {
                this.level++;
                this.levelTimer = this.levelTime;
            }
        }
    }

    spawnEnemies() {
        if (Math.random() < 0.02 + this.level * 0.005) {
            const side = Math.floor(Math.random() * 4);

            let x, y;

            switch (side) {
                case 0: x = 0; y = this.canvas.height / 2; break;
                case 1: x = this.canvas.width; y = this.canvas.height / 2; break;
                case 2: x = this.canvas.width / 2; y = 0; break;
                case 3: x = this.canvas.width / 2; y = this.canvas.height; break;
            }

            this.entities.push(new Enemy(this, x, y));
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, 900, 600);

        if (this.state === "MENU") {
            this.drawMenu();
            return;
        }

        if (this.state === "GAMEOVER") {
            this.drawGameOver();
            return;
        }

        this.player.draw(this.ctx);
        this.entities.forEach(e => e.draw(this.ctx));

        this.drawHUD();
    }

    drawMenu() {
        this.ctx.fillStyle = "white";
        this.ctx.font = "40px Pixelify Sans";
        this.ctx.fillText("Slime Dungeon", 230, 200);
        this.ctx.font = "20px Pixelify Sans";
        this.ctx.fillText("Appuyez sur Entrée pour commencer", 190, 300);
        this.ctx.fillStyle = "black";
    }

    drawGameOver() {
        this.ctx.fillStyle = "red";
        this.ctx.font = "50px Pixelify Sans";
        this.ctx.fillText("GAME OVER", 300, 260);
        this.ctx.font = "20px Pixelify Sans";
        this.ctx.fillText("Appuyez sur Entrée pour recommencer", 380, 320);
    }

    drawHUD() {
        this.ctx.fillStyle = "white";
        // Lives display: x3, x2, etc.
        this.ctx.fillText(`Vies: ${this.lives - 1}`, 10, 20);
        this.ctx.fillText("Score: " + this.score, 10, 40);
        this.ctx.fillText("Level: " + this.level, 10, 60);

        // Timer bar
        this.ctx.fillStyle = "gray";
        this.ctx.fillRect(100, 5, 700, 20);
        this.ctx.fillStyle = "green";
        let w = 700 * (this.levelTimer / this.levelTime);
        this.ctx.fillRect(100, 5, w, 20);
    }
}
