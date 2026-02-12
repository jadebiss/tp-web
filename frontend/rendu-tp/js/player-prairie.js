/**
 * Classe du joueur (Prairie King)
 */
class Player extends Entity {
    constructor(game, x, y) {
        super(game, x, y);
        this.speed = 3;
        this.angle = 0;
        this.dirX = 1;
        this.dirY = 0;
    }

    update() {
        let k = this.game.input.keys;

        let moveX = 0;
        let moveY = 0;

        if (k["z"] || k["arrowup"]) moveY -= 1;
        if (k["s"] || k["arrowdown"]) moveY += 1;
        if (k["q"] || k["arrowleft"]) moveX -= 1;
        if (k["d"] || k["arrowright"]) moveX += 1;

        if (moveX !== 0 || moveY !== 0) {
            let length = Math.hypot(moveX, moveY);
            moveX /= length;
            moveY /= length;

            this.x += moveX * this.speed;
            this.y += moveY * this.speed;

            this.dirX = moveX;
            this.dirY = moveY;
        }

        this.angle = Math.atan2(this.dirY, this.dirX);
    }

    shoot() {
        this.game.entities.push(
            new Bullet(this.game, this.x, this.y, this.angle)
        );
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        ctx.fillStyle = "yellow";
        ctx.fillRect(-10, -10, 20, 20);

        ctx.fillStyle = "black";
        ctx.fillRect(0, -2, 15, 4);

        ctx.restore();
    }
}
