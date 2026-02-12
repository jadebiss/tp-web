class Bullet extends Entity {
    constructor(game, x, y, angle) {
        super(game, x, y);
        this.angle = angle;
        this.speed = 7;
    }

    update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;

        this.game.entities.forEach(e => {
            if (e instanceof Enemy) {
                let d = Math.hypot(e.x - this.x, e.y - this.y);
                if (d < 48) {
                    e.dead = true;
                    this.dead = true;
                    this.game.score += 10;
                }
            }
        });
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        ctx.fillStyle = "white";
        ctx.fillRect(0, -2, 10, 4);

        ctx.restore();
    }
}
