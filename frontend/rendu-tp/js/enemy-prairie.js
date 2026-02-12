class Enemy extends Entity {
    constructor(game, x, y) {
        super(game, x, y);
        this.speed = 1 + Math.random();
    }

    update(delta) {
        let p = this.game.player;

        let dx = p.x - this.x;
        let dy = p.y - this.y;
        let dist = Math.hypot(dx, dy);

        this.x += dx / dist * this.speed * (delta / 16.67);
        this.y += dy / dist * this.speed * (delta / 16.67);

        if (dist < 20) {
            this.dead = true;
            this.game.lives--;
            if (this.game.lives < 0) this.game.state = "GAMEOVER";
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);

        ctx.fillStyle = "red";
        ctx.fillRect(-12, -12, 24, 24);

        ctx.restore();
    }
}
