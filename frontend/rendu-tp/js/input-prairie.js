class Input {
    constructor(game) {
        this.game = game;
        this.keys = {};

        window.addEventListener("keydown", e => {
            let k = e.key.toLowerCase();
            this.keys[k] = true;

            if (k === "enter") {
                if (game.state === "MENU") game.state = "PLAY";
                else if (game.state === "GAMEOVER") {
                    game.state = "MENU";
                    game.score = 0;
                    game.lives = 4;
                    game.entities = [];
                }
            }

            if (k === " ") game.player.shoot();
        });

        window.addEventListener("keyup", e => {
            this.keys[e.key.toLowerCase()] = false;
        });
    }
}
